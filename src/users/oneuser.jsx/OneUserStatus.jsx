import { useEffect, useState } from "react";
import { firestoredb } from "../../firebase";
import email from "emailjs-com";
import { doc, getDoc, setDoc } from "firebase/firestore";

function OneUserStatus({ item, keys }) {
    const { loan_info, profile } = item;
    const [pending, setPending] = useState(false)
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)
    const status = loan_info.status.loanStatus
    const [showArea1, setShowArea1] = useState(false)
    const [showArea2, setShowArea2] = useState(false)
    const [approvalstatus, setApprovalStatus] = useState(null)
    const [isApproved, setIsApproved] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [accountData, setAccountData] = useState({})
    const [data, setData] = useState({
        personalInfo: "",
        goldInfo: ""
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }
    console.log(keys)
    useEffect(() => {
        console.log(status)
        if (status == "pending...") {
            setPending(true)
        }
        if (status == "approved...") {
            setApproved(true)
        }
        if (status == "rejected...") {
            setRejected(true)
        }

        async function fetchData() {
            try {
                const docRef = doc(firestoredb, "users", keys)
                const snapShot = await getDoc(docRef);

                const data = snapShot.data()
                const loan_info = data.loan_info;
                const profile = data.profile;
                const gold_info = data.gold_info
                const personal_Info = data.personal_Info
                setCurrentData({ loan_info: loan_info, profile: profile, personal_Info: personal_Info, gold_info: gold_info })
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {

                if (approvalstatus == 'approved') {
                    const docRef = doc(firestoredb, "account", keys);
                    const docsnap = await getDoc(docRef);
                    const data = docsnap.data()
                    setAccountData(data)
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [approvalstatus])


    async function handleConfirm() {
        setApprovalStatus("approved")
        setIsApproved(true)
    }
    function handleCancel(event) {
        const { name } = event.target
        if (name == "cancelpersonalinfo") {
            setShowArea1(!showArea1)
        }
        if (name == "cancelgoldinfo") {
            setShowArea2(!showArea2)
        }
        setApprovalStatus("rejected")
        setIsApproved(false)
    }

    async function sendEmail(data) {

        const template = {
            to_name: data.applicantname,
            to_email: data.email,
            reason: data.rejectionReason || '',
            data: data.loanData || '',
            message: data.message
        };

        email.send("service_6ua5b5v", "template_yojckpw", template, "B8P7nWodrCWRWJC27")
            .then(() => {
                alert("Email is Successfully sent to user");
            })
            .catch((error) => {
                console.error("Error in sending email:", error);
            });
    }


    async function handleVerification() {
        console.log(currentData);
        if (approvalstatus != null) {
            const updatedData = {
                ...currentData,
                loan_info: {
                    ...currentData.loan_info,
                    status: {
                        loanStatus: `${approvalstatus}...`
                    }
                }
            };

            if (approvalstatus == 'approved') {
                const docRef = doc(firestoredb, "account", keys);
                const balance = accountData.Balance
                const totalbalance = balance + Number(updatedData.loan_info.TotalAmountInterest.TotalAmount)
                const updateBalace = { ...accountData, Balance: totalbalance }
                await setDoc(docRef, updateBalace);
                setAccountData(updateBalace)
            }
            const Path = doc(firestoredb, "users", keys);

            let collection1 = {
                "loan_info": { ...updatedData.loan_info, emiNo: 0, paidEmi: 0, remainEmi: Number(updatedData.loan_info.TotalAmountInterest.TotalAmount) + Number(updatedData.loan_info.TotalAmountInterest?.TotalInterest), lastEmiDate: new Date() }
            }
            let collection2 = {
                "profile": { ...updatedData.profile, LoanAmount: updatedData.loan_info.TotalAmountInterest.TotalAmount }
            }
            let collection3 = {
                "gold_info": updatedData.gold_info
            }

            try {
                await setDoc(Path, collection1, { merge: true });
                await setDoc(Path, collection2, { merge: true });
                await setDoc(Path, collection3, { merge: true });

                alert("Done...");
            } catch (error) {
                console.log('Error updating user:', error);
            }

            // Sending the email
            const message = isApproved
                ? "We are pleased to inform you that your loan application has been approved."
                : "After careful consideration, your loan application has not been approved.";

            const emailData = {
                applicantname: updatedData.profile.fullname,
                email: updatedData.profile.email,
                rejectionReason: isApproved ? '' : "Rejection Reason: " + ([data.personalInfo, data.goldInfo].filter(Boolean).join('\n')),
                loanData: isApproved
                    ? [
                        `loanAmount: ${updatedData.loan_info.TotalAmountInterest.TotalAmount}`,
                        `interestRate: ${updatedData.loan_info.TotalAmountInterest.TotalInterest}`,
                        `Repayment Schedule: 30 Days`,
                    ].join('\n')
                    : '',
                message: message,
            };

            await sendEmail(emailData);
        }
    }


    return (
        <>
            {pending && (
                <div className="relative flex items-center justify-center w-full min-h-screen">
                    <div className="w-[60%] bg-white rounded-lg shadow-lg p-6 text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <h1 className="text-2xl font-bold mb-4 text-center">User Verification</h1>
                        <p className="text-lg mb-4 text-justify">
                            Hey, this is the user <strong>{profile.fullname}</strong>, and their current status is <strong>Pending</strong>.
                            We need your assistance in verifying the accuracy of the information provided. Below, you'll find checkboxes
                            corresponding to the user's gold information and personal information. Please review each section carefully:
                        </p>
                        <ul className="list-disc list-inside mb-4 text-justify">
                            <li>If the <strong>Gold Information</strong> is correct, check the box labeled "Gold Info is Correct."</li>
                            <li>If the <strong>User Information</strong> is accurate, check the box labeled "User Info is Correct."</li>
                        </ul>
                        <p className="text-lg mb-4 text-justify">
                            Once you've made your selections, you'll see a checkmark (<span className="text-green-500">✔️</span>)
                            indicating that the information is correct. If not, a cross (<span className="text-red-500">❌</span>) will
                            be displayed, allowing you to double-check your inputs.
                        </p>

                        <div className="space-y-8">
                            {/* Personal Info Confirmation */}
                            <div className="space-y-3">
                                <p className="font-semibold">Is all Personal Information correct?</p>
                                <div className="space-x-2">
                                    <button className="bg-gray-100 px-6 py-2 rounded focus:ring-2" onClick={handleConfirm}>✔️</button>
                                    <button className="bg-gray-100 px-6 py-2 rounded focus:ring-2" name="cancelpersonalinfo" onClick={(e) => handleCancel(e)}>❌</button>
                                </div>
                                {showArea1 && (
                                    <textarea
                                        onChange={(e) => handleChange(e)}
                                        name="personalInfo"
                                        cols={50}
                                        rows={5}
                                        className="border pl-2 pt-2 w-full rounded"
                                        placeholder="What is the mistake?"
                                    />
                                )}
                            </div>

                            {/* Gold Info Confirmation */}
                            <div className="space-y-3">
                                <p className="font-semibold">Is all Gold Information correct?</p>
                                <div className="space-x-2">
                                    <button className="bg-gray-100 px-6 py-2 rounded focus:ring-2" onClick={handleConfirm}>✔️</button>
                                    <button className="bg-gray-100 px-6 py-2 rounded focus:ring-2" name="cancelgoldinfo" onClick={(e) => handleCancel(e)}>❌</button>
                                </div>
                                {showArea2 && (
                                    <textarea
                                        onChange={(e) => handleChange(e)}
                                        name="goldInfo"
                                        cols={50}
                                        rows={5}
                                        className="border pl-2 pt-2 w-full rounded"
                                        placeholder="What is the mistake?"
                                    />
                                )}
                            </div>
                        </div>
                        <button className="bg-green-500 text-white px-6 py-3 rounded-md text-lg mt-6 w-full" onClick={handleVerification}>Complete Verification</button>
                    </div>
                </div>
            )}

            {approved && (
                <div className="w-full flex justify-center items-center min-h-screen bg-gray-200">
                    <div className="bg-white w-full md:w-1/2 p-6 rounded-lg shadow-lg space-y-6">
                        {/* Loan Details Heading */}
                        <h2 className="text-2xl font-bold text-gray-800 text-center">Loan Details</h2>

                        {/* Loan Amount */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                Loan Amount:
                                <span className="text-yellow-500 ml-2">₹ {currentData.loan_info?.TotalAmountInterest?.TotalAmount}</span>
                            </p>
                        </div>

                        {/* Repayment Period */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                Repayment In:
                                <span className="text-gray-700 ml-2">30 Days</span>
                            </p>
                        </div>

                        {/* Total Interest */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                Total Interest:
                                <span className="text-yellow-500 ml-2">₹ {currentData.loan_info?.TotalAmountInterest?.TotalInterest}</span>
                            </p>
                        </div>

                        {/* EMI's Paid */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                EMI's Paid:
                                <span className="text-gray-700 ml-2">{currentData.loan_info?.emiNo || 0}</span>
                            </p>
                        </div>

                        {/* Paid Amount */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                Paid Amount (inc. interest):
                                <span className="text-yellow-500 ml-2">₹ {currentData.loan_info?.paidEmi}</span>
                            </p>
                        </div>

                        {/* Remaining Amount */}
                        <div className="bg-gray-50 p-4 border border-gray-200 rounded-md shadow-sm">
                            <p className="text-lg font-semibold text-gray-900">
                                Remaining Amount (inc. interest):
                                <span className="text-yellow-500 ml-2">₹ {currentData.loan_info?.remainEmi}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {rejected && (
                <div className="w-full mx-auto flex justify-center items-center min-h-screen bg-red-50">
                    <div className="bg-white border border-red-400 text-red-700 w-full md:w-1/2 p-6 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold mb-4 text-center text-red-700">Verification Rejected</h1>
                        <p className="text-lg mb-4 text-justify">
                            Unfortunately, the verification process for <strong>{profile.fullname}</strong> has been rejected. It seems that some
                            information provided does not meet the necessary requirements or is incorrect. Please review the details
                            and make the necessary updates to ensure accuracy.
                        </p>
                        <ul className="list-disc list-inside mb-4 text-justify">
                            <li><strong>Gold Information:</strong> Check if all gold-related details are accurate and up-to-date.</li>
                            <li><strong>User Information:</strong> Verify the user's personal information, such as address, contact details, and identification.</li>
                        </ul>
                        <p className="text-lg mb-4 text-justify">
                            Once the information is corrected, you may resubmit it for verification. If you have any questions, please contact support for assistance.
                        </p>

                    </div>
                </div>
            )}

        </>

    )
}
export default OneUserStatus