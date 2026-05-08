import Header from './components/Header'
import Search from './components/Search'
import CityCard from './components/CityCard'

import { Toaster } from "react-hot-toast";

import { useState } from 'react'

function App() {
  const [cityDetails, setCityDetails] = useState({});
  const [cityList, setCityList] = useState([]);

  console.log(cityList);

  let handleDeleteCity = (id) => {
    setCityList(prev => {
      return prev.filter(value => value.id !== id);
    });
  };

  return (
    <div className='p-4 md:p-8'>
      <Toaster />
      <Header />
      <Search handleCityDetails={setCityDetails} handleCityList={setCityList} />
      <div className='wrapper gap-4 mt-8 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(450px,1fr))]'>
        {cityList ? cityList.map(city => <CityCard key={city.id} cityDetails={city} handleDelete={handleDeleteCity} />)
          :
          null}
      </div>
    </div>
  )
}

export default App
