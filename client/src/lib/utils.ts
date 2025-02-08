import { Strength } from "@/components/ui/passwordField";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["xxs"] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};

export const parseNumericValue = (value: string): string => {
  if (value.trim().length === 0) return "";
  const parsed: string[] = [];
  const raw = value.split("");
  raw.forEach((e) => {
    if (!isNaN(Number(e))) parsed.push(e);
  });
  return parsed.join("");
};

export const parseTelValue = (value: string): string => {
  const input = parseNumericValue(value.split(" ").join(""));
  const firstGroup = input.slice(0, 4);
  const remaining = input.slice(4);
  const otherGroups = remaining.match(/.{1,3}/g) || [];
  return [firstGroup, ...otherGroups].join(" ");
};

export const calculatePasswordStrength = (password: string): Strength => {
  let score = 0;

  if (password.length === 0) return "default";
  if (password.length < 6) return "weak";
  // Check password length
  if (password.length >= 12) score += 1;
  // Contains lowercase
  if (/[a-z]/.test(password)) score += 1;
  // Contains uppercase
  if (/[A-Z]/.test(password)) score += 1;
  // Contains numbers
  if (/\d/.test(password)) score += 1;
  // Contains special characters
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  switch (score) {
    case 0:
    case 1:
    case 2:
      return "weak";
    case 3:
    case 4:
      return "average";
    default:
      return "strong";
  }
};

export const obscureEmail = (email: string): string => {
  const [name, domain] = email.split("@");
  return `${name[0]}${new Array(name.length).join("*")}@${domain}`;
};

export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month and pad
  const year = date.getFullYear(); // Get the full year

  return `${day}/${month}/${year}`; // Return in dd/mm/yyyy format
};

export const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeStyle: "short",
});

export const moneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
