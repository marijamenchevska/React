import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popularCountriesNames } from "../common/consts/popularCountries.const";
import { Country } from "../common/types/country.interface";
import { setIsLoading, setPopularCountries } from "../reducers/country.reducer";
import { RootState } from "../store/store";
import CountryCard from "./CountryCard";
import Loader from "./Loader";

export default function PopularCountries() {
  const isLoading = useSelector(
    (state: RootState) => state.countries.isLoading
  );
  const popularCountries = useSelector(
    (state: RootState) => state.countries.popularCountries
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));

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

        dispatch(setPopularCountries(foundCountries));
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setIsLoading(false)));
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
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
