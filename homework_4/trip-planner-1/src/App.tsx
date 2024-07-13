import Header from "./components/Header";
import MainComponent from "./components/MainComponent";
import ContinentPage from "./components/ContinentPage";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow shadow-md">
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="continent/:continentName" element={<ContinentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
