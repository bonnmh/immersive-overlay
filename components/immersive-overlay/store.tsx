import { useCallback } from "react";
import { type SharedValue, makeMutable } from "react-native-reanimated";
import { create } from "zustand";

export interface ImmersiveOverlayState {
	displayImmersiveOverlay: SharedValue<boolean>;
	contentComponent: React.ReactNode | null;
	colors: {
		primary: string;
		secondary: string;
		expanding: {
			dark: string[];
			light: string[];
		};
	};
}

const DEFAULT_COLORS = {
	primary: "#5465ff",
	secondary: "#5465ff",
	expanding: {
		dark: ["orange", "red", "#5465ff"],
		light: ["orange", "red", "#0077b6"],
	},
};

export const useImmersiveOverlayStore = create<ImmersiveOverlayState>(() => ({
	displayImmersiveOverlay: makeMutable(false),
	contentComponent: null,
	colors: DEFAULT_COLORS,
}));

export function useImmersiveOverlay() {
	const store = useImmersiveOverlayStore();

	const immerse = useCallback(
		({
			component,
			colors,
		}: {
			component?: React.ReactNode;
			colors?: typeof DEFAULT_COLORS;
		} = {}) => {
			useImmersiveOverlayStore.setState((state) => ({
				...state,
				contentComponent: component ?? null,
				colors: colors ?? DEFAULT_COLORS,
			}));

			store.displayImmersiveOverlay.value = true;
		},
		[store.displayImmersiveOverlay],
	);

	const dismiss = useCallback(() => {
		store.displayImmersiveOverlay.value = false;
	}, [store.displayImmersiveOverlay]);

	return {
		immerse,
		dismiss,
		displayImmersiveOverlay: store.displayImmersiveOverlay,
	};
}
