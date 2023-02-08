import React, { useState } from "react";
import "./App.css";
import { Search } from "./components/Search";
import { ChakraProvider } from "@chakra-ui/react";
import useAxios from "./hooks/useAxios";
import { FutureWeather } from "./components/FutureWeather";
import { CurrentWeather } from "./components/CurrentWeather";
import { City } from "./models/City";

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const onSelectedCity = (selectedCity: City) => {
    setSelectedCity(selectedCity);
  };

  useAxios();

  return (
    <ChakraProvider>
      <Search onSelectedCity={onSelectedCity} />
      <CurrentWeather selectedCity={selectedCity} />
      <FutureWeather selectedCity={selectedCity} />
    </ChakraProvider>
  );
}

export default App;
