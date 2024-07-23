import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Continent } from "../common/types/continent.enum";
import { Country } from "../common/types/country.interface";
import {
  setContinentCountries,
  setIsLoading,
} from "../reducers/country.reducer";
import { RootState } from "../store/store";
import CountryCard from "./CountryCard";
import Loader from "./Loader";

export default function ContinentPage() {
  const isLoading = useSelector(
    (state: RootState) => state.countries.isLoading
  );
  const continentCountries = useSelector(
    (state: RootState) => state.countries.continentCountries
  );
  const { continentName: continent } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validContinent = Object.values(Continent).includes(
    continent as Continent
  );

  useEffect(() => {
    if (!validContinent) {
      navigate("*");
      return;
    }

    dispatch(setIsLoading(true));

    axios
      .get(
        `https://restcountries.com/v3.1/region/${continent?.toLowerCase()}?fields=name,capital,area,flags,population,landlocked,independent`
      )
      .then((response) => {
        dispatch(
          setContinentCountries(
            response.data.filter(
              (country: Country) => country.independent === true
            )
          )
        );
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setIsLoading(false)));
  }, [continent]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-wrap p-5">
      {continentCountries.map((country: Country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}
