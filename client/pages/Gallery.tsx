import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CITY_NAME } from "@/lib/constants";

export default function Gallery() {
  return (
    <PlaceholderPage
      title="Sketch Gallery"
      description={`Explore beautiful sketches from our community members, capturing ${CITY_NAME}'s unique character and charm.`}
    />
  );
}
