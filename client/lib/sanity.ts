import { createClient } from '@sanity/client'

// Check if running in browser and environment variables are available
const isConfigured = typeof import.meta !== 'undefined' && 
  import.meta.env?.VITE_SANITY_PROJECT_ID;

export const client = isConfigured ? createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN,
}) : null;

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
}`

export const pastEventsQuery = `*[_type == "event" && dateTime(date + "T" + time) < now()] | order(date desc) [0...6] {
  _id,
  title,
  date,
  location,
  image
}`

// Event type definition
export interface Event {
  _id: string
  title: string
  description?: string
  date: string
  time: string
  location: string
  maxAttendees?: number
  currentAttendees: number
  image?: any
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all'
  tags?: string[]
}
