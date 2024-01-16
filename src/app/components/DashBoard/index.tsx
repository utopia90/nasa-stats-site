'use client'
import React from 'react'
import Sidebar from '../Sidebar'
import MainContent from '../MainContent'
import { getCurrentPage, userSelectionOptions } from './utils'



type DashBoardProps = {
  initialData: number[]
  yearsRange: {
    min: number,
    max: number
  }
}
export default function DashBoard({ initialData, yearsRange }: DashBoardProps) {
  const [userSelectionPage, setUserSelectionPage] = React.useState<userSelectionOptions>(userSelectionOptions.ONE)
  const UserContent = getCurrentPage(userSelectionPage, initialData, yearsRange)

  
  return (
    <main className="flex w-100 h-100 bg-primary">
      <Sidebar setUserSelection={setUserSelectionPage}/>
      <MainContent>
          {UserContent}
      </MainContent>
    </main>
  )
}
