import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { Toggle } from "@/src/components/ui/Toggle";
import { Input } from "@/src/components/ui/Input";

export function ComponentDemo() {
  const [toggleValue, setToggleValue] = useState(true);

  return (
    <>
      <Text variant="title">Home (This is a title)</Text>

      <Text variant="subtitle">Components Below (This is a subtitle)</Text>

      <Text variant="body">Button (This is a body)</Text>
      <Button title="Click me" onPress={() => console.log("Button pressed")} />

      <Text variant="body">Toggle</Text>
      <Toggle value={toggleValue} onValueChange={setToggleValue} />

      <Text variant="body">Input Field</Text>
      <Input label="First Name" value="Your mom" onChangeText={(text) => console.log("Input changed", text)} />

      <Text variant="body">Input Field with Error</Text>
      <Input label="Last Name" value="Bryan is a chud" onChangeText={(text) => console.log("Input changed", text)} error="This is an input error" />
    </>
  );
}
