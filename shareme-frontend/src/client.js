import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
	projectId: import.meta.env.VITE_APP_SANITY_STUDIO_PROJECT_ID,
	dataset: import.meta.env.VITE_APP_SANITY_STUDIO_PRODUCTION,
	apiVersion: "2024-04-13",
	useCdn: true,
	token: import.meta.env.VITE_APP_SANITY_STUDIO_TOKEN,
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
