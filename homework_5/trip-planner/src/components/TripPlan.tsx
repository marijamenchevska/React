import { useContext } from "react";
import { CountryContext } from "../context/country.context";
import TripPlanCard from "./TripPlanCard";
import { Country } from "../common/types/country.interface";

export default function TripPlan() {
  const { tripCountries } = useContext(CountryContext);

  return (
    <div className="w-11/12 md:w-1/2 mx-auto m-5 flex flex-col text-slate-50">
      {tripCountries.map((country: Country) => (
        <TripPlanCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}
