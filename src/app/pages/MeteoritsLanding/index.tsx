
'use client'
import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';


import { Line } from 'react-chartjs-2';
import { delay, getMappedOptionsData } from './utils';


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
  initialData: MeteoritsData
}

export default function MeteoritsLanding({ initialData }: initialData) {
  const [page, setPage] = useState<number>(0)
  const { options, data, lastVisitbleYear } = getMappedOptionsData(page, initialData)
  const showBackButton = page >= 20
  const LAST_DATA_YEAR = 2013
  const [componentsVisible, setComponentsVisible] = useState(false);

  function handleForwardNavigation() {
    if (lastVisitbleYear < LAST_DATA_YEAR) {
      setPage((prevValue) => prevValue += 20)
    } else {
      alert("We do not have more available data")
    }
  }

  function handlePageNavigation(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()

    const value = (e.target as HTMLButtonElement).value

    if (value == 'back' && page >= 20) {
      setPage((prevValue) => prevValue -= 20)
    } else {
      handleForwardNavigation()
    }
  }
  React.useEffect(() => {
    const fetchData = async () => {
      await delay(500); // Espera medio segundo
      setComponentsVisible(true);
    };

    fetchData();
  }, []);

  Chart.register(...registerables);

  return (
    <>
      { componentsVisible && 
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
      }
    </>)
}