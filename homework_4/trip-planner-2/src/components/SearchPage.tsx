import { useContext, useEffect } from "react";
import CountryCard from "./CountryCard";
import Loader from "./Loader";
import { CountryContext } from "../context/country.context";

type SearchPageProps = {
  searchWord: string;
};

export default function SearchPage({ searchWord }: SearchPageProps) {
  const { isLoading, getSearchCountries, foundCountries } =
    useContext(CountryContext);

  useEffect(() => getSearchCountries(searchWord), [searchWord]);

  if (isLoading) return <Loader />;

  return foundCountries.length > 0 ? (
    <div>
      <ul>
        {foundCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </ul>
    </div>
  ) : (
    <div className="text-slate-50 text-center text-xl py-7">
      There are no countries starting with '{searchWord}'.
    </div>
  );
}
