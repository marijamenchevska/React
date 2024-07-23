import { useContext } from "react";
import { Trip } from "../common/types/trip.interface";
import { CountryContext } from "../context/country.context";
import SavedTripsCard from "./SavedTripsCard";

export default function SavedTrips() {
  const { savedTrips } = useContext(CountryContext);

  return !savedTrips.length ? (
    <div className="text-slate-50 text-center text-base py-7">
      You have no saved trips.
    </div>
  ) : (
    <div className="flex flex-wrap p-5">
      {savedTrips.map((trip: Trip, index) => (
        <SavedTripsCard key={`trip-${index}`} trip={trip} />
      ))}
    </div>
  );
}
