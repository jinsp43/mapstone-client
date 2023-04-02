import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import GroupsList from "./components/GroupsList/GroupsList";
import Header from "./components/Header/Header";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MapPage from "./pages/MapPage/MapPage";
import SignupPage from "./pages/SignupPage/SignupPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="landing" element={<LandingPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="build" element={<GroupsList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
