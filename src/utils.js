import { MONTHS } from "./data";

export const getFavicon  = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
export const makeTag     = (u) => "@" + u.toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 18);
export const randCode    = () => String(Math.floor(100000 + Math.random() * 900000));
export const roomId      = () => Math.random().toString(36).slice(2, 8).toUpperCase();
export const todayStr    = () => {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};
export const fmtDate = (s) => {
  if (!s) return "";
  const d = new Date(s + "T00:00:00");
  return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
};
export const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Morning" : h < 18 ? "Afternoon" : "Evening";
};
