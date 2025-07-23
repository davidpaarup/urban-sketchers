import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";

export function useCommunityHighlights() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    if (!client) {
      setData([]);
      setIsLoading(false);
      return;
    }

    client
      .fetch(
        `*[_type == "communityHighlight"] | order(_createdAt desc)[0...3]{
          artist,
          artwork,
          medium,
          likes,
          image
        }`
      )
      .then((results) => {
        setData(results);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
