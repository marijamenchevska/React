import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountainSun, faWater } from "@fortawesome/free-solid-svg-icons";
import AddToTripPlanBtn from "./AddToTripPlanBtn";
import { CountryCardProps } from "../common/types/props.type";

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="w-48 flex flex-col justify-center md:w-96 md:flex-row md:justify-between mx-auto rounded-xl text-center shadow-xl overflow-hidden bg-slate-200 m-7">
      <div className="flex h-48">
        <img
          className="w-full shrink-1 object-scale-down md:h-full md:w-48"
          src={country.flags.svg}
          alt={country.name.common}
        />
      </div>
      <div className="flex flex-col justify-between items-center p-5 pt-1 space-y-2 md:w-48 md:pt-5 md:pl-3">
        <div>
          <div
            className={
              country.landlocked ? "text-emerald-600" : "text-blue-500"
            }
          >
            <div className="uppercase tracking-wide text-sm text-wrap font-bold">
              {country.name.common}
            </div>
            <FontAwesomeIcon
              icon={country.landlocked ? faMountainSun : faWater}
            />
          </div>

          <ul className="mt-1 text-slate-600 text-xs">
            <li>Capital: {country.capital[0]}</li>
            <li>
              Area: {country.area.toLocaleString()} km<sup>2</sup>
            </li>
            <li>Population: {country.population.toLocaleString()}</li>
          </ul>
        </div>

        <AddToTripPlanBtn country={country} />
      </div>
    </div>
  );
}
