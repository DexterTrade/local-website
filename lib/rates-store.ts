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

const PRIMARY_DATA_DIR = path.join(process.cwd(), "data");
const FALLBACK_DATA_DIR = path.join("/tmp", "logistics-website-data");
const RATES_FILENAME = "country-rates.json";

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

let cachedRatesFilePath: string | null = null;

const resolveRatesFilePath = async () => {
  if (cachedRatesFilePath) return cachedRatesFilePath;

  const envPath = process.env.RATES_FILE_PATH;
  if (envPath) {
    const envDir = path.dirname(envPath);
    await fs.mkdir(envDir, { recursive: true });
    cachedRatesFilePath = envPath;
    return cachedRatesFilePath;
  }

  try {
    await fs.mkdir(PRIMARY_DATA_DIR, { recursive: true });
    cachedRatesFilePath = path.join(PRIMARY_DATA_DIR, RATES_FILENAME);
    return cachedRatesFilePath;
  } catch {
    await fs.mkdir(FALLBACK_DATA_DIR, { recursive: true });
    cachedRatesFilePath = path.join(FALLBACK_DATA_DIR, RATES_FILENAME);
    return cachedRatesFilePath;
  }
};

const ensureRatesFile = async () => {
  const ratesFile = await resolveRatesFilePath();
  try {
    await fs.access(ratesFile);
  } catch {
    const payload: CountryRatesFile = { rates: defaultRates() };
    await fs.writeFile(ratesFile, JSON.stringify(payload, null, 2), "utf8");
  }
};

export const getCountryRates = async () => {
  try {
    await ensureRatesFile();
    const ratesFile = await resolveRatesFilePath();
    const content = await fs.readFile(ratesFile, "utf8");
    const parsed = JSON.parse(content) as CountryRatesFile;
    return normalizeRates(parsed.rates ?? []);
  } catch {
    return defaultRates();
  }
};

export const saveCountryRates = async (rates: CountryRate[]) => {
  const normalized = normalizeRates(rates);
  const payload: CountryRatesFile = { rates: normalized };
  try {
    await ensureRatesFile();
    const ratesFile = await resolveRatesFilePath();
    await fs.writeFile(ratesFile, JSON.stringify(payload, null, 2), "utf8");
    return normalized;
  } catch {
    return normalized;
  }
};
