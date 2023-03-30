import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import MobileNav from "./components/MobileNav/MobileNav";
import MapPage from "./pages/MapPage/MapPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="map" element={<MapPage />} />
      </Routes>
      <MobileNav />
    </BrowserRouter>
  );
};

export default App;
