export const DEXTER_WHATSAPP_NUMBER = "923326135002";
export const WHATSAPP_REDIRECT_PATH = "/contact/whatsapp";

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${DEXTER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const buildInternalWhatsAppRedirectUrl = (
  message: string,
  source?: string,
) => {
  const params = new URLSearchParams({
    text: message,
  });

  if (source) {
    params.set("source", source);
  }

  return `${WHATSAPP_REDIRECT_PATH}?${params.toString()}`;
};
