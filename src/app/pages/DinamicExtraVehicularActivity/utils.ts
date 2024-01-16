import useExtraVehicularData, { Country, VehicularDataI } from "@/app/hooks/useExtraVehicularData";
import { Dispatch, SetStateAction, useState } from "react";



export interface DataI {
  datasets: { label: string; data: { x: number; y: number; r: number; }[]; backgroundColor: string; }[]
}
export interface GraPhI { data: DataI, options: {} }
function getDinamicOptionsData(minYear: number, maxYear: number, countryDataRussia: number[], countryDataUsa: number[], country: Country) {

  const titleCountry = country === Country.BOTH ? 'Russia And USA' : country

  const GRAPH_COLOR = '#8DA6CE'
  const options = {
    responsive: true,
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Total Number Of Extra Vehicular Activity From ${minYear} to ${maxYear} in ${titleCountry}`,
        color: GRAPH_COLOR,
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

  function getBubbleSize(totalActivity: number) {
    let totalSize = 6
    if (totalActivity <= 3) {
      totalSize = 4
    } else if (totalActivity >= 5) {
      totalSize = 10
    }

    return totalSize
  }


  const datasets = []

  
  if (country == Country.USA || country == Country.BOTH) {
    datasets.push({
      label: 'USA',
      data: [...labels].map((year, i) => ({
        x: year,
        y: countryDataUsa[i],
        r: getBubbleSize(countryDataUsa[i])
      })),
      backgroundColor:  '#ff598f',
    })
  }
  if (country == Country.RUSSIA || country == Country.BOTH) {
    datasets.push({
      label: 'Russia',
      data: [...labels].map((year, i) => ({
        x: year,
        y: countryDataRussia[i],
        r: getBubbleSize(countryDataRussia[i])
      })),
      backgroundColor:  '#01dddd',
    })
  }
  const data = {
    datasets: datasets,
  };
  return { options, data }
}




export { getDinamicOptionsData }