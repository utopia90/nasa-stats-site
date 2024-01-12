import React from 'react';
import useExtraVehicularData, { Country } from '@/app/hooks/useExtraVehicularData'
import { Chart, registerables } from 'chart.js';


import { getDonutOptionsData, getOptionsData } from './utils';
import { Doughnut, Bar } from "react-chartjs-2";



function ExtraVehicularActivity() {
  const MIN_YEAR = 2000
  const MAX_YEAR = 2013
  const DONUT_SAMPLE = 4
  const { data: russiaData } = useExtraVehicularData(Country.RUSSIA, { min: MIN_YEAR, max: MAX_YEAR })
  const { error, loading, data: usaData } = useExtraVehicularData(Country.USA, { min: MIN_YEAR, max: MAX_YEAR })
  const { data: usaDonutData } = useExtraVehicularData(Country.USA, { min: MIN_YEAR, max: MAX_YEAR }, true)
  const { data: russiaDonutData } = useExtraVehicularData(Country.RUSSIA, { min: MIN_YEAR, max: MAX_YEAR }, true)


  const { options, data } = getOptionsData(MIN_YEAR, MAX_YEAR, russiaData, usaData)
  const donutDataRussia = [...russiaDonutData].slice(0, DONUT_SAMPLE)
  const donutDataUSA = [...usaDonutData].slice(0, DONUT_SAMPLE)
  const { russianData, usaCountryData, donutOptions } = getDonutOptionsData(donutDataRussia, donutDataUSA)
  
  if (error) return 'There was an error loading data'
  if (loading) return 'Loading...'

  
  Chart.register(...registerables);


  return (

    <div className="container mx-auto  w-9/12">
      <div className="container grid grid-cols-1 h=40 w-full">
        <Bar options={options} data={data} />
      </div>

      <div className="flex justify-between  w-full py-12">
        <div className="w-1/3">
          <h1 className="text-typography text-xs font-bold">{`Top ${DONUT_SAMPLE} missions by duration in seconds and main russian astronaut who perfomed them`}</h1>
          <Doughnut
            data={russianData}
            options={donutOptions} />
        </div>
        <div className="w-1/3">
          <h1 className="text-typography text-xs font-bold">{`Top ${DONUT_SAMPLE} missions by duration in seconds and main american astronaut who perfomed them`}</h1>
          <Doughnut
            data={usaCountryData}
            options={donutOptions} />
        </div>
      </div>

    </div>


  )
}
export default ExtraVehicularActivity
