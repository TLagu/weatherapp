import Chart from "react-apexcharts";
import { ForecastView } from "../models/ForecastView";
import { MeasurementDto } from "../models/MeasurementDto";

interface BarChartProps {
  view: MeasurementDto[];
  type: string;
}

export const BarChart = (props: BarChartProps) => {
  let title: string = "Default title";
  let name: string = "Default name";
  let data = props.view.map((x) => 0);
  let categories = props.view.map((x) =>
    new Date(x.dt * 1000).getHours().toString()
  );
  switch (props.type) {
    case "temperature": {
      title = "Temperature [°C]";
      name = "Temperature";
      data = props.view.map((x) => x.main.temp);
      break;
    }
    case "pressure": {
      title = "Pressure [hPa]";
      name = "Pressure";
      data = props.view.map((x) => x.main.pressure);
      break;
    }
    case "cloudsLevel": {
      title = "Clouds level [%]";
      name = "Clouds level";
      data = props.view.map((x) => x.clouds.all);
      break;
    }
    case "humidity": {
      title = "Humidity [%]";
      name = "Humidity";
      data = props.view.map((x) => x.main.humidity);
      break;
    }
    case "windSpeed": {
      title = "Wind speed [m/s]";
      name = "Wind speed";
      data = props.view.map((x) => x.wind.speed);
      break;
    }
    case "feelsLike": {
      title = "Feels like [°C]";
      name = "Feels like";
      data = props.view.map((x) => x.main.feels_like);
      break;
    }
  }
  const common = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: categories,
        title: {
          text: "Hour",
          offsetY: 80,
        },
      },
      title: {
        text: title,
      },
    },
    series: [
      {
        name: name,
        data: data,
      },
    ],
  };

  return (
    <div>
      {
        <Chart
          options={common.options}
          series={common.series}
          type="bar"
          width="500"
          id={name}
        />
      }
    </div>
  );
};
