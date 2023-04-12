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
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="groups" element={<GroupsList />} />
        <Route path="groups/:groupId" element={<MapPage />} />
        <Route path="groups/:groupId/members" element={<MapPage />} />
        <Route path="groups/:groupId/places" element={<MapPage />} />
        <Route path="groups/:groupId/settings" element={<MapPage />} />
        <Route path="groups/:groupId/profile" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
