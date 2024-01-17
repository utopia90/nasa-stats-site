'use client'
import React, {lazy} from 'react'
const Sidebar = lazy(() => import('../Sidebar'));
const MainContent = lazy(() => import('../MainContent'));
import { getCurrentPage, userSelectionOptions } from './utils'


export default function DashBoard() {
  
  const [userSelectionPage, setUserSelectionPage] = React.useState<userSelectionOptions>(userSelectionOptions.ONE)
  const UserContent = getCurrentPage(userSelectionPage)

  
  return (
    <main className="flex w-100 h-100 bg-primary">
      <Sidebar setUserSelection={setUserSelectionPage}/>
      <MainContent>
          {UserContent}
      </MainContent>
    </main>
  )
}
