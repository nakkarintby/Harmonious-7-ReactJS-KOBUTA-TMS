import { AuthenticatedTemplate } from '@azure/msal-react'
import React from 'react'

type Props = {}

const Home2 = (props: Props) => {

  async function  handleOpen  () {
    const res = await fetch(`https://localhost:7141/WeatherForecast`);
    console.log(res.json());
  };

  return (
    <button  onClick={handleOpen}>Home2</button>
  )
}

export default Home2