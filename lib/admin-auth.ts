export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin";

export const isAdminAuthorized = (username?: string | null, password?: string | null) => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};
