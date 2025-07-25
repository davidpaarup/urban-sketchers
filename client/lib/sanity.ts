import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Check if running in browser and environment variables are available
const isConfigured =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_SANITY_PROJECT_ID;

export const client = isConfigured
  ? createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
      token: import.meta.env.VITE_SANITY_TOKEN,
    })
  : null;

// Helper to build image URLs from Sanity image objects
export function urlFor(source: any) {
  if (!client) return null;
  return imageUrlBuilder(client).image(source);
}

// GROQ queries for events
export const eventsQuery = `*[_type == "event" && date >= now()] | order(date asc) {
  _id,
  title,
  description,
  date,
  time,
  location,
  image,
  tags
}`;

export const pastEventsQuery = `*[_type == "event" && dateTime(date + "T" + time) < now()] | order(date desc) [0...6] {
  _id,
  title,
  date,
  location,
  image
}`;

// GROQ query for blog posts
export const blogPostsQuery = `*[_type == "blogPost" && defined(publishedAt) && !(_id in path('drafts.**'))] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt,
  body
}`;

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: any;
  excerpt?: string;
  body?: any;
}

// Event type definition
export interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location: string;
  maxAttendees?: number;
  currentAttendees: number;
  image?: any;
  skillLevel?: "beginner" | "intermediate" | "advanced" | "all";
  tags?: string[];
}
