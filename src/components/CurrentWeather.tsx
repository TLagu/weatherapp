import {
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { WeatherApi } from "../api/WeatherApi";
import { City } from "../models/City";
import { WeatherDto } from "../models/weather/WeatherDto";
import dayClearSky from "../assets/01d.png";
import nightClearSky from "../assets/01n.png";
import dayFewClouds from "../assets/02d.png";
import nightFewClouds from "../assets/02n.png";
import dayScatteredClouds from "../assets/03d.png";
import nightScatteredClouds from "../assets/03n.png";
import dayBrokenClouds from "../assets/04d.png";
import nightBrokenClouds from "../assets/04n.png";
import dayShowerRain from "../assets/09d.png";
import nightShowerRain from "../assets/09n.png";
import dayRain from "../assets/10d.png";
import nightRain from "../assets/10n.png";
import dayThunderstorm from "../assets/11d.png";
import nightThunderstorm from "../assets/11n.png";
import daySnow from "../assets/13d.png";
import nightSnow from "../assets/13n.png";
import dayMist from "../assets/50d.png";
import nightMist from "../assets/50n.png";

interface CurrentWeatherProps {
  selectedCity: City | null;
}

export const CurrentWeather = (props: CurrentWeatherProps) => {
  const [weather, setWeather] = useState<WeatherDto | null>(null);

  const fetchCurrentWeather = useCallback(async (selectedCity: City) => {
    const result = await WeatherApi.getCurrentWeather(
      selectedCity.latitude,
      selectedCity.longitude
    );

    setWeather(result.data);
  }, []);

  useEffect(() => {
    if (props.selectedCity) {
      fetchCurrentWeather(props.selectedCity);
    }
  }, [props.selectedCity, fetchCurrentWeather]);

  if (!weather) {
    return null;
  }

  let icon: string;
  switch (weather?.weather[0].icon) {
    case "01d":
      icon = dayClearSky;
      break;
    case "01n":
      icon = nightClearSky;
      break;
    case "02d":
      icon = dayFewClouds;
      break;
    case "02n":
      icon = nightFewClouds;
      break;
    case "03d":
      icon = dayScatteredClouds;
      break;
    case "03n":
      icon = nightScatteredClouds;
      break;
    case "04d":
      icon = dayBrokenClouds;
      break;
    case "04n":
      icon = nightBrokenClouds;
      break;
    case "09d":
      icon = dayShowerRain;
      break;
    case "09n":
      icon = nightShowerRain;
      break;
    case "10d":
      icon = dayRain;
      break;
    case "10n":
      icon = nightRain;
      break;
    case "11d":
      icon = dayThunderstorm;
      break;
    case "11n":
      icon = nightThunderstorm;
      break;
    case "13d":
      icon = daySnow;
      break;
    case "13n":
      icon = nightSnow;
      break;
    case "50d":
      icon = dayMist;
      break;
    case "50n":
      icon = nightMist;
      break;
    default:
      icon = "";
  }

  return (
    <div>
      <Stack spacing="4" align="center">
        <Card
          w="400px"
          mx="auto"
          mt="15"
          mb="15"
          border="1px"
          borderColor="silver"
          borderRadius="10"
        >
          <CardBody>
            <Grid
              templateAreas={`"header header icon"
                  "temp name value"`}
              gridTemplateRows={"50px 1fr"}
              gridTemplateColumns={"1fr 100px 100px"}
              gap="1"
              w="360px"
              h="200px"
            >
              <GridItem pl="2" area={"header"}>
                <Text fontSize="20px" fontWeight="bold">
                  {props.selectedCity?.name}
                </Text>
                <Text>{weather?.weather[0].description}</Text>
              </GridItem>
              <GridItem pl="2" area={"icon"}>
                <Image src={icon} boxSize="60px"></Image>
              </GridItem>
              <GridItem pl="2" area={"temp"}>
                <Center h="100%" fontSize={"60px"}>{`${Math.round(
                  weather?.main.temp
                )}°C`}</Center>
              </GridItem>
              <GridItem pl="2" area={"name"} pt="20px">
                <Text>
                  Details:
                  <br />
                  Feel like:
                  <br />
                  Wind:
                  <br />
                  Humidity:
                  <br />
                  Pressure:
                </Text>
              </GridItem>
              <GridItem pl="2" area={"value"} pt="20px">
                <Text textAlign={"right"} mr="10px">
                  <br />
                  {`${Math.round(weather?.main.feels_like)} °C`}
                  <br />
                  {`${Math.round(weather?.wind.speed)} m/s`}
                  <br />
                  {`${Math.round(weather?.main.humidity)} %`}
                  <br />
                  {`${Math.round(weather?.main.pressure)} hPa`}
                </Text>
                <Text></Text>
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
      </Stack>
    </div>
  );
};
