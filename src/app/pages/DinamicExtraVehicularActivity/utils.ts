import useExtraVehicularData, { Country, VehicularDataI } from "@/app/hooks/useExtraVehicularData";
import { Dispatch, SetStateAction, useState } from "react";



export interface DataI {
  datasets: { label: string; data: { x: number; y: number; r: number; }[]; backgroundColor: string; }[]
}
export interface GraPhI { data: DataI, options: {} }
function getDinamicOptionsData(minYear: number, maxYear: number, countryData: VehicularDataI[], country: Country) {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Total Number Of Extra Vehicular Activity From ${minYear} to ${maxYear} in ${country}`,
        color: '#6B6B6B'
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

  const countryDataUSA = country == Country.BOTH ? [...countryData].filter(({ country }) => country == Country.USA) : countryData
  const countryDataRussia = country == Country.BOTH ? [...countryData].filter(({ country }) => country == Country.RUSSIA) : countryData
  if (country == Country.USA || country == Country.BOTH) {
    datasets.push({
      label: 'USA',
      data: [...labels].map((year) => ({
        x: year,
        y: getTotalActivityNumberByYear(countryDataUSA, year),
        r: getBubbleSize(getTotalActivityNumberByYear(countryDataUSA, year))
      })),
      backgroundColor: '#ff598f',
    })
  }
  if (country == Country.RUSSIA || country == Country.BOTH) {
    datasets.push({
      label: 'Russia',
      data: [...labels].map((year) => ({
        x: year,
        y: getTotalActivityNumberByYear(countryDataRussia, year),
        r: getBubbleSize(getTotalActivityNumberByYear(countryDataRussia, year))
      })),
      backgroundColor: '#01dddd',
    })
  }
  const data = {
    datasets: datasets,
  };
  return { options, data }
}




export { getDinamicOptionsData }