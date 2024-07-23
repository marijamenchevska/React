import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { Country } from "./country.interface";
import { Trip } from "./trip.interface";

export type SearchPageProps = {
  searchWord: string;
};

export type CountryCardProps = {
  country: Country;
};

export type TripPlanCardProps = {
  country: Country;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export type SavedTripsCardProps = {
  trip: Trip;
};
