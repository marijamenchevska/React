import {
  faEarthAfrica,
  faEarthAmericas,
  faEarthAsia,
  faEarthEurope,
  faEarthOceania,
  faHouse,
  faMap,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Continent } from "../common/types/continent.enum";
import { Link, NavLink } from "react-router-dom";

const continentSVGs: Record<string, JSX.Element> = {
  Africa: <FontAwesomeIcon icon={faEarthAfrica} />,
  Americas: <FontAwesomeIcon icon={faEarthAmericas} />,
  Asia: <FontAwesomeIcon icon={faEarthAsia} />,
  Europe: <FontAwesomeIcon icon={faEarthEurope} />,
  Oceania: <FontAwesomeIcon icon={faEarthOceania} />,
};

const continents = Object.values(Continent);

export default function Header() {
  return (
    <header className="text-slate-50 shadow-md">
      <div className="flex justify-center items-center space-x-3 text-2xl text-center py-3">
        <FontAwesomeIcon icon={faMap} />
        <h1 className="cursor-pointer">
          <Link to="/">Trip Planner</Link>
        </h1>
      </div>

      <nav>
        <ul className="flex flex-wrap justify-around pt-2">
          <NavLink
            to="/"
            className={({ isActive, isPending }) => {
              if (isActive) return "font-bold border-b-2 border-slate-50";
              if (isPending) return "text-slate-500";
              return "text-slate-50";
            }}
          >
            <li
              key="home"
              className="w-28 flex justify-center items-center space-x-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Home</span>
            </li>
          </NavLink>
          {continents.map((continent) => (
            <NavLink
              to={`/continent/${continent}`}
              className={({ isActive, isPending }) => {
                if (isActive) return "font-bold border-b-2 border-slate-50";
                if (isPending) return "text-slate-500";
                return "text-slate-50";
              }}
              key={`${continent}nav`}
            >
              <li
                className="w-28 flex justify-center space-x-2 pb-2 cursor-pointer"
                key={continent}
              >
                <span>{continentSVGs[continent]}</span>
                <span>{continent}</span>
              </li>
            </NavLink>
          ))}

          <NavLink
            to="/trip-plan"
            className={({ isActive, isPending }) => {
              if (isActive) return "font-bold border-b-2 border-slate-50";
              if (isPending) return "text-slate-500";
              return "text-slate-50";
            }}
          >
            <li key="trip-plan" className="w-8 text-center">
              <FontAwesomeIcon icon={faRoute} />
            </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
