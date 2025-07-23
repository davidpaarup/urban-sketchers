import { Layout } from "@/components/Layout";
import { CITY_NAME } from "@/lib/constants";

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">About Urban Sketchers {CITY_NAME}</h1>
        <p className="mb-4">
          Urban Sketchers {CITY_NAME} is a local chapter of the global Urban Sketchers movement, dedicated to fostering a vibrant community of artists who love to draw on location. Our mission is to capture the world around us—one sketch at a time—while sharing stories and perspectives from our unique city.
        </p>
        <p className="mb-4">
          We welcome artists of all skill levels, from absolute beginners to seasoned professionals. Our group meets regularly to sketch together in various locations throughout {CITY_NAME}, exploring everything from bustling city streets and tranquil parks to historic landmarks and hidden gems.
        </p>
        <p className="mb-4">
          As part of the Urban Sketchers community, we follow the global manifesto: to draw on location, indoors or out; to tell the story of our surroundings; to be truthful to the scenes we witness; to use any kind of media and cherish our individual styles; and to support each other and share our sketches online.
        </p>
        <p className="mb-4">
          Whether you’re looking to improve your drawing skills, meet like-minded creatives, or simply see {CITY_NAME} from a new perspective, Urban Sketchers {CITY_NAME} is the perfect place to start. Join us at our next sketchcrawl and become part of a worldwide network of passionate urban sketchers!
        </p>
      </div>
    </Layout>
  );
}
