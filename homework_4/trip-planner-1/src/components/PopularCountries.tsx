import { useEffect, useState } from "react";
import { Country } from "../common/types/country.interface";
import CountryCard from "./CountryCard";
import Loader from "./Loader";
import axios from "axios";

const popularCountriesNames = [
  "France",
  "United States",
  "Italy",
  "Spain",
  "China",
  "Thailand",
  "Australia",
  "Egypt",
  "Japan",
  "Mexico",
];

export default function PopularCountries() {
  const [isLoading, setIsLoading] = useState(false);
  const [popularCountries, setPopularCountries] = useState<Country[]>([]);

  useEffect(() => {
    setIsLoading(true);

    Promise.all(
      popularCountriesNames.map((country) =>
        axios.get(
          `https://restcountries.com/v3.1/name/${country.toLowerCase()}?fields=name,capital,area,flags,population,landlocked,independent`
        )
      )
    )
      .then((response) => {
        const responseArray = response.map((country) => country.data);

        let foundCountries: Country[] = [];

        responseArray.forEach((responseCountry) => {
          const popularCountry = responseCountry.find(
            (country: Country) => country.independent === true
          );
          foundCountries.push(popularCountry);
        });

        setPopularCountries(foundCountries);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="pt-5">
      <h2 className="text-center text-slate-50 text-xl py-5">
        10 Most Popular Tourist Destinations
      </h2>

      <ul className="grid grid-cols-2 max-w-screen-lg mx-auto max-sm:grid-cols-1">
        {popularCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </ul>
    </div>
  );
}
