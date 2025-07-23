import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Clock, MapPin } from "lucide-react";
import { useAllEvents, formatEventDate, formatEventTime } from "@/hooks/useEvents";
import { urlFor } from "@/lib/sanity";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CITY_NAME } from "@/lib/constants";

function isPastEvent(event) {
  // Combine date and time, compare to now
  const eventDateTime = new Date(`${event.date}T${event.time || '00:00'}`);
  return eventDateTime < new Date();
}

export default function Events() {
  const { data: events, isLoading, error } = useAllEvents();
  const [openEvent, setOpenEvent] = useState(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
        <h1 className="text-4xl font-bold text-sketch-charcoal mb-4 text-center">Events & Meetups</h1>
        <p className="text-lg text-foreground/70 mb-12 text-center max-w-2xl mx-auto">
          Discover upcoming sketch walks, workshops, and community events happening around {CITY_NAME}.
        </p>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video w-full h-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-sm text-orange-600">Error loading events: {error.message}</p>
        ) : events.length === 0 ? (
          <p className="text-center text-muted-foreground">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => {
              const past = isPastEvent(event);
              return (
                <Card
                  key={event._id}
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${past ? 'opacity-50 grayscale pointer-events-auto' : ''}`}
                  onClick={() => setOpenEvent(event)}
                >
                  <CardContent className="p-6">
                    {event.image && (
                      <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-muted">
                        <img
                          src={urlFor(event.image)
                            .width(600)
                            .height(338)
                            .fit("crop")
                            .url()}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <Badge
                        variant="secondary"
                        className="bg-sketch-blue/10 text-sketch-blue"
                      >
                        {formatEventDate(event.date)}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-sketch-charcoal">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-foreground/70">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-2" />
                        {formatEventTime(event.time)}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        {event.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        <Dialog open={!!openEvent} onOpenChange={() => setOpenEvent(null)}>
          <DialogContent className="max-w-xl focus:outline-none focus:ring-0">
            {openEvent && (
              <div>
                {openEvent.image && (
                  <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-muted">
                    <img
                      src={urlFor(openEvent.image)
                        .width(800)
                        .height(450)
                        .fit("crop")
                        .url()}
                      alt={openEvent.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <DialogTitle className="mb-2">{openEvent.title}</DialogTitle>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-sketch-blue/10 text-sketch-blue">
                    {formatEventDate(openEvent.date)}
                  </Badge>
                  <span className="flex items-center text-sm text-foreground/70">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatEventTime(openEvent.time)}
                  </span>
                  <span className="flex items-center text-sm text-foreground/70">
                    <MapPin className="h-3 w-3 mr-1" />
                    {openEvent.location}
                  </span>
                </div>
                {openEvent.tags && openEvent.tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {openEvent.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <DialogDescription className="mt-2 whitespace-pre-line">
                  {openEvent.description || "No description provided."}
                </DialogDescription>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
