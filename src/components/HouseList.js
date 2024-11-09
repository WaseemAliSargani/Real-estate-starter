import React, { useContext } from 'react';

// import context
import { HouseContext } from './HouseContext'
// import components
import House from './House'
// import Link
import { Link } from 'react-router-dom'
// import icons
import { ImSpinner2 } from 'react-icons/im'



const HouseList = () => {
  const { houses, loading } = useContext(HouseContext)

  // if loading is true
  if (loading) {
    return (<ImSpinner2 className='w-full mx-auto text-4xl text-violet-700 animate-spin mt-[200px] ' />)
  }

  if (houses.length < 1) {
    return <div className='text-center text-3xl text-gray-400 mt-48'>  Sorry. nothing found</div>
  }

  return <section className='mb-20'>
    <div className="container mx-auto">
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-14'>
        {houses.map((house, index) => {
          return (
            <Link
              key={index}
              to={`/property/${house.id}`}>
              <House house={house} />
            </Link>
          )
        })}
      </div>
    </div>
  </section>
};

export default HouseList;
