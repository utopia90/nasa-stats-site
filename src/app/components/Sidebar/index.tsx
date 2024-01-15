import React, { useEffect, useState } from 'react';
import { userSelectionOptions } from '../DashBoard/utils';
import { changeTheme } from './../../utils/changeTheme'


type SideBarProps = {
  setUserSelection: (selection: userSelectionOptions) => void
}
export enum ThemeOptions {
  DARK = 'dark',
  LIGHT = 'light'
}
function Sidebar({ setUserSelection }: SideBarProps) {
  const [lightTheme, setLightTheme] = useState<boolean>(true)
  function handleUserSelection(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    const element = e.currentTarget as HTMLInputElement

    setUserSelection(element.value as unknown as userSelectionOptions)
  }
  function toggleTheme() {
    setLightTheme(!lightTheme)
  }

  useEffect(() => {
    const theme = lightTheme ? ThemeOptions.LIGHT : ThemeOptions.DARK
    changeTheme(theme)
  }, [lightTheme])


  return (
    <div className="w-1/4 -200 h-screen p-4">
      <h2 className="text-lg font-bold mb-4 text-typography">Dashboard</h2>
      <button value={userSelectionOptions.ONE} onClick={handleUserSelection} className="bg-buttons block w-full py-2 rounded-md  text-primary  mb-2 hover:bg-secondary transition duration-300 ease-in-out ">NASA Meteorit Landing Historic Data</button>
      <button value={userSelectionOptions.TWO} onClick={handleUserSelection} className="bg-buttons block w-full py-2 rounded-md  text-primary  mb-2 hover:bg-secondary transition duration-300 ease-in-out ">Extra-Vehicular Activity Stats</button>
      <button value={userSelectionOptions.THREE} onClick={handleUserSelection} className="bg-buttons block w-full py-2 rounded-md  text-primary  mb-2 hover:bg-secondary transition duration-300 ease-in-out ">Extra-Vehicular Activity Dinamic Graph</button>

      <button value={'toggle-theme'} onClick={toggleTheme} className="bg-buttons block w-full py-2 rounded-md  text-primary  mb-2 hover:bg-secondary transition duration-300 ease-in-out ">Toggle Theme</button>
    </div>
  );
}

export default Sidebar;