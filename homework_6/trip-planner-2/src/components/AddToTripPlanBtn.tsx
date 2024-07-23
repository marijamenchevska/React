import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disabledBtn, enabledBtn } from "../common/consts/tripBtnUsability";
import { Country } from "../common/types/country.interface";
import { CountryCardProps } from "../common/types/props.type";
import { setTripCountries } from "../reducers/trip.reducer";
import { RootState } from "../store/store";

export default function AddToTripPlanBtn({ country }: CountryCardProps) {
  const tripCountries = useSelector(
    (state: RootState) => state.trips.tripCountries
  );
  const [btnUsability, setBtnUsability] = useState(enabledBtn);

  const addToTripPlan = (country: Country) => {
    dispatch(setTripCountries(country));

    setBtnUsability(disabledBtn);
  };

  const dispatch = useDispatch();

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
        <span>{btnUsability.btnTxt}</span>
        <FontAwesomeIcon className={btnUsability.checkIcon} icon={faCheck} />
      </div>
    </button>
  );
}
