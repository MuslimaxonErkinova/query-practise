import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@material-tailwind/react";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <ToastContainer />
      <App />
    </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
