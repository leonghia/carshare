import { PasswordStrength } from "@/types/password";

export const calculatePasswordStrength = (
  password: string
): PasswordStrength => {
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
