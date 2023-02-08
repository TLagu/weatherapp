import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { WeatherApi } from "../api/WeatherApi";
import { City } from "../models/City";
import { ForecastDto } from "../models/forecast/ForecastDto";
import { differenceInCalendarDays, addDays, format, isSameDay } from "date-fns";
import { BarChart } from "./BarChart";

interface FutureWeatherProps {
  selectedCity: City | null;
}

export const FutureWeather = (props: FutureWeatherProps) => {
  const [forecast, setForecast] = useState<ForecastDto | null>(null);

  const fetchFutureWeather = useCallback(async (selectedCity: City) => {
    const result = await WeatherApi.getFutureWeather(
      selectedCity.latitude,
      selectedCity.longitude
    );

    setForecast(result.data);
  }, []);

  const days = useMemo(() => {
    if (!forecast) {
      return [];
    }

    const endDate = new Date(forecast.list[forecast.cnt - 1].dt * 1000);
    const startDate = new Date(forecast.list[0].dt * 1000);

    const daysAmount = differenceInCalendarDays(endDate, startDate) + 1;

    const days = [];

    for (let i = 0; i < daysAmount; i++) {
      const date = addDays(startDate, i);

      days.push({
        name: format(date, "EEEE"),
        data: forecast.list.filter((x) =>
          isSameDay(new Date(x.dt * 1000), date)
        ),
      });
    }

    return days;
  }, [forecast]);

  useEffect(() => {
    if (props.selectedCity) {
      fetchFutureWeather(props.selectedCity);
    }
  }, [props.selectedCity, fetchFutureWeather]);

  return (
    <div>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {days.map((day) => (
            <Tab>{day.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {days.map((day) => (
            <TabPanel>
              {day.data.length > 0 ? (
                <div>
                  <Box display="flex" flexFlow="row wrap">
                    <BarChart view={day.data} type="temperature" />
                    <BarChart view={day.data} type="pressure" />
                    <BarChart view={day.data} type="cloudsLevel" />
                    <BarChart view={day.data} type="humidity" />
                    <BarChart view={day.data} type="windSpeed" />
                    <BarChart view={day.data} type="feelsLike" />
                  </Box>
                </div>
              ) : (
                <Box textAlign="center">No forecast for this day</Box>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};
