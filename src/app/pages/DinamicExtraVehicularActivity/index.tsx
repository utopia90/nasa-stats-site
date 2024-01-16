import React, { ChangeEvent, useEffect, useState } from 'react'
import useExtraVehicularData, { Country } from '@/app/hooks/useExtraVehicularData'
import { Chart, registerables } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import { GraPhI, getDinamicOptionsData } from './utils';



export default function DinamicExtraVehicularActivity() {


  const RANGE_YEARS = 20
  const MIN_YEAR = 1965
  const MAX_YEAR = 1993

  const [minYear, setMinYear] = useState(0)
  const maxYear = minYear + RANGE_YEARS
  const [graphData, setGraphData] = useState<GraPhI>(Object)
  let [country, setCountry] = useState('')

  const { yearsData: countryDataRusia } = useExtraVehicularData( Country.RUSSIA, { min: minYear, max: maxYear })
  const { yearsData: countryDataUsa } = useExtraVehicularData( Country.USA, { min: minYear, max: maxYear })


  const showGraphic = minYear >= MIN_YEAR && country?.length > 0


  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    const countryValue = (e.currentTarget.value)
    setCountry(countryValue)
  }

  function handleGraphData() {
    const { data, options } = getDinamicOptionsData(minYear, maxYear, countryDataRusia, countryDataUsa, country as Country)
    const graphData: GraPhI = {
      data: data,
      options: options
    }
    setGraphData(graphData)
  }
  function handleYear(e: React.KeyboardEvent<HTMLInputElement>) {
    const year = Number(e.currentTarget.value)
    if (year < 1000) return;
    if (Number(year) >= MIN_YEAR && Number(year) <= MAX_YEAR) {
      setMinYear(Number(year))
    } else {
      alert(`Please write a year between ${MIN_YEAR} and ${MAX_YEAR}`)
    }
  }

  useEffect(() => {
    handleGraphData()
  }, [minYear, country])

  Chart.register(...registerables);


  return (
    <>
      <div className=" w-10/12 my-12">
        <div className="flex justify-between mb-6">
          <select onChange={handleSelect} className="w-1/2 block mr-4 appearance-none w-full bg-white border border-secondary py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-secondary focus:shadow-outline">
            <option value="" disabled selected hidden>Select Country To See Stats </option>
            <option value={Country.RUSSIA}>Russia</option>
            <option value={Country.USA}>Usa</option>
            <option value={Country.BOTH}>Both</option>
          </select>
          <input onKeyUp={handleYear} type="text" required placeholder={`Type Year from ${MIN_YEAR} to ${MAX_YEAR}`} className="w-1/2 border-b border-secondary px-3 py-2 focus:outline-none focus:border-b-2 focus:border-secondary" />
        </div>
        {showGraphic && <Bubble {...graphData} />}
      </div>
    </>
  )
}

