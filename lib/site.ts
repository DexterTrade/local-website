export const getSiteUrl = () => {
  const value = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dextercargologistics.com";
  return value.replace(/\/+$/, "");
};
