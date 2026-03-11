export const CONTACT_FORM_ID = "contact-form";
export const CONTACT_FIRST_NAME_INPUT_ID = "contact-first-name";

export const buildContactLeadUrl = (leadStatus?: string) => {
  if (typeof window === "undefined") return "";

  const url = new URL(window.location.href);
  url.hash = CONTACT_FORM_ID;

  if (leadStatus) {
    url.searchParams.set("lead", leadStatus);
  } else {
    url.searchParams.delete("lead");
  }

  return url.toString();
};

export const updateContactLeadUrl = (leadStatus?: string) => {
  if (typeof window === "undefined") return;

  const nextUrl = buildContactLeadUrl(leadStatus);
  if (!nextUrl) return;

  window.history.replaceState(null, "", nextUrl);
};

export const scrollToContactForm = () => {
  if (typeof document === "undefined") return;

  const formSection = document.getElementById(CONTACT_FORM_ID);
  if (!formSection) return;

  updateContactLeadUrl();
  formSection.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    const firstNameInput = document.getElementById(CONTACT_FIRST_NAME_INPUT_ID) as
      | HTMLInputElement
      | null;
    firstNameInput?.focus();
  }, 400);
};
