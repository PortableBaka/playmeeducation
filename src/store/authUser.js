import { SESSION_LIFETIME } from "../config";

export function getAuthenticatedUser() {
  const expiration = localStorage.getItem("loginExpiration");
  if (expiration && parseInt(expiration) < Date.now()) {
    return {
      user: null,
      isAuthenticated: false,
    };
  }

  let token = localStorage.getItem("accessToken");
  let user = null;

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      user = JSON.parse(jsonPayload);
      if (user) {
        const adminType = localStorage.getItem("adminType");
        user.roleCode = adminType ? adminType.toLowerCase() : undefined;
      }
    } catch (error) {
      console.error("Invalid token:", error.message);
      user = null;
    }
  }

  return {
    user: user,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  };
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("adminType");
  localStorage.removeItem("loginExpiration");
  localStorage.removeItem("kindergartenId");
  localStorage.removeItem("selectedBranchId");
}

export function setLoggedUser(user) {
  user?.branch_id && localStorage.setItem("selectedBranchId", user?.branch_id);
  localStorage.setItem("kindergartenId", user?.kindergarden_id);
  localStorage.setItem("adminType", user?.admin_type);
  localStorage.setItem("accessToken", user?.access_token);
  localStorage.setItem("refreshToken", user?.refresh_token);
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem(
    "loginExpiration",
    (Date.now() + SESSION_LIFETIME).toString()
  );
  setTimeout(() => {
    logout();
  }, SESSION_LIFETIME);
}
