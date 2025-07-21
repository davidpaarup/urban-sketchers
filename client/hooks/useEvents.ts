import { useQuery } from "@tanstack/react-query";
import { client, eventsQuery, pastEventsQuery, Event } from "@/lib/sanity";

export function useUpcomingEvents() {
  return useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => {
      if (!client) {
        throw new Error("Sanity client not configured");
      }
      return client.fetch<Event[]>(eventsQuery);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!client, // Only run query if client is available
  });
}

export function usePastEvents() {
  return useQuery({
    queryKey: ["events", "past"],
    queryFn: () => {
      if (!client) {
        throw new Error("Sanity client not configured");
      }
      return client.fetch<Event[]>(pastEventsQuery);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!client, // Only run query if client is available
  });
}

// Helper function to format date for display
export function formatEventDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

// Helper function to format time for display
export function formatEventTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}
