import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { CountryRate, getCountryRates, saveCountryRates } from "@/lib/rates-store";

const unauthorized = () =>
  NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

const readAuthFromRequest = async (request: NextRequest) => {
  const headerUser = request.headers.get("x-admin-user");
  const headerPassword = request.headers.get("x-admin-password");
  if (headerUser || headerPassword) {
    return { username: headerUser, password: headerPassword };
  }

  const body = await request.json().catch(() => ({}));
  return {
    username: typeof body.username === "string" ? body.username : null,
    password: typeof body.password === "string" ? body.password : null,
    body,
  };
};

export async function GET(request: NextRequest) {
  const { username, password } = await readAuthFromRequest(request);
  if (!isAdminAuthorized(username, password)) return unauthorized();

  const rates = await getCountryRates();
  return NextResponse.json({ ok: true, rates });
}

export async function POST(request: NextRequest) {
  const payload = await readAuthFromRequest(request);
  if (!isAdminAuthorized(payload.username, payload.password)) return unauthorized();

  const body = (payload as { body?: { rates?: unknown } }).body;
  const incoming = body?.rates;

  if (!Array.isArray(incoming)) {
    return NextResponse.json(
      { ok: false, error: "rates must be an array" },
      { status: 400 },
    );
  }

  const rates: CountryRate[] = [];
  for (const item of incoming) {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as { country?: unknown }).country !== "string"
    ) {
      return NextResponse.json({ ok: false, error: "Invalid rates payload" }, { status: 400 });
    }

    const country = (item as { country: string }).country;
    const ratePerKg = Number((item as { rate_per_kg?: unknown }).rate_per_kg);
    const rawRatePerPound = (item as { rate_per_pound?: unknown }).rate_per_pound;
    const updatedAt = (item as { updated_at?: unknown }).updated_at;
    const calculatedRatePerPound = Number((ratePerKg / 2.20462).toFixed(2));
    const ratePerPound =
      rawRatePerPound === undefined || rawRatePerPound === null
        ? calculatedRatePerPound
        : Number(rawRatePerPound);

    if (!Number.isFinite(ratePerKg) || ratePerKg < 0) {
      return NextResponse.json(
        { ok: false, error: `Invalid rate_per_kg for ${country}` },
        { status: 400 },
      );
    }

    if (!Number.isFinite(ratePerPound) || ratePerPound < 0) {
      return NextResponse.json(
        { ok: false, error: `Invalid rate_per_pound for ${country}` },
        { status: 400 },
      );
    }

    rates.push({
      country,
      rate_per_kg: ratePerKg,
      rate_per_pound: ratePerPound,
      updated_at: typeof updatedAt === "string" ? updatedAt : new Date().toISOString(),
    });
  }

  const saved = await saveCountryRates(rates);
  return NextResponse.json({ ok: true, rates: saved });
}
