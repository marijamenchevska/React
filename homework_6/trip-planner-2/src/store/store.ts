import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../reducers/country.reducer";
import tripReducer from "../reducers/trip.reducer";

const store = configureStore({
  reducer: {
    countries: countryReducer,
    trips: tripReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
