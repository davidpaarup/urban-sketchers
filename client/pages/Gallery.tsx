import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Palette } from "lucide-react";
import { useCommunityHighlights } from "@/hooks/useCommunityHighlights";
import { urlFor } from "@/lib/sanity";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { CITY_NAME } from "@/lib/constants";

export default function Gallery() {
  const { data: highlights, isLoading, error } = useCommunityHighlights();
  const [openImage, setOpenImage] = useState<null | { url: string; alt: string }>(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
        <h1 className="text-4xl font-bold text-sketch-charcoal mb-4 text-center">Sketch Gallery</h1>
        <p className="text-lg text-foreground/70 mb-12 text-center max-w-2xl mx-auto">
          Explore beautiful sketches from our community members, capturing {CITY_NAME}'s unique character and charm.
        </p>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full h-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-sm text-orange-600">Error loading gallery: {error.message}</p>
        ) : highlights.length === 0 ? (
          <p className="text-center text-muted-foreground">No highlights found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
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
      </div>
    </Layout>
  );
}
