import { useImmersiveOverlay } from "@/components/immersive-overlay/store";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
	const { immerse } = useImmersiveOverlay();

	const basicExampleFn = () => {
		immerse();
	};

	const differentPalleteExampleFn = () => {
		immerse({
			colors: {
				primary: "#FF69B4",
				secondary: "#1E90FF",
				expanding: {
					dark: ["#FF69B4", "#DA70D6", "#1E90FF"],
					light: ["#FF69B4", "#DA70D6", "#1E90FF"],
				},
			},
		});
	};

	const withComponentExampleFn = () => {
		immerse({
			component: (
				<View
					style={{
						marginTop: "auto",

						justifyContent: "center",
						padding: 36,
					}}
				>
					<Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
						dimelo
					</Text>
					<Text
						style={{
							color: "white",
							fontSize: 24,
							fontWeight: "medium",
							opacity: 0.8,
						}}
					>
						Hello, Hola, Bonjour, Ciao, Hallo, Olá, Привет, こんにちは, 你好,
						안녕하세요, Merhaba, Γειά σου, नमस्ते, สวัสดี, Xin chào, Salaam, Jambo,
						Hej, Ahoj, Aloha
					</Text>
				</View>
			),
			colors: {
				primary: "#FF0000",
				secondary: "#8B0000",
				expanding: {
					dark: ["#FF0000", "#B22222", "#8B0000"],
					light: ["#FF6347", "#DC143C", "#CD5C5C"],
				},
			},
		});
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFF",
			}}
		>
			<Button title="Basic" onPress={basicExampleFn} />
			<Button
				title="w/ different pallete"
				onPress={differentPalleteExampleFn}
			/>
			<Button
				title="w/ component & different pallete"
				onPress={withComponentExampleFn}
			/>
		</View>
	);
}
