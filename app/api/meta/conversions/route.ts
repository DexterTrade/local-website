import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "node:crypto";

type ClientEventPayload = {
  event_name: string;
  event_time?: number;
  event_id?: string;
  event_source_url?: string;
  action_source?: string;
  user_data?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    fbp?: string;
    fbc?: string;
    external_id?: string;
  };
  custom_data?: Record<string, unknown>;
};

const normalize = (value: string) => value.trim().toLowerCase();

const hashValue = (value: string) =>
  crypto.createHash("sha256").update(normalize(value)).digest("hex");

const normalizePhone = (value: string) =>
  value.replace(/[^\d+]/g, "");

const buildUserData = (
  userData: ClientEventPayload["user_data"],
  ipAddress: string,
  userAgent: string,
) => {
  if (!userData) {
    return { client_ip_address: ipAddress, client_user_agent: userAgent };
  }

  const payload: Record<string, string> = {
    client_ip_address: ipAddress,
    client_user_agent: userAgent,
  };

  if (userData.email) payload.em = hashValue(userData.email);
  if (userData.phone) payload.ph = hashValue(normalizePhone(userData.phone));
  if (userData.first_name) payload.fn = hashValue(userData.first_name);
  if (userData.last_name) payload.ln = hashValue(userData.last_name);
  if (userData.external_id) payload.external_id = hashValue(userData.external_id);
  if (userData.fbp) payload.fbp = userData.fbp;
  if (userData.fbc) payload.fbc = userData.fbc;

  return payload;
};

export async function POST(request: NextRequest) {
  const accessToken = process.env.META_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const graphVersion = process.env.META_GRAPH_VERSION ?? "v20.0";
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!accessToken || !pixelId) {
    return NextResponse.json(
      { ok: false, error: "Missing META_ACCESS_TOKEN or META_PIXEL_ID" },
      { status: 500 },
    );
  }

  let payload: ClientEventPayload | null = null;
  try {
    payload = (await request.json()) as ClientEventPayload;
  } catch {
    payload = null;
  }

  if (!payload?.event_name) {
    return NextResponse.json(
      { ok: false, error: "Missing event_name" },
      { status: 400 },
    );
  }

  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "";
  const userAgent = request.headers.get("user-agent") ?? "";

  const eventPayload = {
    event_name: payload.event_name,
    event_time: payload.event_time ?? Math.floor(Date.now() / 1000),
    event_id: payload.event_id,
    event_source_url: payload.event_source_url,
    action_source: payload.action_source ?? "website",
    user_data: buildUserData(payload.user_data, ipAddress, userAgent),
    custom_data: payload.custom_data,
  };

  const response = await fetch(
    `https://graph.facebook.com/${graphVersion}/${pixelId}/events?access_token=${accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [eventPayload],
        ...(testEventCode ? { test_event_code: testEventCode } : {}),
      }),
    },
  );

  const responseBody = await response.json().catch(() => ({}));

  return NextResponse.json(
    { ok: response.ok, meta: responseBody },
    { status: response.ok ? 200 : 502 },
  );
}
