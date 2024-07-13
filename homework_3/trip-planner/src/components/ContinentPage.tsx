import { useNavigate, useParams } from "react-router-dom"
import { Country } from "../common/types/country.interface"
import CountryCard from "./CountryCard"
import { useEffect } from "react"

type ContinentPageProps = {
    countries: Country[]
}

export default function ContinentPage ({countries}: ContinentPageProps) {
    const {continentName: continent} = useParams();

    const continentCountries = countries.filter(country => country.region === continent);

    const navigate = useNavigate();

    useEffect(() => {
        if(!continentCountries.length) navigate("*");
    }, [continentCountries]);

    return (
        <>
            <div className="flex flex-wrap p-5">
                {
                    continentCountries.map(country => 
                        <CountryCard key={country.name.common}
                            country={country}
                        />
                    )
                }
            </div>
        </>
    );
}