import { useNavigate, useParams } from "react-router-dom";
import CountryCard from "./CountryCard";
import { useEffect, useState } from "react";
import { Continent } from "../common/types/continent.enum";
import axios from "axios";
import Loader from "./Loader";
import { Country } from "../common/types/country.interface";

export default function ContinentPage() {
  const [continentCountries, setContinentCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { continentName: continent } = useParams();
  const navigate = useNavigate();

  const validContinent = Object.values(Continent).includes(
    continent as Continent
  );

  useEffect(() => {
    if (!validContinent) {
      navigate("*");
      return;
    }

    setIsLoading(true);

    axios
      .get(
        `https://restcountries.com/v3.1/region/${continent?.toLowerCase()}?fields=name,capital,area,flags,population,landlocked,independent`
      )
      .then((response) => {
        const independentCountries = response.data.filter(
          (country: { independent: boolean }) => country.independent === true
        );
        setContinentCountries(independentCountries);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [continent, validContinent, navigate]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex flex-wrap p-5">
        {continentCountries.map((country: Country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </>
  );
}
