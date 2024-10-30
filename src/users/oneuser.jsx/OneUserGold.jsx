function OneUserGold({ item }) {
    const { loan_info } = item;

    return (
        <>
            {Object.keys(loan_info.ornaments).map((key) => {
                const ornament = loan_info.ornaments[key];
                return (
                    <div
                        key={key}
                        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-lg rounded-lg p-6 m-4 border border-yellow-500 flex flex-col lg:flex-row items-center lg:items-center space-y-4 lg:space-y-0 lg:space-x-6"
                    >
                        <div className="flex-shrink-0">
                            <img
                                src={ornament.image}
                                alt={ornament.name}
                                className="w-40 h-40 sm:w-60 sm:h-60 object-cover rounded-md border-4 border-yellow-400 shadow-md"
                            />
                        </div>
                        <div className="text-center lg:text-left flex-grow">
                            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                                Ornament Name: {ornament.ornamentName[0].toUpperCase() + ornament.ornamentName.slice(1)}
                            </h2>
                            <div className="space-y-2 text-sm sm:text-base">
                                <p><span className="font-semibold text-yellow-300">Carats:</span> {ornament.carats}</p>
                                <p><span className="font-semibold text-yellow-300">Gold Price:</span> ₹ {ornament.goldPrice}</p>
                                <p><span className="font-semibold text-yellow-300">Carat Price:</span> ₹ {ornament.caratPrice}</p>
                                <p><span className="font-semibold text-yellow-300">Weight:</span> {ornament.weight} gm</p>
                                <p><span className="font-semibold text-yellow-300">Price as Per Carats:</span> ₹ {ornament.weightplusCarat}</p>
                                <p><span className="font-semibold text-yellow-300">Eligible Amount:</span> ₹ {ornament.eligibleAmount}</p>
                                <p><span className="font-semibold text-yellow-300">Payable Interest:</span> ₹ {ornament.interest}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default OneUserGold;
