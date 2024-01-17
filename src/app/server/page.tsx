'use server'
import React, { lazy } from 'react';
import { getTotalMeteoritCountInYearsRange } from "../pages/utils";
const DashBoard = lazy(() => import('../components/DashBoard'));

async function Home() {
  const MIN_YEAR = 1822
  const YEARS_RANGE = 10
  const MAX_YEAR = MIN_YEAR + YEARS_RANGE

  const firstYearsRange = { min: MIN_YEAR, max: MAX_YEAR }
  let yearsRangeData: number[] = getTotalMeteoritCountInYearsRange(firstYearsRange)

  return (
    <DashBoard initialData={yearsRangeData} yearsRange={firstYearsRange} />
  )
}

export default Home;