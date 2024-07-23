import { useNavigate } from "react-router-dom";

export default function TripSavedPage() {
  const navigate = useNavigate();

  return (
    <div className="text-slate-50 text-center text-base py-7 space-y-5">
      <span>Your trip has been saved.</span>

      <div className="w-72 flex justify-between mx-auto">
        <button
          className="text-xs self-center py-2 mt-3 text-slate-200 border border-slate-50 rounded-full w-32 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
          type="button"
          onClick={() => navigate("/")}
        >
          <div className="flex justify-center items-center space-x-2">
            Go Home
          </div>
        </button>

        <button
          className="text-xs self-center py-2 mt-3 text-slate-200 border border-slate-50 rounded-full w-32 hover:bg-slate-200 hover:text-slate-600 focus:outline-none"
          type="button"
          onClick={() => navigate("/saved-trips")}
        >
          <div className="flex justify-center items-center space-x-2">
            View Saved Trips
          </div>
        </button>
      </div>
    </div>
  );
}
