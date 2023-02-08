import { MainDto } from "./MainDto";
import { WeatherDetailsDto } from "./WeatherDetailsDto";
import { WindDto } from "./WindDto";

export interface WeatherDto {
  weather: WeatherDetailsDto[];
  main: MainDto;
  wind: WindDto;
}
