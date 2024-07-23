import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country } from "../common/types/country.interface";
import { TripPlanInputData } from "../common/types/forms.type";
import { saveInputDays } from "../reducers/trip.reducer";
import { RootState } from "../store/store";
import TripPlanCard from "./TripPlanCard";

export default function TripPlan() {
  const tripCountries = useSelector(
    (state: RootState) => state.trips.tripCountries
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTripContinue = (data: TripPlanInputData) => {
    dispatch(saveInputDays(data));

    navigate("/trip-info");
  };

  return !tripCountries.length ? (
    <div className="text-slate-50 text-center text-base py-7">
      Your trip plan is empty.
    </div>
  ) : (
    <form onSubmit={handleSubmit(onTripContinue)}>
      <div className="w-11/12 md:w-1/2 mx-auto m-5 flex flex-col items-center text-slate-50">
        {tripCountries.map((country: Country) => (
          <TripPlanCard
            key={country.name.common}
            country={country}
            register={register}
            errors={errors}
          />
        ))}

        <button
          className="text-xs py-2 mt-5 text-slate-200 border border-slate-50 rounded-full w-32 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
          type="submit"
        >
          <div className="flex justify-center items-center space-x-2">
            Continue
          </div>
        </button>
      </div>
    </form>
  );
}
