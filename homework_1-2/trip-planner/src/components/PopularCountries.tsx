import { Country } from "../common/types/country.interface"
import CountryCard from "./CountryCard"

type PopularCountriesProps = {
    popularCountries: Country[]
}

export default function PopularCountries({popularCountries}: PopularCountriesProps) {
    return (
        <div className="pt-5">
            <h2 className="text-center text-slate-50 text-xl py-5">10 Most Popular Tourist Destinations</h2>
            <ul className="flex flex-col">
                {
                    popularCountries.map(country => 
                        <CountryCard key={country.name.common}
                            country={country}
                        />
                    )
                }
            </ul>
        </div>
    );
}