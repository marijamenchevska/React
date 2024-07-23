import { useDispatch, useSelector } from "react-redux";
import { SearchPageProps } from "../common/types/props.type";
import { RootState } from "../store/store";
import CountryCard from "./CountryCard";
import Loader from "./Loader";
import { useEffect } from "react";
import { setFoundCountries, setIsLoading } from "../reducers/country.reducer";
import axios from "axios";
import { Country } from "../common/types/country.interface";
import debounce from "debounce";

export default function SearchPage({ searchWord }: SearchPageProps) {
  const isLoading = useSelector(
    (state: RootState) => state.countries.isLoading
  );
  const foundCountries = useSelector(
    (state: RootState) => state.countries.foundCountries
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));

    const fetchResults = debounce(
      async () =>
        axios
          .get(
            `https://restcountries.com/v3.1/name/${searchWord}?fields=name,capital,area,flags,population,landlocked,independent`
          )
          .then((response) =>
            dispatch(
              setFoundCountries(
                response.data.filter(
                  (country: Country) =>
                    country.independent &&
                    country.name.common
                      .toLowerCase()
                      .startsWith(searchWord.toLowerCase())
                )
              )
            )
          )
          .catch((error) => console.log(error))
          .finally(() => setTimeout(() => dispatch(setIsLoading(false)))),
      600
    );

    fetchResults();

    return () => fetchResults.clear();
  }, [dispatch, searchWord]);

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
