import MeteoritsLanding from "@/app/pages/MeteoritsLanding"
import ExtraVehicularActivity from "@/app/pages/ExtraVehicularActivity"
import DinamicExtraVehicularActivity from "@/app/pages/DinamicExtraVehicularActivity"


export enum userSelectionOptions {
  ONE, TWO, THREE
}
export function getCurrentPage(userSelection: userSelectionOptions, initialData: number[],  yearsRange: {
  min: number,
  max: number
}) {
const routes =  {
[userSelectionOptions.ONE]: <MeteoritsLanding initialData={initialData} firstyearsRange={yearsRange}/>,
[userSelectionOptions.TWO]: <ExtraVehicularActivity/>,
[userSelectionOptions.THREE]: <DinamicExtraVehicularActivity/>
}
return routes[userSelection] 
}