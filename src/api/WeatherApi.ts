import { weatherApi } from "../hooks/useAxios";
import { ForecastDto } from "../models/forecast/ForecastDto";
import { WeatherDto } from "../models/weather/WeatherDto";

export class WeatherApi {
  static getFutureWeather = async (lat: number, lon: number) =>
    await weatherApi.get<ForecastDto>("/forecast", {
      params: { lat: lat, lon: lon },
    });

  static getCurrentWeather = async (lat: number, lon: number) =>
    await weatherApi.get<WeatherDto>("/weather", {
      params: { lat: lat, lon: lon },
    });
}
