import { Screen } from "@/src/components/ui/Screen";
import { OUHeader } from "@/src/components/ui/OUHeader";
import { LogInScreen } from "@/src/features/LogInScreen";

export default function LogInRoute() {
  return (
    <Screen>
      <OUHeader showBackButton fullWidth />
      <LogInScreen />
    </Screen>
  );
}
