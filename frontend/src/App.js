import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GeneratePage from "./pages/GeneratePage";
import TemplatesPage from "./pages/TemplatesPage";
import GalleryPage from "./pages/GalleryPage";
import Navigation from "./components/Navigation";
import { Toaster } from "./components/ui/sonner";
import "./App.css";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster data-testid="global-toaster" />
    </div>
  );
}

export default App;