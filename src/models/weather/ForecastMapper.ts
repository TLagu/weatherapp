import dayClearSky from "assets/01d.png";
import nightClearSky from "assets/01n.png";
import dayFewClouds from "assets/02d.png";
import nightFewClouds from "assets/02n.png";
import dayScatteredClouds from "assets/03d.png";
import nightScatteredClouds from "assets/03n.png";
import dayBrokenClouds from "assets/04d.png";
import nightBrokenClouds from "assets/04n.png";
import dayShowerRain from "assets/09d.png";
import nightShowerRain from "assets/09n.png";
import dayRain from "assets/10d.png";
import nightRain from "assets/10n.png";
import dayThunderstorm from "assets/11d.png";
import nightThunderstorm from "assets/11n.png";
import daySnow from "assets/13d.png";
import nightSnow from "assets/13n.png";
import dayMist from "assets/50d.png";
import nightMist from "assets/50n.png";
import { WeatherDto } from "./WeatherDto";
import { WeatherView } from "./WeatherView";

export class ForecastMapper {
  static mapForecastDtoToView = (dto?: WeatherDto): WeatherView | null => {
    if (!dto) {
      return null;
    }

    return {
      description: dto.weather[0].description,
      feelsLike: Math.round(dto.main.feels_like),
      humidity: dto.main.humidity,
      icon: this.mapIconIdToIcon(dto.weather[0].icon),
      pressure: dto.main.pressure,
      temp: Math.round(dto.main.temp),
      windSpeed: dto.wind.speed,
    };
  };

  private static mapIconIdToIcon(iconId: string) {
    switch (iconId) {
      case "01d":
        return dayClearSky;
      case "01n":
        return nightClearSky;
      case "02d":
        return dayFewClouds;
      case "02n":
        return nightFewClouds;
      case "03d":
        return dayScatteredClouds;
      case "03n":
        return nightScatteredClouds;
      case "04d":
        return dayBrokenClouds;
      case "04n":
        return nightBrokenClouds;
      case "09d":
        return dayShowerRain;
      case "09n":
        return nightShowerRain;
      case "10d":
        return dayRain;
      case "10n":
        return nightRain;
      case "11d":
        return dayThunderstorm;
      case "11n":
        return nightThunderstorm;
      case "13d":
        return daySnow;
      case "13n":
        return nightSnow;
      case "50d":
        return dayMist;
      case "50n":
        return nightMist;
      default:
        return "";
    }
  }
}
