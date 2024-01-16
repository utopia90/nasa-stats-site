import React from 'react';
import useExtraVehicularData, { Country, SortEnum } from '@/app/hooks/useExtraVehicularData'
import { Chart, registerables } from 'chart.js';


import { getDonutOptionsData, getOptionsData } from './utils';
import { Doughnut, Bar } from "react-chartjs-2";



function ExtraVehicularActivity() {
  const MIN_YEAR = 2000
  const MAX_YEAR = 2013
  const DONUT_SAMPLE = 4
  const { yearsData: dataUsa, error, loading } = useExtraVehicularData(Country.USA, { min: MIN_YEAR, max: MAX_YEAR })
  const { yearsData: dataRussia } = useExtraVehicularData(Country.RUSSIA, { min: MIN_YEAR, max: MAX_YEAR })


  const { missionsByDurationData: usaDonutData } = useExtraVehicularData(Country.USA, { min: MIN_YEAR, max: MAX_YEAR }, {sort: SortEnum.DESC, limit: DONUT_SAMPLE})
  const { missionsByDurationData: russiaDonutData } = useExtraVehicularData(Country.RUSSIA, { min: MIN_YEAR, max: MAX_YEAR }, {sort: SortEnum.DESC, limit: DONUT_SAMPLE})

  const { options, data} = getOptionsData(MIN_YEAR, MAX_YEAR, dataUsa, dataRussia)

 
    const { russianData, usaCountryData, donutOptions } = getDonutOptionsData(russiaDonutData, usaDonutData)

  if (error) return 'There was an error loading data'
  if (loading) return 'Loading...'


  Chart.register(...registerables);


  return (

    <div className="container mx-auto  w-9/12">
      <div className="container grid grid-cols-1 h=40 w-full">
        <Bar options={options} data={data} />
      </div>

       <div className="flex justify-between  w-full  py-5">
        <div className="w-1/2 px-10">
          <h1 className="text-typography text-xs font-bold">{`Top ${DONUT_SAMPLE} missions by duration in seconds and main russian astronaut who perfomed them`}</h1>
          <Doughnut
            data={russianData}
            options={donutOptions} />
        </div>
        <div className="w-1/2 px-10">
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
