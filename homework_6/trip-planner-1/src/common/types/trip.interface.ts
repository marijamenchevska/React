export interface Trip {
  tripCountries: { country: string; flag: string; visitingDays: number }[];
  passenger: string;
  budget: number;
  comments: string;
}
