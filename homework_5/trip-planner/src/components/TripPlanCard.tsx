import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import { Country } from "../common/types/country.interface";
import { CountryContext } from "../context/country.context";

type TripPlanCardProps = {
  country: Country;
};

export default function TripPlanCard({ country }: TripPlanCardProps) {
  // This logic can't be in the context, otherwise changes to one input will affect all inputs

  const { handleInputDays, removeCountryFromTripPlan } =
    useContext(CountryContext);

  const [inputDays, setInputDays] = useState(country.tripDays || "");
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (!inputDays) setInputMessage("Enter days");
    else if (Number(inputDays) < 1) setInputMessage("Minimum: 1");
    else if (Number(inputDays) > 30) setInputMessage("Maximum: 30");
    else if (isNaN(Number(inputDays))) setInputMessage("Enter a number");
    else {
      setInputMessage("");
      handleInputDays(country, Number(inputDays));
    }
  }, [inputDays]);

  return (
    <div
      key={country.name.common}
      className="w-full h-16 p-3 mb-2 flex justify-between items-center shadow-md relative"
    >
      <div className="w-3/4 h-full flex items-center">
        <img
          className="max-h-full max-w-full w-20 mr-1 shrink-1 object-scale-down"
          src={country.flags.svg}
          alt={country.name.common}
        />
        <span>{country.name.common}</span>
      </div>

      <div className="grow h-full flex justify-around items-center text-sm">
        <div>
          <input
            type="text"
            className="w-5 text-center focus:outline-none bg-transparent border-b mr-1"
            value={inputDays}
            onChange={(e) => setInputDays(e.target.value)}
          />
          <span>days</span>
        </div>

        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer"
          onClick={() => removeCountryFromTripPlan(country)}
        />
      </div>

      <span className="w-20 absolute bottom-0 right-12.5% text-xxs text-orange-400 text-center">
        {inputMessage}
      </span>
    </div>
  );
}
