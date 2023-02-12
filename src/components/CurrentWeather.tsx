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
import { ForecastMapper } from "../models/weather/ForecastMapper";
import { WeatherView } from "../models/weather/WeatherView";

interface CurrentWeatherProps {
  selectedCity: City | null;
}

export const CurrentWeather = (props: CurrentWeatherProps) => {
  const [weather, setWeather] = useState<WeatherView | null>(null);

  const fetchCurrentWeather = useCallback(async (selectedCity: City) => {
    const result = await WeatherApi.getCurrentWeather(
      selectedCity.latitude,
      selectedCity.longitude
    );

    setWeather(ForecastMapper.mapForecastDtoToView(result.data));
  }, []);

  useEffect(() => {
    if (props.selectedCity) {
      fetchCurrentWeather(props.selectedCity);
    }
  }, [props.selectedCity, fetchCurrentWeather]);

  if (!weather) {
    return null;
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
                <Text>{weather?.description}</Text>
              </GridItem>
              <GridItem pl="2" area={"icon"}>
                <Image src={weather?.icon} boxSize="60px"></Image>
              </GridItem>
              <GridItem pl="2" area={"temp"}>
                <Center h="100%" fontSize={"60px"}>{`${Math.round(
                  weather?.temp
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
                  {`${Math.round(weather?.feelsLike)} °C`}
                  <br />
                  {`${Math.round(weather?.windSpeed)} m/s`}
                  <br />
                  {`${Math.round(weather?.humidity)} %`}
                  <br />
                  {`${Math.round(weather?.pressure)} hPa`}
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
