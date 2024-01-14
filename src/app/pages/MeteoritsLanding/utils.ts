import { MeteoritsData } from "./MeteoritsLanding";

export const getMappedOptionsData = (page: number, rawData: MeteoritsData) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Meteorits Landing Per Year',
      },
    },
    animations: {
      tension: {
        duration: 8000,
        easing: 'linear' as const,
        from: 1,
        to: 0,
      }
    },
    scales: {
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 15
      }
    }
  
  };
  const sortedData = rawData.sort((a, b) => {
    var yearA = new Date(a.year).getTime();
    var yearB = new Date(b.year).getTime();
  
    return yearA - yearB;
  })
  const getTotalMeteoritsLandingByYear = (year: number) => {
     const meteoritsNumber = rawData.filter((data) => new Date(data.year).getFullYear() == year).length
     return meteoritsNumber
  }
  
  const NUM_ENTRIES = 20
  const dataSample = sortedData.slice(page, page + NUM_ENTRIES)
  const labels = dataSample.map((sample) => new Date(sample.year).getFullYear())
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Number Of Meteorits Landings By Year',
        data: dataSample.map((sample) => getTotalMeteoritsLandingByYear(new Date(sample.year).getFullYear())),
        borderColor: 'rgb(53, 162, 235)',
  }]

  };
  const lastVisitbleYear = new Date(dataSample[dataSample.length -1].year).getFullYear()

  return {options, data, lastVisitbleYear }
  
}


