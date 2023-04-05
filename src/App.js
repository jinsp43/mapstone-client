import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import GroupsList from "./components/GroupsList/GroupsList";
import Header from "./components/Header/Header";
import MembersList from "./components/MembersList/MembersList";
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
        <Route path="map/:groupId" element={<MapPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="groups" element={<GroupsList />} />
        <Route path="groups/:groupId" element={<MembersList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
