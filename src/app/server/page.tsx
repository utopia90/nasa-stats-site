'use server'
import React from 'react';
import { getTotalMeteoritCountInYearsRange } from "../pages/utils";
import DashBoard from '../components/DashBoard';


 async function Home() {
  const firstYearsRange = {min: 1822, max: 1832}
  let yearsRange: number[] = getTotalMeteoritCountInYearsRange(firstYearsRange)

  return (
    <DashBoard initialData={yearsRange} yearsRange={firstYearsRange}/>
  )
}

export default Home;