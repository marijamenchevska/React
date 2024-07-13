import { useEffect, useState } from "react";
import { Country } from "../common/types/country.interface";
import CountryCard from "./CountryCard";
import Loader from "./Loader";
import axios from "axios";
import debounce from "debounce";

type SearchPageProps = {
  searchWord: string;
};

export default function SearchPage({ searchWord }: SearchPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [foundCountries, setFoundCountries] = useState<Country[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchResults = debounce(async () => {
      axios
        .get(
          `https://restcountries.com/v3.1/independent?status=true&fields=name,capital,area,flags,population,landlocked`
        )
        .then((response) =>
          setFoundCountries(
            response.data.filter(
              (country: Country) =>
                country.name.common
                  .toLowerCase()
                  .startsWith(searchWord.toLowerCase()) === true
            )
          )
        )
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }, 600);

    fetchResults();

    return () => fetchResults.clear();
  }, [searchWord]);

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
