import "./global.css";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div className="min-h-screen bg-sketch-blue flex items-center justify-center">
      <div className="text-white text-4xl font-bold">
        Urban Sketchers Oslo - Test
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
