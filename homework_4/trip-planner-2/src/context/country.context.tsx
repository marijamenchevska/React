import { ReactNode, createContext, useEffect, useState } from "react";
import { Country } from "../common/types/country.interface";
import axios from "axios";
import { Continent } from "../common/types/continent.enum";
import { useNavigate } from "react-router-dom";

type CountryContextProviderType = {
  children: ReactNode | ReactNode[];
};

type CountryContextType = {
  isLoading: boolean;
  getPopularCountries: () => void;
  popularCountries: Country[];
  getSearchCountries: (searchWord: string) => void;
  foundCountries: Country[];
  getContinentCountries: (continent: string) => void;
  continentCountries: Country[];
};

const defaultValues: CountryContextType = {
  isLoading: false,
  getPopularCountries: () => {},
  popularCountries: [],
  getSearchCountries: () => {},
  foundCountries: [],
  getContinentCountries: () => {},
  continentCountries: [],
};

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

export const CountryContext = createContext<CountryContextType>(defaultValues);

export default function CountryProvider({
  children,
}: CountryContextProviderType) {
  const [independentCountries, setIndependentCountries] = useState<Country[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [popularCountries, setPopularCountries] = useState<Country[]>([]);
  const [foundCountries, setFoundCountries] = useState<Country[]>([]);
  const [continentCountries, setContinentCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/independent?status=true&fields=name,capital,area,flags,population,landlocked`
      )
      .then((response) => setIndependentCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  const getPopularCountries = () => {
    setIsLoading(true);

    setPopularCountries(
      independentCountries.filter(
        (country) =>
          popularCountriesNames.includes(country.name.common) === true
      )
    );

    // Artificially make a delay to see the loader
    setTimeout(() => setIsLoading(false), 500);
  };

  const getSearchCountries = (searchWord: string) => {
    setIsLoading(true);

    setFoundCountries(
      independentCountries.filter(
        (country: Country) =>
          country.name.common
            .toLowerCase()
            .startsWith(searchWord.toLowerCase()) === true
      )
    );

    // Artificially make a delay to see the loader
    setTimeout(() => setIsLoading(false), 500);
  };

  const getContinentCountries = (continent: string) => {
    const validContinent = Object.values(Continent).includes(
      continent as Continent
    );

    if (!validContinent) {
      navigate("*");
      return;
    }

    setIsLoading(true);

    axios
      .get(
        `https://restcountries.com/v3.1/region/${continent.toLowerCase()}?fields=name,capital,area,flags,population,landlocked,independent`
      )
      .then((response) => {
        const filteredCountries = response.data.filter(
          (country: Country) => country.independent === true
        );
        setContinentCountries(filteredCountries);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  return (
    <CountryContext.Provider
      value={{
        isLoading,
        getPopularCountries,
        popularCountries,
        getSearchCountries,
        foundCountries,
        getContinentCountries,
        continentCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}
