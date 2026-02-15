import { Screen } from "@/src/components/ui/Screen";
import { OUHeader } from "@/src/components/ui/OUHeader";
import { SignUpScreen } from "@/src/features/SignUpScreen";

export default function SignUpRoute() {
  return (
    <Screen>
      <OUHeader showBackButton fullWidth />
      <SignUpScreen />
    </Screen>
  );
}
