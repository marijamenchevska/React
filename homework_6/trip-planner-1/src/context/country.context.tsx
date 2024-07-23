import { ReactNode, createContext, useEffect, useState } from "react";
import { Country } from "../common/types/country.interface";
import axios from "axios";
import { Continent } from "../common/types/continent.enum";
import { popularCountriesNames } from "../common/consts/popularCountries.const";
import { useNavigate } from "react-router-dom";
import { TripPlanInputData } from "../common/types/forms.type";
import { TripInfoForm } from "../common/types/forms.type";
import { NavLinkActiveInfo } from "../common/types/other.types";
import { Trip } from "../common/types/trip.interface";

type CountryContextProviderType = {
  children: ReactNode | ReactNode[];
};

type CountryContextType = {
  activateMenu: ({ isActive, isPending }: NavLinkActiveInfo) => string;
  isLoading: boolean;
  popularCountries: Country[];
  getSearchCountries: (searchWord: string) => void;
  foundCountries: Country[];
  getContinentCountries: (continent: string) => void;
  continentCountries: Country[];
  tripCountries: Country[];
  setTripCountires: (country: Country[]) => void;
  removeCountryFromTripPlan: (tripCountry: Country) => void;
  onTripContinue: (data: TripPlanInputData) => void;
  onTripSave: (data: TripInfoForm) => void;
  savedTrips: Trip[];
};

const defaultValues: CountryContextType = {
  activateMenu: () => "",
  isLoading: false,
  popularCountries: [],
  getSearchCountries: () => {},
  foundCountries: [],
  getContinentCountries: () => {},
  continentCountries: [],
  tripCountries: [],
  setTripCountires: () => {},
  removeCountryFromTripPlan: () => {},
  onTripContinue: () => {},
  onTripSave: () => {},
  savedTrips: [],
};

export const CountryContext = createContext<CountryContextType>(defaultValues);

export default function CountryProvider({
  children,
}: CountryContextProviderType) {
  // State declarations

  const [independentCountries, setIndependentCountries] = useState<Country[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [popularCountries, setPopularCountries] = useState<Country[]>([]);
  const [foundCountries, setFoundCountries] = useState<Country[]>([]);
  const [continentCountries, setContinentCountries] = useState([]);
  // Local storage is needed so that the information about the saved countries in the trip plan is not lost on every app reload
  const [tripCountries, setTripCountires] = useState(
    JSON.parse(localStorage.getItem("tripCountries") as string) ?? []
  );
  const [savedTrips, setSavedTrips] = useState(
    JSON.parse(localStorage.getItem("savedTrips") as string) ?? []
  );
  const navigate = useNavigate();

  // useEffects

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v3.1/independent?status=true&fields=name,capital,area,flags,population,landlocked`
      )
      .then((response) => setIndependentCountries(response.data))
      .catch((error) => console.log(error));
  }, []);

  // useEffect must be used here because the popular countries should be set AFTER independentCountries are updated (they're not updated immediately)
  useEffect(() => {
    setIsLoading(true);

    setPopularCountries(
      independentCountries.filter(
        (country) =>
          popularCountriesNames.includes(country.name.common) === true
      )
    );
    setTimeout(() => setIsLoading(false), 500);
  }, [independentCountries]);

  useEffect(
    () => localStorage.setItem("tripCountries", JSON.stringify(tripCountries)),
    [tripCountries]
  );

  useEffect(() => {
    localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
    localStorage.removeItem("tripCountries");
    setTripCountires([]);
  }, [savedTrips]);

  // Arrow functions

  const activateMenu = ({ isActive, isPending }: NavLinkActiveInfo) => {
    if (isActive) return "font-bold border-b-2 border-slate-50";
    if (isPending) return "text-slate-500";
    return "text-slate-50";
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

  const removeCountryFromTripPlan = (tripCountry: Country) =>
    setTripCountires(
      tripCountries.filter(
        (country: Country) => country.name.common !== tripCountry.name.common
      )
    );

  const onTripContinue = (data: TripPlanInputData) => {
    const updatedTripCountries = tripCountries.map((country: Country) => ({
      ...country,
      tripDays: data[country.name.common],
    }));

    setTripCountires(updatedTripCountries);

    navigate("/trip-info");
  };

  const onTripSave = (data: TripInfoForm) => {
    const tripCountriesNames = tripCountries.map((country: Country) => ({
      country: country.name.common,
      flag: country.flags.svg,
      visitingDays: country.tripDays,
    }));

    const newTrip: Trip = {
      tripCountries: [...tripCountriesNames],
      passenger: data.name,
      budget: data.budget,
      comments: data.comments || "/",
    };

    setSavedTrips([...savedTrips, newTrip]);

    navigate("/trip-saved");
  };

  return (
    <CountryContext.Provider
      value={{
        activateMenu,
        isLoading,
        popularCountries,
        getSearchCountries,
        foundCountries,
        getContinentCountries,
        continentCountries,
        tripCountries,
        setTripCountires,
        removeCountryFromTripPlan,
        onTripContinue,
        onTripSave,
        savedTrips,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}
