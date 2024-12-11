import { Typography, Card } from "@material-tailwind/react";
import { Route, Routes } from "react-router-dom";
import Films from "./Pages/Films";
import Create from "./Pages/Create";
import Update from "./Pages/Update";
import NavbarDefault from "./Components/Navbar";

export default function App() {
  return (
    <div>
      <NavbarDefault/>
    <Routes>
      <Route path="/films" element={<Films />} />
      <Route path="/create" element={<Create />} />
      <Route path="/films/:id" element={<Update />} />
    </Routes>
    </div>
  );
}
