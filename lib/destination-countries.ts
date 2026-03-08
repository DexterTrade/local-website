export const DESTINATION_COUNTRIES = [
  { country: "United Kingdom", flag: "🇬🇧" },
  { country: "United States", flag: "🇺🇸" },
  { country: "United Arab Emirates", flag: "🇦🇪" },
  { country: "Saudi Arabia", flag: "🇸🇦" },
  { country: "France", flag: "🇫🇷" },
  { country: "Canada", flag: "🇨🇦" },
  { country: "Germany", flag: "🇩🇪" },
  { country: "Netherlands", flag: "🇳🇱" },
] as const;

export const DESTINATION_COUNTRY_NAMES = DESTINATION_COUNTRIES.map(
  (destination) => destination.country,
);
