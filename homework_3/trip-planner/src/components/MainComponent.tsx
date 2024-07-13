import { useEffect, useState } from "react";
import { Country } from "../common/types/country.interface";
import SearchPage from "./SearchPage";
import PopularCountries from "./PopularCountries";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const popularCountries = [
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

type MainComponentProps = {
  countries: Country[];
};

export default function MainComponent({ countries }: MainComponentProps) {
  const popularCountriesObjects = countries.filter((country) =>
    popularCountries.includes(country.name.common)
  );

  const [searchWord, setSearchWord] = useState<string>("");
  const [foundCountries, setFoundCountries] = useState<Country[]>([]);

  useEffect(
    () =>
      setFoundCountries(
        countries.filter(
          (country) =>
            country.name.common
              .toLowerCase()
              .startsWith(searchWord.toLowerCase()) === true
        )
      ),
    [searchWord]
  );

  return (
    <div className="py-5">
      <div className="space-x-2 text-center text-slate-50">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="align-middle" />
        <input
          type="text"
          placeholder="Search country"
          className="focus:outline-none bg-transparent placeholder:text-slate-300 text-sm px-2 py-1.5 border-b"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>

      {searchWord && <SearchPage foundCountries={foundCountries} />}

      {!searchWord && (
        <PopularCountries popularCountries={popularCountriesObjects} />
      )}
    </div>
  );
}
