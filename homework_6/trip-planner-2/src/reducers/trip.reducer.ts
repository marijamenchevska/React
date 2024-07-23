import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Country } from "../common/types/country.interface";
import { TripInfoForm, TripPlanInputData } from "../common/types/forms.type";
import { Trip } from "../common/types/trip.interface";

type TripState = {
  tripCountries: Country[];
  savedTrips: Trip[];
};

const initialState: TripState = {
  tripCountries:
    JSON.parse(localStorage.getItem("tripCountries") as string) ?? [],
  savedTrips: JSON.parse(localStorage.getItem("savedTrips") as string) ?? [],
};

const tripReducer = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTripCountries(state: TripState, action: PayloadAction<Country>) {
      state.tripCountries.push(action.payload);
      localStorage.setItem(
        "tripCountries",
        JSON.stringify(state.tripCountries)
      );
    },
    saveInputDays(state: TripState, action: PayloadAction<TripPlanInputData>) {
      state.tripCountries = state.tripCountries.map((country) => ({
        ...country,
        tripDays: action.payload[country.name.common],
      }));

      localStorage.setItem(
        "tripCountries",
        JSON.stringify(state.tripCountries)
      );
    },
    removeCountryFromTripPlan(
      state: TripState,
      action: PayloadAction<Country>
    ) {
      state.tripCountries = state.tripCountries.filter(
        (country) => country.name.common !== action.payload.name.common
      );

      localStorage.setItem(
        "tripCountries",
        JSON.stringify(state.tripCountries)
      );
    },
    saveTrip(state: TripState, action: PayloadAction<TripInfoForm>) {
      const tripCountriesNames = state.tripCountries.map((country) => ({
        country: country.name.common,
        flag: country.flags.svg,
        visitingDays: country.tripDays,
      }));

      const newTrip: Trip = {
        tripCountries: [...tripCountriesNames],
        passenger: action.payload.name,
        budget: action.payload.budget,
        comments: action.payload.comments || "/",
      };

      state.savedTrips.push(newTrip);

      localStorage.setItem("savedTrips", JSON.stringify(state.savedTrips));
      localStorage.removeItem("tripCountries");
      state.tripCountries = [];
    },
  },
});

export const {
  setTripCountries,
  saveInputDays,
  removeCountryFromTripPlan,
  saveTrip,
} = tripReducer.actions;
export default tripReducer.reducer;
