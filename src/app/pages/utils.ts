export  function getTotalMeteoritCountInYearsRange(yearRange: { min: number, max: number }) {

  async function getYearCount(year: number) {
    const apiUrl = `https://data.nasa.gov/resource/gh4g-9sfh.json?$select=count(*)&$where=year='${year}-01-01T00:00:00.000'`;

    const res = await fetch(apiUrl)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await res.json()
    const count = data[0]?.count

    return Number(count)
  }
  let promises = []

  for (let i = yearRange.min; i <= yearRange.max; i++) {
    const yearCount = getYearCount(i)
    promises.push(yearCount)
  }
  let data: number[] = Promise.all(promises).then((promise) => promise) as unknown as number[]

  return data


}



