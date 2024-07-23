import { useForm } from "react-hook-form";
import { TripInfoForm } from "../common/types/forms.type";
import { useContext } from "react";
import { CountryContext } from "../context/country.context";

export default function TripInfo() {
  const { onTripSave } = useContext(CountryContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripInfoForm>();

  return (
    <div className="w-5/6 md:w-1/3 lg:w-1/4 mx-auto py-5 text-slate-50">
      <h1 className="text-center text-base pb-5">Trip Information</h1>
      <form
        onSubmit={handleSubmit(onTripSave)}
        className="flex flex-col text-sm"
      >
        <label className="flex flex-col mb-5">
          <span className="font-bold italic">Name</span>
          <input
            type="text"
            className="focus:outline-none bg-transparent border-b py-1 text-xs"
            {...register("name", {
              required: "*Name is required",
              minLength: {
                value: 2,
                message: "*Name must be at least 2 characters long",
              },
            })}
          />
          <span className="text-xxs text-orange-400">
            {errors.name?.message}
          </span>
        </label>

        <label className="flex flex-col mb-5">
          <span className="font-bold italic">Email</span>
          <input
            type="email"
            className="focus:outline-none bg-transparent border-b py-1 text-xs"
            {...register("email", {
              required: "*email is required",
              minLength: {
                // Theoretically, email must be at least eg. a@a.co
                value: 6,
                message: "*email must be at least 6 characters long",
              },
            })}
          />
          <span className="text-xxs text-orange-400">
            {errors.email?.message}
          </span>
        </label>

        <label className="flex flex-col mb-5">
          <span className="font-bold italic">Budget</span>
          <input
            type="number"
            className="focus:outline-none bg-transparent border-b py-1 text-xs"
            {...register("budget", {
              required: "*Budget is required",
              min: {
                value: 1,
                message: "*Budget must be a positive number",
              },
            })}
          />
          <span className="text-xxs text-orange-400">
            {errors.budget?.message}
          </span>
        </label>

        <label className="flex flex-col mb-5">
          <span className="font-bold italic">Passport Number</span>
          <input
            type="text"
            className="focus:outline-none bg-transparent border-b py-1 text-xs"
            {...register("passportNumber", {
              required: "*Passport number is required",
              pattern: {
                value: /^[A-Z][0-9]{7}$/,
                message: "*Passport number is invalid",
              },
              minLength: {
                value: 8,
                message: "*Passport number must be at least 8 characters long",
              },
            })}
          />
          <span className="text-xxs text-orange-400">
            {errors.passportNumber?.message}
          </span>
        </label>

        <label className="flex flex-col">
          <span className="font-bold italic">Comments</span>
          <textarea
            rows={4}
            className="focus:outline-none bg-transparent border text-xs my-1.5 p-2 overscroll-y-none"
            {...register("comments")}
          ></textarea>
        </label>

        <button
          className="text-xs self-center py-2 mt-3 text-slate-200 border border-slate-50 rounded-full w-32 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
          type="submit"
        >
          <div className="flex justify-center items-center space-x-2">
            Save Trip
          </div>
        </button>
      </form>
    </div>
  );
}
