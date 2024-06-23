import { useState } from "react";
import { Continent } from "./common/types/continent.enum";
import countries from "./data/countries.json";
import Header from "./components/Header";
import MainComponent from "./components/MainComponent";
import ContinentPage from "./components/ContinentPage";
import Footer from "./components/Footer";
import { Country } from "./common/types/country.interface";

export default function App() {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);

  return (
    <>
      <Header selectedContinent={setSelectedContinent} />

      {/* All countries need to be sent because of the search bar  */}
      {!selectedContinent && <MainComponent countries={countries as Country[]} />}

      {/* Not all countries need to be sent to every continent page */}
      {selectedContinent && <ContinentPage continentCountries={countries.filter(country => country.region === selectedContinent)} />}

      <Footer />
    </>
  );
}

