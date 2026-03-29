import { LoginError } from "@/src/lib/auth";

export function mapLoginErrorToUserMessage(error: unknown): string {
  if (error instanceof LoginError) {
    switch (error.code) {
      case "INVALID_CREDENTIALS":
        return "Invalid email or password";
      case "ACCOUNT_NOT_FOUND":
        return "Account not found";
      case "NETWORK_ERROR":
        return "Network error";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}
