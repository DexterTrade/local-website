export const SHIPPING_FORM_ID = "shipping-price-form";
export const SHIPPING_NAME_INPUT_ID = "shipping-name";

export const scrollToShippingForm = () => {
  if (typeof document === "undefined") return;

  const formSection = document.getElementById(SHIPPING_FORM_ID);
  if (!formSection) return;

  formSection.scrollIntoView({ behavior: "smooth", block: "start" });

  window.setTimeout(() => {
    const nameInput = document.getElementById(SHIPPING_NAME_INPUT_ID) as
      | HTMLInputElement
      | null;
    nameInput?.focus();
  }, 400);
};
