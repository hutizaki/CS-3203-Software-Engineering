import { SignUpError } from "@/src/lib/auth";

export function mapSignUpErrorToUserMessage(error: unknown): string {
  if (error instanceof SignUpError) {
    switch (error.code) {
      case "DUPLICATE_EMAIL":
        return "Email already in use";
      case "WEAK_PASSWORD":
        return "Password too weak";
      case "NETWORK_ERROR":
        return "Network error, please try again";
      default:
        return "Something went wrong. Please try again.";
    }
  }
  return "Something went wrong. Please try again.";
}
