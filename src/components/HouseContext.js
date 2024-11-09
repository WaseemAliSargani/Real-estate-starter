import React, { useState, useEffect, createContext } from 'react';

// import data
import { housesData } from '../data'

// create context
export const HouseContext = createContext()

const HouseContextProvider = ({ children }) => {

  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState('location (any)')
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('property type (any)')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState('price range (any)')
  const [loading, setLoading] = useState(false)

  // return all cuntries
  useEffect(() => {
    const allCountries = houses.map((houses) => {
      return houses.country;
    })
    // remove dublicates
    const uniqueCountries = ['location (any)', ...new Set(allCountries)]
    // set countries state
    setCountries(uniqueCountries)
  }, [])

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((houses) => {
      return houses.type;
    })
    // remove dublicates
    const uniqueProperties = ['location (any)', ...new Set(allProperties)]
    // set properties state
    setProperties(uniqueProperties)
  }, [])

  const handleClick = () => {
    // set loading
    setLoading(true)

    // create a function that checks if the string includes '(any)
    const isDefualt = (str) => {
      return str.split(' ').includes('(any)');
    }
    // get first value of price and parse it to number 
    const minPrice = parseInt(price.split(' ')[0]);
    // get seconde value of price which is hte maximum price & parse it to number 
    const maxPrice = parseInt(price.split(' ')[2])

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // if all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      // if all values are default 
      if (isDefualt(country) && isDefualt(property) && isDefualt(price)) {
        return house;
      }

      // if country is not default 
      if (!isDefualt(country) && isDefualt(property) && isDefualt(price)) {
        return house.country === country;
      }

      // if property is not deffault 
      if (!isDefualt(property) && isDefualt(country) && isDefualt(price)) {
        return house.type === property;
      }

      // if price is not deffault 
      if (!isDefualt(price) && isDefualt(country) && isDefualt(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country & property is not default 
      if (!isDefualt(country) && !isDefualt(property) && isDefualt(price)) {
        return house.country === country && house.type === property;
      }

      // if country and price is not default 
      if (!isDefualt(country) && isDefualt(property) && isDefualt(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // property and price is not default 
      if (!isDefualt(country) && !isDefualt(property) && !isDefualt(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }


    })
    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) :
        setHouses(newHouses),
        setLoading(false)
    }, 1000);

  }


  return <HouseContext.Provider value={{
    country,
    setCountry,
    countries,
    property,
    setProperty,
    properties,
    price,
    setPrice,
    houses,
    loading,
    handleClick,
    loading,
  }}>
    {children}
  </HouseContext.Provider>
};

export default HouseContextProvider;
