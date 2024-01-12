
'use client'
import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';


import { Bar, Line } from 'react-chartjs-2';
import { getMappedOptionsData } from './utils';


type DataProps = {
  initialData: []
}
export default function MeteoritsLanding({ initialData }: DataProps) {
  const [page, setPage] = useState<number>(0)
  const { options, data } = getMappedOptionsData(page, initialData)
  const showBackButton = page >= 20

  function handlePageNavigation(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()

    const value = (e.target as HTMLButtonElement).value 

    if (value == 'back' && page >= 20) {
      setPage((prevValue) => prevValue -= 20)
    } else {
      setPage((prevValue) => prevValue += 20)
    }
  }

  Chart.register(...registerables);

  return (
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
    </main>)
}