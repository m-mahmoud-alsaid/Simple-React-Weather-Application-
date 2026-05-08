function Header() {
    return (
        <div className='flex flex-col md:flex-row md:justify-between'>
            <div className='flex'>
                <div className='text-3xl mr-2.5 cursor-pointer'>⛅</div>
                <div className=''>
                    <h1 className='font-bold text-2xl cursor-pointer'>Weather Dashboard</h1>
                    <h3 className='text-gray-500 cursor-pointer'>Real-time weather updates every 15 seconds</h3>
                </div>
            </div>
            <div className='mt-4 ml-auto md:ml-0 md:mt-0 font-bold text-xl w-fit
            bg-gray-100 p-2 rounded-3xl cursor-pointer'>🔴 Live</div>
        </div>
    )
}

export default Header