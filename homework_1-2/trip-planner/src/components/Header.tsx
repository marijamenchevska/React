import { faEarthAfrica, faEarthAmericas, faEarthAsia, faEarthEurope, faEarthOceania, faHouse, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Continent } from "../common/types/continent.enum"

const continentSVGs = [
    <FontAwesomeIcon icon={faEarthAfrica} />,
    <FontAwesomeIcon icon={faEarthAmericas} />,
    <FontAwesomeIcon icon={faEarthAsia} />,
    <FontAwesomeIcon icon={faEarthEurope} />,
    <FontAwesomeIcon icon={faEarthOceania} />
];

const continents = Object.values(Continent);

type HeaderProps = {
    selectedContinent: (continent: Continent | null) => void;
}

export default function Header({selectedContinent}: HeaderProps) {
    return (
        <header className="text-slate-50 shadow-md">
            <div className="flex justify-center items-center space-x-3 text-2xl text-center py-3">
                <FontAwesomeIcon icon={faMap} />
                <h1>Trip Planner</h1>
            </div>

            <nav>
                <ul className="flex flex-wrap justify-around py-2">
                    <li 
                        key="home" 
                        className="w-28 flex justify-center items-center space-x-2 hover:text-slate-950 cursor-pointer" 
                        onClick={() => selectedContinent(null)}
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Home</span>
                    </li>
                    {
                        continents.map((continent, index) => 
                            <li 
                                className="w-28 flex justify-center space-x-2 text-slate-50 hover:text-slate-950 cursor-pointer" 
                                key={continent} 
                                onClick={() => selectedContinent(continent)}
                            >
                                <span>{continentSVGs[index]}</span> 
                                <span>{continent}</span>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
}