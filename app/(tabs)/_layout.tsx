import {Tabs} from "expo-router";
import React from "react";

import {ImmersiveOverlay} from "@/components/immersive-overlay";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<ImmersiveOverlay>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
					}}
				/>
			</Tabs>
		</ImmersiveOverlay>
	);
}
