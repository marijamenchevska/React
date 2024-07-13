import { useContext, useEffect } from "react";
import { Country } from "../common/types/country.interface";
import CountryCard from "./CountryCard";
import Loader from "./Loader";
import { CountryContext } from "../context/country.context";

export default function PopularCountries() {
  const { isLoading, getPopularCountries, popularCountries } =
    useContext(CountryContext);

  useEffect(() => getPopularCountries(), []);

  if (isLoading) return <Loader />;

  return (
    <div className="pt-5">
      <h2 className="text-center text-slate-50 text-xl py-5">
        10 Most Popular Tourist Destinations
      </h2>

      <ul className="grid grid-cols-2 max-w-screen-lg mx-auto max-sm:grid-cols-1">
        {popularCountries.map((country: Country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </ul>
    </div>
  );
}
