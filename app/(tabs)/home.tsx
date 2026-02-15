import { Screen } from "@/src/components/ui/Screen";
import { OUHeader } from "@/src/components/ui/OUHeader";
import { LandingScreen } from "@/src/features/LandingScreen";

export default function HomeScreen() {
  return (
    <Screen>
      <OUHeader fullWidth />
      <LandingScreen />
    </Screen>
  );
}
