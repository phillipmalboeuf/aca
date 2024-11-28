import type { AvailableLanguageTag } from "../../lib/paraglide/runtime"
import type { ParaglideLocals } from "@inlang/paraglide-sveltekit"
// See https://kit.svelte.dev/docs/types#app

import type { TypePageSkeleton } from '$lib/clients/content_types';
import type { Entry } from 'contentful';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		 interface Locals {
    paraglide: ParaglideLocals<AvailableLanguageTag>,
}
		interface PageData {
			page?: Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
