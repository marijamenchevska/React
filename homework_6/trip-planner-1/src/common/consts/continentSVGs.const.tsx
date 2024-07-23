import {
  faEarthAfrica,
  faEarthAmericas,
  faEarthAsia,
  faEarthEurope,
  faEarthOceania,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const continentSVGs: Record<string, JSX.Element> = {
  Africa: <FontAwesomeIcon icon={faEarthAfrica} />,
  Americas: <FontAwesomeIcon icon={faEarthAmericas} />,
  Asia: <FontAwesomeIcon icon={faEarthAsia} />,
  Europe: <FontAwesomeIcon icon={faEarthEurope} />,
  Oceania: <FontAwesomeIcon icon={faEarthOceania} />,
};
