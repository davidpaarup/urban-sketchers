import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CITY_NAME } from "@/lib/constants";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Construction className="h-12 w-12 text-sketch-blue" />
          <h1 className="text-3xl font-bold text-sketch-charcoal">{title}</h1>
          <p className="text-sm text-muted-foreground">
            This page is coming soon! We're working on bringing you amazing
            content about {CITY_NAME}'s sketching community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="text-blue-500 hover:underline flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
