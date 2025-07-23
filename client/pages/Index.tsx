import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Palette,
  MapPin,
  Calendar,
  Users,
  Camera,
  ArrowRight,
  Instagram,
  Heart,
  Clock,
  Compass,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useUpcomingEvents,
  formatEventDate,
  formatEventTime,
} from "@/hooks/useEvents";
import { urlFor } from "@/lib/sanity";
import { useCommunityHighlights } from "@/hooks/useCommunityHighlights";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { CITY_NAME, EVENT_FREQUENCY, ACTIVE_MEMBERS } from "@/lib/constants";

export default function Index() {
  const { data: upcomingEvents, isLoading, error } = useUpcomingEvents();
  const {
    data: communityHighlights,
    isLoading: highlightsLoading,
    error: highlightsError,
  } = useCommunityHighlights();

  const [openImage, setOpenImage] = useState<null | { url: string; alt: string }>(null);
  // Add state for open event modal
  const [openEvent, setOpenEvent] = useState<null | typeof eventsToDisplay[0]>(null);

  

  // Use CMS events if available, otherwise fallback
  const eventsToDisplay =
    upcomingEvents?.slice(0, 3) ?? [];

  const highlightsToDisplay =
    communityHighlights?.slice(0, 3) ?? [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/32991341/pexels-photo-32991341.jpeg)",
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sketch-blue/30 via-black/20 to-sketch-charcoal/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            <Badge className="mb-6 bg-white/90 text-sketch-blue border-white/20 hover:bg-white backdrop-blur-sm">
              {CITY_NAME} chapter
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Drawing {CITY_NAME},{" "}
              <span className="text-blue-300 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                one sketch
              </span>{" "}
              at a time
            </h1>

            <p className="text-lg lg:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-xl [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
              Join our vibrant community of artists capturing the essence of {CITY_NAME} through on-location drawing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-sketch-blue hover:bg-sketch-blue/90 text-white"
              >
                <Link to="/join">
                  Join our community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
              >
                <Link to="/events">View upcoming events</Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white backdrop-blur-md bg-black/30 rounded-full px-8 py-4 border border-white/20">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{ACTIVE_MEMBERS}+ active members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{EVENT_FREQUENCY} events</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>All over {CITY_NAME}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-sketch-charcoal mb-4">
              The Urban Sketchers way
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We follow the Urban Sketchers manifesto, drawing on location and
              sharing our perspective of {CITY_NAME} with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-sketch-blue/20 hover:border-sketch-blue/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 bg-sketch-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Compass className="h-6 w-6 text-sketch-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-sketch-charcoal">
                  Draw on location
                </h3>
                <p className="text-foreground/70">
                  We capture what we see from direct observation, whether
                  indoors or outdoors across {CITY_NAME}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sketch-sunset/20 hover:border-sketch-sunset/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 bg-sketch-sunset/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-6 w-6 text-sketch-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-sketch-charcoal">
                  Tell stories
                </h3>
                <p className="text-foreground/70">
                  Our drawings document {CITY_NAME}'s places and moments,
                  creating a visual diary of our city.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sketch-forest/20 hover:border-sketch-forest/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 bg-sketch-forest/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-sketch-forest" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-sketch-charcoal">
                  Support each other
                </h3>
                <p className="text-foreground/70">
                  We draw together, learn from each other, and share our work to
                  inspire the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24 bg-sketch-paper/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-sketch-charcoal mb-2">
                Upcoming events
              </h2>
              <p className="text-foreground/70">
                Join us for our next sketching adventures around {CITY_NAME}
              </p>
              {error && (
                <p className="text-sm text-orange-600 mt-1">
                  Using fallback events - CMS connection needed
                </p>
              )}
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/events">
                View all events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-sketch-blue" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventsToDisplay.map((event) => (
                <Card
                  key={event._id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
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
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/events">
                View all events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-sketch-charcoal mb-2">
                Community highlights
              </h2>
              <p className="text-foreground/70">
                Recent sketches from our talented artists
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/gallery">
                View gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {highlightsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-sketch-blue" />
            </div>
          ) : highlightsError ? (
            <p className="text-center text-sm text-orange-600">
              Error loading community highlights: {highlightsError.message}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlightsToDisplay.map((highlight, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => {
                    if (highlight.image) {
                      setOpenImage({
                        url: urlFor(highlight.image).url(),
                        alt: highlight.artwork,
                      });
                    }
                  }}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-sketch-paper to-oslo-snow rounded-t-lg relative overflow-hidden">
                      {highlight.image ? (
                        <img
                          src={urlFor(highlight.image)
                            .width(600)
                            .height(600)
                            .fit("crop")
                            .url()}
                          alt={highlight.artwork}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-sketch-charcoal/5 flex items-center justify-center">
                          <div className="text-center">
                            <Palette className="h-12 w-12 text-sketch-blue/40 mx-auto mb-2" />
                            <p className="text-sm text-foreground/60">
                              "{highlight.artwork}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sketch-charcoal">
                          by {highlight.artist}
                        </h3>
                      </div>
                      <p className="text-sm text-foreground/70">
                        {highlight.medium}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/gallery">
                View gallery
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-sketch-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to start sketching {CITY_NAME}?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Join our welcoming community and discover {CITY_NAME} through the
              eyes of an artist. All skill levels welcome – bring your curiosity
              and we'll provide the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-sketch-blue hover:bg-gray-50"
              >
                <Link to="/join">
                  Join our community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
              >
                <a
                  href="https://instagram.com/urbansketchers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Follow on Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for expanded image */}
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none flex items-center justify-center border-0 focus:outline-none focus:ring-0">
          {openImage && (
            <img
              src={openImage.url}
              alt={openImage.alt}
              className="max-h-[80vh] max-w-full h-auto w-auto rounded-lg shadow-2xl"
              style={{ background: "#fff" }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Modal for expanded event */}
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
    </Layout>
  );
}
