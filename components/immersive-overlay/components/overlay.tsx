import { StyleSheet, type ViewStyle } from "react-native";
import Animated, {
	Easing,
	useAnimatedProps,
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { useImmersiveOverlayStore } from "../store";
import { Gradient } from "./gradient/index";

const ALL_ANIMATION_DURATION = 500;
const OPACITY_DURATION = 300;
const EASING_BEZIER = [0.59, 0, 0.35, 1] as const;

const Content = () => {
	const { displayImmersiveOverlay, contentComponent } =
		useImmersiveOverlayStore();

	const animatedStyles = useAnimatedStyle(() => {
		const duration = ALL_ANIMATION_DURATION;
		const easing = Easing.bezier(...EASING_BEZIER);

		const enteringState = {
			opacity: 1,
			transform: [
				{ perspective: 1000 },
				{ rotateX: "0deg" },
				{ skewY: "0deg" },
				{ scaleY: 1 },
				{ scaleX: 1 },
				{ translateY: 0 },
			],
		};

		const exitingState = {
			opacity: 0,
			transform: [
				{ perspective: 1000 },
				{ rotateX: `${1 * -5}deg` },
				{ skewY: `${-1 * 1.5}deg` },
				{ scaleY: 1 + 1 * 1 },
				{ scaleX: 1 - 1 * 1 * 0.6 },
				{ translateY: 100 },
			],
		};

		return {
			flex: 1,
			opacity: displayImmersiveOverlay.value
				? withTiming(enteringState.opacity, { duration })
				: withTiming(exitingState.opacity, { duration: OPACITY_DURATION }),

			transform: [
				{ perspective: 1000 },
				{
					rotateX: displayImmersiveOverlay.value
						? withTiming(enteringState.transform[1]!.rotateX as string, {
								duration,
								easing,
							})
						: withTiming(exitingState.transform[1]!.rotateX as string, {
								duration,
								easing,
							}),
				},
				{
					skewY: displayImmersiveOverlay.value
						? withTiming(enteringState.transform[2]!.skewY as string, {
								duration,
								easing,
							})
						: withTiming(exitingState.transform[2]!.skewY as string, {
								duration,
								easing,
							}),
				},
				{
					scaleY: displayImmersiveOverlay.value
						? withTiming(
								enteringState.transform[3]!.scaleY as unknown as string,
								{
									duration,
									easing,
								},
							)
						: withTiming(
								exitingState.transform[3]!.scaleY as unknown as string,
								{
									duration,
									easing,
								},
							),
				},
				{
					scaleX: displayImmersiveOverlay.value
						? withTiming(
								enteringState.transform[4]!.scaleX as unknown as string,
								{
									duration,
									easing,
								},
							)
						: withTiming(
								exitingState.transform[4]!.scaleX as unknown as string,
								{
									duration,
									easing,
								},
							),
				},
				{
					translateY: displayImmersiveOverlay.value
						? withSpring(
								enteringState.transform[5]!.translateY as unknown as string,
							)
						: withTiming(
								exitingState.transform[5]!.translateY as unknown as string,
								{
									duration,
									easing,
								},
							),
				},
			],
		} as ViewStyle;
	});

	return (
		<Animated.View style={animatedStyles as ViewStyle}>
			{contentComponent}
		</Animated.View>
	);
};

export const Overlay = () => {
	const { displayImmersiveOverlay } = useImmersiveOverlayStore();

	const animatedRootContainerProps = useAnimatedProps(() => {
		return {
			pointerEvents: displayImmersiveOverlay.value
				? ("auto" as const)
				: ("none" as const),
		};
	});

	return (
		<Animated.View
			style={[
				{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 1000,
				},
			]}
			onTouchStart={() => {
				displayImmersiveOverlay.value = !displayImmersiveOverlay.value;
			}}
			animatedProps={animatedRootContainerProps}
		>
			<Gradient />
			<Animated.View
				style={[
					StyleSheet.absoluteFillObject,
					{
						zIndex: 1000,
					},
				]}
			>
				<Content />
			</Animated.View>
		</Animated.View>
	);
};
