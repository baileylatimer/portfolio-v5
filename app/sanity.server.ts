import { createClient } from "@sanity/client";

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error("SANITY_PROJECT_ID is not set");
}

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD)
  useCdn: process.env.NODE_ENV === "production",
});

console.log("Sanity client initialized with project ID:", process.env.SANITY_PROJECT_ID);