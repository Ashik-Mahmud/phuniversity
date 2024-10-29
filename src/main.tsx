import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "./index.css";
import { persistor, store } from "./redux/store.ts";
import router from "./routes/routes.tsx";

import { MantineProvider } from "@mantine/core";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <RouterProvider router={router} />
        </PersistGate>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
