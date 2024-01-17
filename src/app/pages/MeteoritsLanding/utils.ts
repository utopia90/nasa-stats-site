

export const getMappedOptionsData = (yearsRange: {min: number, max: number}, meteoritData: number[]) => {

  const GRAPH_COLOR = '#8DA6CE'
  const MAX =  Math.max.apply(null, meteoritData);
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
        y:{
           // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: MAX,
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
    }}
  
  };
  
  function generateYearsRange() {
    let result = [];
    for (let i = yearsRange?.min; i <= yearsRange?.max; i++) {
      result.push(i);
    }
    return result;
  }
  const labels = generateYearsRange()
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Number Of Meteorits Landings By Year',
        data: meteoritData,
        borderColor: 'rgb(53, 162, 235)',
  }]

  };

  return {options, data }
  
}


