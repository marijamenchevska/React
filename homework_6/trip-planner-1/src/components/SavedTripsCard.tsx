import { SavedTripsCardProps } from "../common/types/props.type";

export default function SavedTripsCard({ trip }: SavedTripsCardProps) {
  return (
    <div className="w-56 text-slate-50 text-xs bg-transparent space-y-2 m-7 p-2 rounded-xl shadow-xl">
      <div className="flex justify-between">
        <div>
          <p>Passenger:</p>
          <p>{trip.passenger}</p>
        </div>
        <div>
          <p>Budget:</p>
          <p>{`$${trip.budget}`}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="border-b">
          <span>Countries to visit:</span>
        </p>
        <ul className="space-y-2 border-b pb-1.5">
          {trip.tripCountries.map((tripCountry) => (
            <li
              key={tripCountry.country}
              className="flex justify-between items-center"
            >
              <span className="flex items-center">
                <img
                  className="max-h-full max-w-full w-7 mr-1 shrink-1 object-scale-down"
                  src={tripCountry.flag}
                  alt={tripCountry.country}
                />
                <span className="text-wrap">{tripCountry.country}</span>
              </span>
              <span className="w-12 text-end">
                {tripCountry.visitingDays}
                {tripCountry.visitingDays == 1 ? " day" : " days"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-1">
          <span>Comments:</span>
        </p>
        <p className="italic">{trip.comments}</p>
      </div>
    </div>
  );
}
