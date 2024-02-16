'use client'

import { IsAuthenticationTemplate } from "../api/MSAuthentication/AuthClientHandle"
import MenuTheme from "../props/MenuThemeProps/MenuTheme"
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme"
import TopToolbar from "./props/Toolbar"
import "./props/Home.css"
import { Autocomplete, Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { CallHttp2 } from "../api/ApiCallPlateform"
import { OrderForm } from "../constant/OrderForm/OrderForm"


async function LicenseHandleSubmit (license:string) {
  var request = await fetch("https://d736apsi01-wa02skc.azurewebsites.net/Order/GetShipmentbyLicense",
  {method:"POST", body:JSON.stringify({license:license}), headers:{"Content-Type":"application/json"}}
  )
  var response = await request.json()
  if(response["data"]["shipmentGroup"] === null) {
    return "Not Found"
  }
  return response["data"]
}

function SendDataToDetailPage(license:string, shipingGroup:string, shipingTo:string) {
  localStorage.setItem("DetailSearch",
  JSON.stringify({license:license, shipingGroup:shipingGroup, shipingTo:shipingTo}))
}

export default function ShipmentSearch() {
  let [licenseFeild, setLicenseFeild] = React.useState<string>("")
  let [shipingGroupField, setShippingGroup] = React.useState<string>("")
  let [shipingToList, setShipingToList] = React.useState<string[]>([])
  let [shipingToCurrField, setShipingToCurr] = React.useState<string>("")
  //useState For valid
  let [isLicenseValid, setIsLicenseValid] = React.useState<boolean>(false)
  let [isSG_Vaild, setIsSG_Valid] = React.useState<boolean>(false)
  let [isST_Vaild, setIsST_Valid] = React.useState<boolean>(false)
  //////////////////
    const router = useRouter()
    useEffect(()=>{
      const fetchData = async () => {
        
      }
      fetchData()
    })
    return (
<>
<IsAuthenticationTemplate>
    <MenuTheme>
    <div>
        <div className="NavBoxGlobal">
            <NavbarMenuTheme CanPreviousBack={true}/>
        </div>
        <div className="Shipment-search-spacebox"/>
        <div className="Shipment-search-maincontent">
            <div className="Shipment-searchbox">
                <h2>Search</h2>
                <div className="Autocomplete-shipment">
                  <TextField label="License" style={{minWidth:300}} 
                  onChange={(event)=>{
                    setLicenseFeild(event.target.value)
                    if(shipingGroupField !== "") {
                      setShippingGroup("")
                    }
                    if(shipingToCurrField !== "") {
                      setShipingToCurr("")
                    }
                    }
                  }
                  error={isLicenseValid}
                  onKeyDown={async (ev)=>{
                    if(ev.key === "Enter") {
                      var result = await LicenseHandleSubmit(licenseFeild)
                      if(result === "Not Found") {
                        alert("License Not Found")
                        setIsLicenseValid(true)
                        return
                      }
                      setIsLicenseValid(false)
                      setShippingGroup(result["shipmentGroup"][0])
                      setShipingToCurr(result["shipToList"][0])
                      setShipingToList(result["shipToList"])
                    }
                  }}/>
                </div>
                <div className="Autocomplete-shipment">
                  <TextField error={isSG_Vaild} style={{minWidth:300, fontSize:20}} value={shipingGroupField} placeholder="Shiping Group" />
                </div>
                <div className="Autocomplete-shipment">
                    {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    onChange={(events, newValue)=>{
                      console.log(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label="Ship To"/>}
                    /> */}
                    <Select
                      error={isST_Vaild}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Age"
                      style={{minWidth: 300}}
                      value={shipingToCurrField}
                      onChange={(event: SelectChangeEvent)=>{
                        setShipingToCurr(event.target.value)
                      }}
                  >
                      {shipingToList.map((key, index)=>{
                          return(<MenuItem key={index} value={key}>{key}</MenuItem>)
                      })}
                    </Select>
                </div>
                <div className="shipment-search-spacebutton">
                    <Button variant="outlined" onClick={async()=>{
                      if(licenseFeild === null || licenseFeild === "") {
                        setIsLicenseValid(true)
                        return
                      }
                      if(shipingGroupField === null || shipingGroupField ==="") {
                        setIsSG_Valid(true)
                        return
                      }
                      if(shipingToCurrField === null || shipingToCurrField === "") {
                        setIsST_Valid(true)
                        return
                      }
                      SendDataToDetailPage(licenseFeild, shipingGroupField, shipingToCurrField)
                      router.push("/ShipmentStatusUpdate/ShipmentDetail")
                    }}>Search</Button>
                </div>
            </div>
        </div>
    </div>
    </MenuTheme>
</IsAuthenticationTemplate>
</>
)
}

const TestDataList = 
[
  { Jabare:"TEST1", orade:"001"},
  { Jabare:"TEST2", orade:"002"},
  { Jabare:"TEST3", orade:"003"}
]

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];