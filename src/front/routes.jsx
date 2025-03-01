import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Actors } from "./pages/Actors";

export const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<Actors />} />
      </Route>
  )
);
