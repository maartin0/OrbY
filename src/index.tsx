import * as React from "react";
import { createRoot } from 'react-dom/client';
import App from './views/App';

const root: HTMLDivElement = document.createElement("div");
document.body.appendChild(root);
createRoot(root).render(<App />);
