import MeteoritsLanding from "@/app/pages/MeteoritsLanding/MeteoritsLanding"
import ExtraVehicularActivity from "@/app/pages/ExtraVehicularActivity"


export enum userSelectionOptions {
  ONE, TWO
}
export function getCurrentPage(userSelection: userSelectionOptions, initialData: []) {
const routes =  {
[userSelectionOptions.ONE]: <MeteoritsLanding initialData={initialData}/>,
[userSelectionOptions.TWO]: <ExtraVehicularActivity/>
}
return routes[userSelection] 
}