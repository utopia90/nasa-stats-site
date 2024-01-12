export async function getData() {
    const res = await fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
 
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

