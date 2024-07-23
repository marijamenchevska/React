import {
  faHouse,
  faLocationPinLock,
  faMap,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { Continent } from "../common/types/continent.enum";
import { continentSVGs } from "../common/consts/continentSVGs.const";
import { useContext } from "react";
import { CountryContext } from "../context/country.context";

const continents = Object.values(Continent);

export default function Header() {
  const { activateMenu } = useContext(CountryContext);

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
            className={({ isActive, isPending }) =>
              activateMenu({ isActive, isPending })
            }
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
              className={({ isActive, isPending }) =>
                activateMenu({ isActive, isPending })
              }
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
            className={({ isActive, isPending }) =>
              activateMenu({ isActive, isPending })
            }
          >
            <li key="trip-plan" className="w-8 text-center" title="Trip Plan">
              <FontAwesomeIcon icon={faRoute} />
            </li>
          </NavLink>

          <NavLink
            to="/saved-trips"
            className={({ isActive, isPending }) =>
              activateMenu({ isActive, isPending })
            }
          >
            <li key="trip-plan" className="w-8 text-center" title="Saved Trips">
              <FontAwesomeIcon icon={faLocationPinLock} />
            </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}
