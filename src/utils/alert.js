import { writable } from "svelte/store";

function initialStore() {
	const { subscribe, set, update } = writable({
        message: null,
        type: null
    });

	return {
		subscribe,
		setAlert: (message, type) => set({message: message, type: type}),
		resetAlert: () => set({message: null, type: null}),
	};
}

export const alert = initialStore()