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
export enum Country  {
USA = 'USA',
RUSSIA = 'Russia',
BOTH  = 'Both'

}
const useExtraVehicularData = (country?: Country,  yearRange?: {min: number, max: number}, sortByDurationAsc?: boolean, sortByDurationDesc?: boolean) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = 'https://data.nasa.gov/resource/9kcy-zwvn.json'
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        const isRussiaOrUsa = country == Country.RUSSIA || country == Country.USA 
        const filterDataByCountryAndYearRange =  yearRange && jsonData.filter((data:  VehicularDataI) => isRussiaOrUsa ? data?.country == country && new Date(data?.date).getFullYear() >= yearRange?.min :  new Date(data?.date).getFullYear() <= yearRange?.max  )
        const data = filterDataByCountryAndYearRange || jsonData
        const finalData = sortByDurationAsc ? data.sort((a: VehicularDataI, b: VehicularDataI) => Number(a?.duration) - Number(b.duration)) : sortByDurationDesc ? data.sort((a: VehicularDataI, b: VehicularDataI) => Number(b?.duration) - Number(a.duration)) : data
       
        setData(finalData)
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  });
  return { data, loading, error };
};

export default useExtraVehicularData;