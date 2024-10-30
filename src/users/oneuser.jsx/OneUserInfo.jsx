import { faAddressBook, faAddressCard, faBank, faBriefcaseClock, faBusinessTime, faCalendar, faChain, faCode, faListNumeric, faMoneyBill, faNoteSticky, faPhone, faPhoneFlip, faSignature, faSortAmountUp, faTimeline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OneUserInfo({ item }) {
    const { profile, personal_Info } = item;

    if (!item) {
        return <p className="text-center text-red-500 font-semibold">No data available</p>;
    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen py-6 ">
            <div className="flex flex-col w-full max-w-[90%] lg:max-w-[80%] rounded-lg space-y-8 text-white">
                
                {/* Personal Info Section */}
                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 shadow-lg border border-yellow-500">
                    <h2 className="text-3xl font-semibold text-yellow-400 border-b border-yellow-400 pb-4">Personal Info</h2>
                    <div className="space-y-4 mt-4">
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faNoteSticky} /> Full Name
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{profile?.fullname || 'No Name Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faPhone} /> Phone
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">+91 {profile?.phone || 'No Phone Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faCalendar} /> Age
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.age || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faBusinessTime} /> Occupation
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.occupation || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faAddressBook} /> Present Address
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.presentaddress || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faAddressCard} /> Permanent Address
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.permanentaddress || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faChain} /> Purpose
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.purpose || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faSignature} /> Signature
                            </p>
                            <img
                                src={personal_Info?.signature}
                                alt="Signature"
                                className="w-1/3 h-auto mt-4 max-w-md rounded-lg border border-yellow-400 shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Bank Info Section */}
                <div className="bg-gray-900 bg-opacity-60 rounded-lg p-6 shadow-lg border border-yellow-500">
                    <h2 className="text-3xl font-semibold text-yellow-400 border-b border-yellow-400 pb-4">Bank Info</h2>
                    <div className="space-y-4 mt-4">
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faListNumeric} /> Account Number
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.accountnumber || 'No Account Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faCode} /> IFSC
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.ifsc || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faMoneyBill} /> Loan Amount
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.loanamount || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faTimeline} /> Loan Period
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.loanperiod || 'Not Available'}</div>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-yellow-300">
                                <FontAwesomeIcon icon={faBank} /> Bank
                            </p>
                            <div className="text-base font-medium text-white bg-gray-800 p-3 mt-2 rounded-lg">{personal_Info?.bank || 'Not Available'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OneUserInfo;
