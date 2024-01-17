import React, {lazy} from 'react'
const MeteoritsLanding = lazy(() => import( "@/app/pages/MeteoritsLanding"));
const ExtraVehicularActivity = lazy(() => import( "@/app/pages/ExtraVehicularActivity"));
const DinamicExtraVehicularActivity = lazy(() => import( "@/app/pages/DinamicExtraVehicularActivity"));



export enum userSelectionOptions {
  ONE, TWO, THREE
}
export function getCurrentPage(userSelection: userSelectionOptions) {
const routes =  {
[userSelectionOptions.ONE]: <MeteoritsLanding/>,
[userSelectionOptions.TWO]: <ExtraVehicularActivity/>,
[userSelectionOptions.THREE]: <DinamicExtraVehicularActivity/>
}
return routes[userSelection] 
}