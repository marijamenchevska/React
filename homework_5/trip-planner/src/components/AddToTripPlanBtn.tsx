import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect, ReactNode } from "react";
import { Country } from "../common/types/country.interface";
import { CountryContext } from "../context/country.context";

type CountryBtnProps = {
  country: Country;
};

export default function AddToTripPlanBtn({ country }: CountryBtnProps) {
  // This logic can't be in the context, otherwise changes to one button will affect all buttons

  const [btnColor, setBtnColor] = useState("bg-slate-600 text-slate-200");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnTxt, setBtnTxt] = useState<ReactNode>(
    <span>Add to trip plan</span>
  );
  const { tripCountries, setTripCountires } = useContext(CountryContext);

  const disableBtn = () => {
    setBtnDisabled(true);

    setBtnTxt(
      <>
        <span>Added!</span>
        <FontAwesomeIcon icon={faCheck} />
      </>
    );

    setBtnColor("bg-slate-200 text-slate-600");
  };

  const addToTripPlan = (country: Country) => {
    setTripCountires([...tripCountries, country]);

    disableBtn();
  };

  useEffect(() => {
    if (
      tripCountries.length &&
      tripCountries.some(
        (savedCountry) => savedCountry.name.common === country.name.common
      )
    )
      disableBtn();
  }, []);

  return (
    <button
      className={`text-xs py-2 ${btnColor} border border-slate-600 rounded-full w-32 hover:bg-slate-200 hover:text-slate-600 focus:outline-none`}
      disabled={btnDisabled}
      onClick={() => addToTripPlan(country)}
    >
      <div className="flex justify-center items-center space-x-2">{btnTxt}</div>
    </button>
  );
}
