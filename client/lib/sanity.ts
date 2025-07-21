import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.VITE_SANITY_DATASET || "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-01-01",
  token: process.env.VITE_SANITY_TOKEN, // Only needed for mutations
});

// GROQ queries for events
export const eventsQuery = `*[_type == "event" && dateTime(date + "T" + time) > now()] | order(date asc) {
  _id,
  title,
  description,
  date,
  time,
  location,
  maxAttendees,
  "currentAttendees": count(*[_type == "registration" && event._ref == ^._id]),
  image,
  skillLevel,
  tags
}`;

export const pastEventsQuery = `*[_type == "event" && dateTime(date + "T" + time) < now()] | order(date desc) [0...6] {
  _id,
  title,
  date,
  location,
  image
}`;

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
