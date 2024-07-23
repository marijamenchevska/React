import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Country } from "../common/types/country.interface";

type CountryState = {
  isLoading: boolean;
  popularCountries: Country[];
  foundCountries: Country[];
  continentCountries: Country[];
};

const initialState: CountryState = {
  isLoading: false,
  popularCountries: [],
  foundCountries: [],
  continentCountries: [],
};

const countryReducer = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setIsLoading(state: CountryState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPopularCountries(state: CountryState, action: PayloadAction<Country[]>) {
      state.popularCountries = action.payload;
    },
    setFoundCountries(state: CountryState, action: PayloadAction<Country[]>) {
      state.foundCountries = action.payload;
    },
    setContinentCountries(
      state: CountryState,
      action: PayloadAction<Country[]>
    ) {
      state.continentCountries = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setPopularCountries,
  setFoundCountries,
  setContinentCountries,
} = countryReducer.actions;
export default countryReducer.reducer;
