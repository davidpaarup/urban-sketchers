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

export default function Index() {
  const { data: upcomingEvents, isLoading, error } = useUpcomingEvents();
  const { data: communityHighlights, isLoading: highlightsLoading, error: highlightsError } = useCommunityHighlights();

  // Fallback events for when CMS is not connected
  const fallbackEvents = [
    {
      _id: "1",
      title: "New Year Sketch Walk: Akershus Fortress",
      date: "2024-01-04",
      time: "10:00",
      location: "Akershus Fortress",
      currentAttendees: 18,
      image: undefined,
    },
    {
      _id: "2",
      title: "Winter Portraits Workshop",
      date: "2024-01-12",
      time: "13:00",
      location: "Tjuvholmen Art Museum",
      currentAttendees: 10,
      image: undefined,
    },
    {
      _id: "3",
      title: "Sketching the Northern Lights",
      date: "2024-01-17",
      time: "19:30",
      location: "Ekeberg Park",
      currentAttendees: 22,
      image: undefined,
    },
  ];

  const fallbackHighlights = [
    {
      artist: "Nina K.",
      artwork: "Oslo Central Station",
      medium: "Watercolor & Ink",
      likes: 47,
    },
    {
      artist: "Erik M.",
      artwork: "Aker Brygge Morning",
      medium: "Pencil Sketch",
      likes: 32,
    },
    {
      artist: "Sara L.",
      artwork: "Holmenkollen View",
      medium: "Digital Sketch",
      likes: 58,
    },
  ];

  // Use CMS events if available, otherwise fallback
  const eventsToDisplay =
    upcomingEvents && upcomingEvents.length > 0
      ? upcomingEvents.slice(0, 3)
      : fallbackEvents;

  const highlightsToDisplay =
    communityHighlights && communityHighlights.length > 0
      ? communityHighlights
      : fallbackHighlights;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/33116411/pexels-photo-33116411.jpeg)',
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sketch-blue/30 via-black/20 to-sketch-charcoal/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
            <Badge className="mb-6 bg-white/90 text-sketch-blue border-white/20 hover:bg-white backdrop-blur-sm">
              <Palette className="h-3 w-3 mr-1" />
              Our Chapter
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
              Drawing our location, <span className="text-blue-300 drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">One Sketch</span>{" "}
              at a Time
            </h1>

            <p className="text-lg lg:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-xl [text-shadow:_1px_1px_3px_rgb(0_0_0_/_70%)]">
              Join our vibrant community of artists capturing the essence of
              our location through on-location drawing. From the fjord to the forests,
              we sketch the stories of our beautiful city.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-sketch-blue hover:bg-sketch-blue/90 text-white"
              >
                <Link to="/join">
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Link to="/events">View Upcoming Events</Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-white backdrop-blur-md bg-black/30 rounded-full px-8 py-4 border border-white/20">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>150+ Active Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Weekly Events</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>All Over our location</span>
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
              The Urban Sketchers Way
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We follow the Urban Sketchers manifesto, drawing on location and
              sharing our perspective of our location with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-sketch-blue/20 hover:border-sketch-blue/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 bg-sketch-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Compass className="h-6 w-6 text-sketch-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-sketch-charcoal">
                  Draw on Location
                </h3>
                <p className="text-foreground/70">
                  We capture what we see from direct observation, whether
                  indoors or outdoors across our location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sketch-sunset/20 hover:border-sketch-sunset/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 bg-sketch-sunset/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-6 w-6 text-sketch-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-sketch-charcoal">
                  Tell Stories
                </h3>
                <p className="text-foreground/70">
                  Our drawings document our location's places and moments, creating a
                  visual diary of our city.
                </p>
              </CardContent>
            </Card>

            <Card className="border-sketch-forest/20 hover:border-sketch-forest/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 bg-sketch-forest/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-sketch-forest" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-sketch-charcoal">
                  Support Each Other
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
                Upcoming Events
              </h2>
              <p className="text-foreground/70">
                Join us for our next sketching adventures around our location
              </p>
              {error && (
                <p className="text-sm text-orange-600 mt-1">
                  Using fallback events - CMS connection needed
                </p>
              )}
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/events">
                View All Events
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
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    {event.image && (
                      <div className="mb-4 rounded-lg overflow-hidden aspect-video bg-muted">
                        <img
                          src={urlFor(event.image).width(600).height(338).fit('crop').url()}
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
                      <div className="flex items-center text-sm text-foreground/60">
                        <Users className="h-3 w-3 mr-1" />
                        {event.currentAttendees}
                      </div>
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

                    <Button
                      className="w-full mt-4 bg-sketch-blue hover:bg-sketch-blue/90"
                      size="sm"
                    >
                      Join Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/events">
                View All Events
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
                Community Highlights
              </h2>
              <p className="text-foreground/70">
                Recent sketches from our talented artists
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/gallery">
                View Gallery
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
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-sketch-paper to-oslo-snow rounded-t-lg relative overflow-hidden">
                      {highlight.image ? (
                        <img
                          src={urlFor(highlight.image).width(600).height(600).fit('crop').url()}
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
                        <div className="flex items-center text-sm text-foreground/60">
                          <Heart className="h-3 w-3 mr-1 text-red-500" />
                          {highlight.likes}
                        </div>
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
                View Gallery
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
              Ready to Start Sketching our location?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Join our welcoming community and discover our location through the eyes of
              an artist. All skill levels welcome – bring your curiosity and
              we'll provide the rest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-sketch-blue hover:bg-gray-50"
              >
                <Link to="/join">
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
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
    </Layout>
  );
}
