import { Route, Routes } from "react-router-dom";
import ContinentPage from "./components/ContinentPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainComponent from "./components/MainComponent";
import NotFound from "./components/NotFound";
import SavedTrips from "./components/SavedTrips";
import TripInfo from "./components/TripInfo";
import TripPlan from "./components/TripPlan";
import TripSavedPage from "./components/TripSavedPage";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow shadow-md">
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="continent/:continentName" element={<ContinentPage />} />
          <Route path="/trip-plan" element={<TripPlan />} />
          <Route path="/trip-info" element={<TripInfo />} />
          <Route path="/trip-saved" element={<TripSavedPage />} />
          <Route path="/saved-trips" element={<SavedTrips />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
