import { createRoot } from "react-dom/client";

//@ts-ignore

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

createRoot(document.getElementById("root")!).render(<App />);
