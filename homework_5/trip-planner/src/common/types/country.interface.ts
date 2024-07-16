export interface Country {
  name: {
    common: string;
  };
  capital: string[];
  area: number;
  flags: {
    svg: string;
  };
  population: number;
  landlocked: boolean;
  independent?: boolean;
  tripDays: number;
}
