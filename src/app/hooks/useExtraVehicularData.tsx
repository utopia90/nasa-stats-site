'use client'
import { useState, useEffect } from 'react';

export interface VehicularDataI {
  eva: string
  country: string
  crew: string
  vehicle: string
  date: string
  duration: string
  purpose: string
}
export enum Country {
  USA = 'USA',
  RUSSIA = 'Russia',
  BOTH = 'Both'

}
export enum SortEnum {
  DESC = 'desc', 
  ASC = 'asc'
}
export interface MissionsDuration {
  sort: SortEnum,
  limit: number
}
const useExtraVehicularData = (country: Country, yearRange: { min: number, max: number }, missionsByDuration?: MissionsDuration) => {
  
  
  const [yearsData, setYearsData] = useState<number[]>([]);
  const [missionsByDurationData, setMissionsByDurationData] = useState<VehicularDataI[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const BASE_URL = 'https://data.nasa.gov/resource/9kcy-zwvn.json'

  async function getMissionsByDuration(){
    const urlWithParams = country === Country.BOTH ? `${BASE_URL}?$where=date>='${yearRange.min}-01-01T00:00:00.000' AND date<='${yearRange.max}-12-31T23:59:59.999'&$order=duration ${missionsByDuration?.sort}&$limit=${missionsByDuration?.limit}` : `${BASE_URL}?$where=country='${country}' AND date>='${yearRange.min}-01-01T00:00:00.000' AND date<='${yearRange.max}-12-31T23:59:59.999'&$order=duration ${missionsByDuration?.sort}&$limit=${missionsByDuration?.limit}`;

   
   try {
    const response = await fetch(urlWithParams);
    const jsonData = await response.json();
     return jsonData
  } catch (error) {
    setError(error as string);
  } finally {
    setLoading(false);
  }

  }
  async function getResultsPerYearAndCountry(year: number) {
    const urlWithParams = country === Country.BOTH?  `${BASE_URL}?$where=date>='${yearRange.min}-01-01T00:00:00.000' AND date<='${yearRange.max}-12-31T23:59:59.999'&$select=count(*)` : `${BASE_URL}?$where=date>='${year}-01-01T00:00:00.000' AND date<='${year}-12-31T23:59:59.999'&country=${country}&$select=count(*)` 

    try {
      const response = await fetch(urlWithParams);
      const jsonData = await response.json();
       return jsonData[0].count
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let years: number[] = []
        for (let i = yearRange.min; i <= yearRange.max; i++) {
          const yearCount = await getResultsPerYearAndCountry(i)
          years.push(yearCount)
        }

        Promise.all(years).then((data) => setYearsData(data))
      
        if(missionsByDuration){
            const missions = await getMissionsByDuration()
            setMissionsByDurationData(missions)
          }
  
        }
    
    fetchData();

  });
  return { yearsData, missionsByDurationData, loading, error };
  
};

export default useExtraVehicularData;