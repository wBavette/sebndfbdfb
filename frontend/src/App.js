import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CGU from "./pages/CGU";
import Confidentialite from "./pages/Confidentialite";
import DMCA from "./pages/DMCA";
import MentionsLegales from "./pages/MentionsLegales";
import Notification from "./pages/Notification";
import IPTV from "./pages/IPTV";
import VideoPlayer from "./pages/VideoPlayer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/iptv" element={<IPTV />} />
          <Route path="/player/:streamId" element={<VideoPlayer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
