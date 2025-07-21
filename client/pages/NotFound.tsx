import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-8">
            <div className="mb-6 bg-sketch-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Compass className="h-10 w-10 text-sketch-blue" />
            </div>
            <h1 className="text-6xl font-bold text-sketch-charcoal mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-sketch-charcoal mb-3">Sketch Not Found</h2>
            <p className="text-foreground/70 mb-2">
              Looks like you've wandered off the sketching path! 
            </p>
            <p className="text-foreground/70">
              This page doesn't exist in our Oslo sketchbook.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/events">
                  <MapPin className="h-4 w-4 mr-2" />
                  Find Events
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-foreground/60 mt-6">
              Path attempted: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
