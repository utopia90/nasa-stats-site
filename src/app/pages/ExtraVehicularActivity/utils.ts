import { Country, VehicularDataI } from "@/app/hooks/useExtraVehicularData";


function getOptionsData(minYear: number, maxYear: number, russiaData: VehicularDataI[], usaData: VehicularDataI[]) {
  
  const GRAPH_COLOR = '#8DA6CE'
  const options = {
    scales: {
      y:{
        grid: {
          drawBorder: true,
          color: GRAPH_COLOR,
      },
        ticks:{
            beginAtZero: true,
            color: GRAPH_COLOR,
            fontSize: 12,
        }
    },
    x:{
      grid: {
        drawBorder: true,
        color: GRAPH_COLOR,
    },
      ticks:{
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
        color:  GRAPH_COLOR 
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
  function getTotalActivityNumberByYear(countryData: VehicularDataI[], year: number) {
    return countryData.filter((activity: VehicularDataI) => new Date(activity.date).getFullYear() == year).length

  }
  const labels = generateYearsRange()


  const data = {
    labels,
    datasets: [
      {
        label: 'USA',
        data: [...labels].map((year) => getTotalActivityNumberByYear(usaData, year)),
        backgroundColor: '#ff598f',
      },
      {
        label: 'Russia',
        data: [...labels].map((year) => getTotalActivityNumberByYear(russiaData, year)),
        backgroundColor: '#01dddd',
      },
    ]
  };
  return { options, data }
}

function getDonutOptionsData(russiaData: VehicularDataI[], usaData: VehicularDataI[]) {


  const getDataDonutByCountry = (country: Country) => {

    let countryData = country === Country.RUSSIA ? russiaData : usaData
    function convertToDatetime(timeString: string) {
      const [minutes, seconds] = timeString.split(':').map(Number);

      const referenceDate = new Date(1970, 0, 1, 0, 0, 0, 0);

      referenceDate.setMinutes(referenceDate.getMinutes() + minutes);
      referenceDate.setSeconds(referenceDate.getSeconds() + seconds);

      const totalSeconds = referenceDate.getMinutes() * 60 + referenceDate.getSeconds()
      return totalSeconds
    }
    const dataSet = {
      maintainAspectRatio: false,
      responsive: false,
      labels: countryData?.filter((data: VehicularDataI) => data?.country == country).map((data: VehicularDataI) => data?.crew.split(" ").slice(0, 2).join(" ")),
      datasets: [
        {
          data: countryData?.map((data: VehicularDataI) => convertToDatetime(data?.duration)),
          backgroundColor: ['#ff598f', '#fd8a5e', '#e0e300', '#01dddd', '#00bfaf'],
          hoverBackgroundColor: ['#ff599f', '#fd8a6e', '	#e0e301', '#02dddd', '#1bfaf']
        }
      ]
    }
    return dataSet
  }
  const donutOptions = {
    legend: {
      display: false,
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