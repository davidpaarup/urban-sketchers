import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CITY_NAME } from "@/lib/constants";

export default function Events() {
  return (
    <PlaceholderPage
      title="Events & Meetups"
      description={`Discover upcoming sketch walks, workshops, and community events happening around ${CITY_NAME}.`}
    />
  );
}
