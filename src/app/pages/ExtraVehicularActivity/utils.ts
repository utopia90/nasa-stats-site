import { Country, VehicularDataI } from "@/app/hooks/useExtraVehicularData";


function getOptionsData(minYear: number, maxYear: number, countryDataUSA: number[], countryDataRussia: number[]) {

  const GRAPH_COLOR = '#8DA6CE'
  const options = {
    scales: {
      y: {
        grid: {
          drawBorder: true,
          color: GRAPH_COLOR,
        },
        ticks: {
          beginAtZero: true,
          color: GRAPH_COLOR,
          fontSize: 12,
        }
      },
      x: {
        grid: {
          drawBorder: true,
          color: GRAPH_COLOR,
        },
        ticks: {
          color: GRAPH_COLOR,
          fontSize: 12,
        }
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Russia Vs USA Total Number Of Extra Vehicular Activity From ${minYear} to ${maxYear}`,
        color: GRAPH_COLOR
      },
    },
  };
  function generateYearsRange() {
    let result = [];
    for (let i = minYear; i <= maxYear; i++) {
      result.push(i);
    }
    return result;
  }

  const labels = generateYearsRange()


  const data = {
    labels,
    datasets: [
      {
        label: 'USA',
        data: countryDataUSA,
        backgroundColor: '#ff598f',
      },
      {
        label: 'Russia',
        data: countryDataRussia,
        backgroundColor: '#01dddd',
      },
    ]
  };
  return { options, data }
}

function getDonutOptionsData(russiaData: VehicularDataI[], usaData: VehicularDataI[]) {

  const getDataDonutByCountry = (country: Country) => {

    let countryData = country === Country.RUSSIA ? russiaData : usaData

    function getTotalSeconds(timeString: string) {

      const [minutes, seconds] = timeString?.split(":").map(Number);
      const totalSeconds = minutes * 60 + seconds;
      return totalSeconds
    }

    const dataSet = {
      maintainAspectRatio: false,
      responsive: false,
      labels: countryData?.map((data: VehicularDataI) => data?.crew?.split(" ").slice(0, 2).join(" ")),
      datasets: [
        {
          data: countryData?.map((data: VehicularDataI) => getTotalSeconds(data?.duration)),
          backgroundColor: ['#ff598f', '#fd8a5e', '#e0e300', '#01dddd', '#00bfaf'],
          hoverBackgroundColor: ['#ff599f', '#fd8a6e', '	#e0e301', '#02dddd', '#1bfaf']
        }
      ]
    }
    return dataSet
  }
  const donutOptions = {
    legend: {
      display: true,
      position: "right"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  const russianData = getDataDonutByCountry(Country.RUSSIA)
  const usaCountryData = getDataDonutByCountry(Country.USA)

  return { russianData, usaCountryData, donutOptions }
}

export { getOptionsData, getDonutOptionsData }