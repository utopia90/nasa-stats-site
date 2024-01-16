'use server'
import React from 'react';
import { getTotalMeteoritCountInYearsRange } from "../pages/utils";
import DashBoard from '../components/DashBoard';


 async function Home() {
  const MIN_YEAR = 1822
  const YEARS_RANGE = 10
  const MAX_YEAR = MIN_YEAR + YEARS_RANGE

  const firstYearsRange = {min: MIN_YEAR, max: MAX_YEAR}
  let yearsRange: number[] =  getTotalMeteoritCountInYearsRange(firstYearsRange)

  return (
    <DashBoard initialData={yearsRange} yearsRange={firstYearsRange}/>
  )
}

export default Home;