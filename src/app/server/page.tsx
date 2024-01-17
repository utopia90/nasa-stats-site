'use server'
import React, { lazy } from 'react';
const DashBoard = lazy(() => import('../components/DashBoard'));

async function Home() {
 

  return (
    <DashBoard  />
  )
}

export default Home;