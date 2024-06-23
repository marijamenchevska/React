import { Country } from "../common/types/country.interface"
import CountryCard from "./CountryCard"

type ContinentPageProps = {
    continentCountries: Country[]
}

export default function ContinentPage ({continentCountries}: ContinentPageProps) {
    return (
        <>
            <div className="flex flex-wrap p-5 shadow-md">
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