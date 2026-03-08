import fs from "node:fs/promises";
import path from "node:path";
import { DESTINATION_COUNTRY_NAMES } from "@/lib/destination-countries";

export type CountryRate = {
  country: string;
  rate_per_kg: number;
  rate_per_pound: number;
  updated_at: string;
};

type CountryRatesFile = {
  rates: CountryRate[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const RATES_FILE = path.join(DATA_DIR, "country-rates.json");

const defaultRates = (): CountryRate[] =>
  DESTINATION_COUNTRY_NAMES.map((country) => ({
    country,
    rate_per_kg: 0,
    rate_per_pound: 0,
    updated_at: new Date().toISOString(),
  }));

const normalizeRates = (rates: CountryRate[]) => {
  const map = new Map(rates.map((rate) => [rate.country, rate]));
  return DESTINATION_COUNTRY_NAMES.map((country) => {
    const rate = map.get(country);
    if (!rate) {
      return {
        country,
        rate_per_kg: 0,
        rate_per_pound: 0,
        updated_at: new Date().toISOString(),
      };
    }

    return {
      country,
      rate_per_kg: Number.isFinite(rate.rate_per_kg) ? rate.rate_per_kg : 0,
      rate_per_pound: Number.isFinite(rate.rate_per_pound) ? rate.rate_per_pound : 0,
      updated_at: rate.updated_at || new Date().toISOString(),
    };
  });
};

const ensureRatesFile = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RATES_FILE);
  } catch {
    const payload: CountryRatesFile = { rates: defaultRates() };
    await fs.writeFile(RATES_FILE, JSON.stringify(payload, null, 2), "utf8");
  }
};

export const getCountryRates = async () => {
  await ensureRatesFile();
  const content = await fs.readFile(RATES_FILE, "utf8");
  const parsed = JSON.parse(content) as CountryRatesFile;
  return normalizeRates(parsed.rates ?? []);
};

export const saveCountryRates = async (rates: CountryRate[]) => {
  await ensureRatesFile();
  const normalized = normalizeRates(rates);
  const payload: CountryRatesFile = { rates: normalized };
  await fs.writeFile(RATES_FILE, JSON.stringify(payload, null, 2), "utf8");
  return normalized;
};
