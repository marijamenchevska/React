import { useParams } from "react-router-dom";
import CountryCard from "./CountryCard";
import { useContext, useEffect } from "react";
import Loader from "./Loader";
import { Country } from "../common/types/country.interface";
import { CountryContext } from "../context/country.context";

export default function ContinentPage() {
  const { continentName: continent } = useParams();
  const { isLoading, getContinentCountries, continentCountries } =
    useContext(CountryContext);

  useEffect(() => getContinentCountries(continent as string), [continent]);

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
