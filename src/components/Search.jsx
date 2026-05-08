import { useState } from 'react'

import toast from "react-hot-toast";

function Search({ handleCityDetails, handleCityList }) {
    const [inputValue, setInputValue] = useState('');
    const [searchResultList, setSearchResultList] = useState([]);

    const handleSearch = async (value) => {
        if (!value.trim()) {
            setSearchResultList([]);
            return;
        }
        try {
            let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10&language=en&format=json`);
            let city = await response.json();
            if (!city.results) {
                setSearchResultList([]);
                return;
            }
            setSearchResultList(city.results);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleCity = (result) => {
        handleCityDetails(result);
        handleCityList(prev => {
            if (!Array.isArray(prev)) return;

            const filtered = prev.filter(value => value.id !== result.id);
            return [...filtered, result];
        });
        setSearchResultList([]);
        setInputValue('');
    };

    return (
        <div className='mt-8 flex justify-between'>
            <label className='flex-1 border relative
            border-gray-500 rounded-xl'>
                <input
                    className=' p-2 w-full rounded-xl'
                    type='text'
                    value={inputValue}
                    onChange={(e) => {
                        let value = e.target.value
                        setInputValue(value)
                        handleSearch(value)
                    }}
                    placeholder='Search...' />
                {searchResultList.length > 0 &&
                    <div className='absolute top-full bg-gray-50 border border-black w-full rounded-xl z-10 overflow-hidden'>
                        {searchResultList.map(result => (
                            <div className='text-black pb-2 pl-4 pt-4 
                            duration-300 hover:bg-gray-100 cursor-pointer'
                                key={result.id}
                                onClick={() => { handleCity(result) }}>{result.name}, {result.country}</div>
                        ))}
                    </div>
                }
            </label>
            <button
                className='ml-3 p-2 border border-gray-500 
                font-bold bg-blue-400 rounded-xl text-white w-20 md:w-50'
            >
                Search
            </button>
        </div>
    )
}

export default Search