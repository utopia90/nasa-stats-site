import MeteoritsLanding from "@/app/pages/MeteoritsLanding/MeteoritsLanding"
import ExtraVehicularActivity from "@/app/pages/ExtraVehicularActivity"
import DinamicExtraVehicularActivity from "@/app/pages/DinamicExtraVehicularActivity"


export enum userSelectionOptions {
  ONE, TWO, THREE
}
export function getCurrentPage(userSelection: userSelectionOptions, initialData: []) {
const routes =  {
[userSelectionOptions.ONE]: <MeteoritsLanding initialData={initialData}/>,
[userSelectionOptions.TWO]: <ExtraVehicularActivity/>,
[userSelectionOptions.THREE]: <DinamicExtraVehicularActivity/>
}
return routes[userSelection] 
}