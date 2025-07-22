import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-6">
            <Construction className="h-16 w-16 text-sketch-blue mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-sketch-charcoal mb-2">
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page is coming soon! We're working on bringing you amazing
              content about our location's sketching community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button
                asChild
                className="bg-sketch-blue hover:bg-sketch-blue/90"
              >
                <Link to="/join">Join Our Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
