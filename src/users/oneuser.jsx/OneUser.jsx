import { useLocation } from 'react-router-dom';
import OneUserInfo from './OneUserInfo';
import { useState } from 'react';
import OneUserGold from './OneUserGold';
import OneUserStatus from './OneUserStatus';

const OneUser = () => {
    const location = useLocation();
    const item = location.state?.item;
    const keys = location.state?.key;
    const [value, setValue] = useState(1);

    return (
        <div className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            {/* Sidebar for Tab Navigation */}
            <div className='pt-10 flex md:flex-col w-full md:w-64 bg-gray-900 shadow-lg md:min-h-screen'>
                <div className='flex md:flex-col items-center w-full'>
                    <div className={`w-full h-full p-3 ${value === 1 ? 'border-b-4 md:border-b-0 md:border-r-4 border-yellow-400 bg-gray-800' : 'hover:bg-gray-800'} transition-all duration-300 ease-in-out`}>
                        <button
                            className={`w-full text-left font-semibold ${value === 1 ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                            onClick={() => setValue(1)}>
                            Personal & Bank Info
                        </button>
                    </div>
                    <div className={`w-full h-full p-3 ${value === 2 ? 'border-b-4 md:border-b-0 md:border-r-4 border-yellow-400 bg-gray-800' : 'hover:bg-gray-800'} transition-all duration-300 ease-in-out`}>
                        <button
                            className={`w-full text-left font-semibold ${value === 2 ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                            onClick={() => setValue(2)}>
                            Gold Info
                        </button>
                    </div>
                    <div className={`w-full h-full p-3 ${value === 3 ? 'border-b-4 md:border-b-0 md:border-r-4 border-yellow-400 bg-gray-800' : 'hover:bg-gray-800'} transition-all duration-300 ease-in-out`}>
                        <button
                            className={`w-full text-left font-semibold ${value === 3 ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                            onClick={() => setValue(3)}>
                            Loan Status
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-grow w-full max-w-4xl p-6 rounded-lg shadow-lg mx-auto mt-4 md:mt-0">
                <div className="flex flex-col">
                    {value === 1 && <OneUserInfo item={item} />}
                    {value === 2 && <OneUserGold item={item} />}
                    {value === 3 && <OneUserStatus item={item} keys={keys} />}
                </div>
            </div>

        </div>
    );
};

export default OneUser;
