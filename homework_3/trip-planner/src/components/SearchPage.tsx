import { Country } from "../common/types/country.interface";
import CountryCard from "./CountryCard";

type SearchPageProps = {
    foundCountries: Country[];
}

export default function SearchPage({foundCountries}: SearchPageProps) {
    return (
        <>
            <ul>
                {
                    foundCountries.map(country => 
                        <CountryCard key={country.name.common}
                                country={country}
                        />
                    )
                }
            </ul>
        </>
    );
}