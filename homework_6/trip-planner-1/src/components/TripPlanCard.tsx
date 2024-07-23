import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { TripPlanCardProps } from "../common/types/props.type";
import { CountryContext } from "../context/country.context";

export default function TripPlanCard({
  country,
  register,
  errors,
}: TripPlanCardProps) {
  // This logic can't be in the context, otherwise changes to one input will affect all inputs

  const { removeCountryFromTripPlan } = useContext(CountryContext);

  const [inputDays, setInputDays] = useState(country.tripDays || "");

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
            {...register(country.name.common, {
              required: "Enter days",
              min: {
                value: 1,
                message: "Minimum: 1",
              },
              max: {
                value: 30,
                message: "Maximum: 30",
              },
            })}
            type="number"
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
        {errors[country.name.common]?.message as string}
      </span>
    </div>
  );
}
