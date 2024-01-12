'use server'
import React from 'react';
import { getData } from "../pages/utils";
import DashBoard from '../components/DashBoard';


 async function Home() {
  const data = await getData()

  return (
    <DashBoard initialData={data}/>
  )
}

export default Home;