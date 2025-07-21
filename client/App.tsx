import { createRoot } from "react-dom/client";

const App = () => (
  <div style={{ 
    minHeight: "100vh", 
    backgroundColor: "red", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold"
  }}>
    BASIC TEST - APP IS WORKING
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
