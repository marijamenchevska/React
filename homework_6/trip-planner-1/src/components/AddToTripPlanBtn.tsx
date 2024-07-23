import { useContext, useEffect, useState } from "react";
import { Country } from "../common/types/country.interface";
import { CountryCardProps } from "../common/types/props.type";
import { disabledBtn, enabledBtn } from "../common/consts/tripBtnUsability";
import { CountryContext } from "../context/country.context";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddToTripPlanBtn({ country }: CountryCardProps) {
  // This logic can't be in the context, otherwise changes to one button will affect all buttons

  const { tripCountries, setTripCountires } = useContext(CountryContext);

  const [btnUsability, setBtnUsability] = useState(enabledBtn);

  const addToTripPlan = (country: Country) => {
    setTripCountires([...tripCountries, country]);

    setBtnUsability(disabledBtn);
  };

  useEffect(() => {
    if (
      tripCountries.length &&
      tripCountries.some(
        (savedCountry) => savedCountry.name.common === country.name.common
      )
    )
      setBtnUsability(disabledBtn);
  }, []);

  return (
    <button
      className={`text-xs py-2 ${btnUsability.btnColor} border border-slate-600 rounded-full w-32 hover:bg-slate-200 hover:text-slate-600 focus:outline-none`}
      disabled={btnUsability.btnDisabled}
      onClick={() => addToTripPlan(country)}
    >
      <div className="flex justify-center items-center space-x-2">
        {btnUsability.btnDisabled ? (
          <>
            <span>Added!</span>
            <FontAwesomeIcon icon={faCheck} />
          </>
        ) : (
          <span>Add to trip plan</span>
        )}
      </div>
    </button>
  );
}
