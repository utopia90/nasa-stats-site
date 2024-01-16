
'use client'
import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';


import { Line } from 'react-chartjs-2';
import { getMappedOptionsData } from './utils';
import { getTotalMeteoritCountInYearsRange } from '../utils';


export type MeteoritsData = Meteorits[]

export interface Meteorits {
  name: string
  id: string
  nametype: string
  recclass: string
  mass: string
  fall: string
  year: string
  reclat: string
  reclong: string
  geolocation: Geolocation
}

export interface Geolocation {
  latitude: string
  longitude: string
}
export type initialData = {
  initialData: number[]
  firstyearsRange: {
    min: number,
    max: number
  }
}

export default function MeteoritsLanding({ initialData, firstyearsRange }: initialData) {
  const [yearsRange , setYearsRange]= useState(firstyearsRange)
  const [meteoritData, setMeteoritData] = useState(initialData)

  const { options, data } = getMappedOptionsData(yearsRange, meteoritData)
  const showBackButton = yearsRange?.max >= firstyearsRange?.max
  const LAST_DATA_YEAR = 2013

  useEffect(() => {
    async function fetchData(){
      const newData = await getTotalMeteoritCountInYearsRange(yearsRange)
      setMeteoritData(newData as number[])
    }

    fetchData()
  }, [yearsRange])

  function handleForwardNavigation() {
    if (yearsRange.max < LAST_DATA_YEAR) {
      setYearsRange({
        min: yearsRange.min + 10,
        max: yearsRange.max + 10,
      })
    } else {
      alert("We do not have more available data")
    }
  }

  function handlePageNavigation(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()

    const value = (e.target as HTMLButtonElement).value

    if (value == 'back' && showBackButton) {
      setYearsRange({
        min: yearsRange.min - 10,
        max: yearsRange.max -  10,
      })
    } else {
      handleForwardNavigation()
    }
  }


  Chart.register(...registerables);

  return (
    <>
        <main>
          <div className="container mx-auto  w-11/12">
            <Line options={options} data={data} />
          </div>
          <div className="flex justify-center items-center py-4 space-x-8">
            {showBackButton &&
              <button value="back" onClick={handlePageNavigation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 min-w-40 rounded-full">
                Back
              </button>}
            <button value="forward" onClick={handlePageNavigation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 min-w-40 rounded-full">
              Forward
            </button>
          </div>
        </main>
    
    </>)
}