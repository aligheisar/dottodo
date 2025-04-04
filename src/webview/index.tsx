import { createRoot } from "react-dom/client";
import Root from "./Root";
import "./styles/globals.css";

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);
