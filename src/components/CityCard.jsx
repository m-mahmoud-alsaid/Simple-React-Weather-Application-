import { useState, useEffect } from 'react'

function CityCard({ cityDetails, handleDelete }) {
    const [cardData, setCardData] = useState();

    useEffect(() => {
        async function fetchWeather() {
            if (!cityDetails.latitude && !cityDetails.longitude) return;

            let latitude = +cityDetails.latitude;
            let longitude = +cityDetails.longitude;

            try {
                let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`)
                let weatherData = await response.json();
                setCardData(weatherData);
                console.log(weatherData);
            } catch (err) {
                console.log(err);
            }
        }

        fetchWeather();
    }, [cityDetails]);

    return (
        cardData && <div className='border border-gray-500 p-5 rounded-lg hover:bg-gray-200 duration-300'>
            <div className='flex justify-between '>
                <div className=''>
                    <p className='font-bold text-xl'>{cityDetails.name}</p>
                    <p className='text-gray-400'>{cityDetails.country}</p>
                </div>
                <button
                    className='text-xl cursor-pointer hover:scale-[1.1] duration-300'
                    onClick={() => handleDelete(cityDetails.id)}>❌</button>
            </div>
            <p className='font-bold text-7xl mt-5'>
                <span className='mr-5'>{cardData.current.temperature_2m}</span>
                <span className=''>{cardData.current_units.temperature_2m}</span>
            </p>
            <p className='text-gray-400 mt-2.5'>

            </p>
            <p className='flex justify-between text-gray-400 mt-2.5'>
                <span>Wind Speed</span>
                <span className=''>
                    <span className='mr-2'>{cardData.current.wind_speed_10m}</span>
                    <span>{cardData.current_units.wind_speed_10m}</span>
                </span>
            </p>
            <p className='flex justify-between text-gray-400 mt-2.5'>
                <span >Last Updated:</span>
                <span>{new Date(cardData.current.time).toLocaleString()}</span>
            </p>
        </div>
    )
}

export default CityCard