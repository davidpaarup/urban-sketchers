import { PlaceholderPage } from "@/components/PlaceholderPage";
import { CITY_NAME } from "@/lib/constants";

export default function About() {
  return (
    <PlaceholderPage
      title="About Us"
      description={`Learn about our vibrant sketching community in ${CITY_NAME} and our mission to capture the city's essence through art.`}
    />
  );
}
