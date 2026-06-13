import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Pokédex",
          headerLargeTitle: true,
        }}
      />

      <Stack.Screen
        name="details"
        options={{
          headerTintColor: "white",
          headerTransparent: true,
        }}
      />
    </Stack>
  );
}
