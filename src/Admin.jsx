import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { FaRegMessage } from 'react-icons/fa6';
import UserStatusBarChart from './BarGraph';
import { useNavigate } from 'react-router';
import { auth, firestoredb } from './firebase';
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';


const AdminDashboard = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0)


    useEffect(() => {
        auth.onAuthStateChanged(() => {
            if (!auth.currentUser) {
                navigate('/login');
            }
            else {
                async function fetchData() {
                    const path = doc(firestoredb, "contact", 'count')
                    const snapshot = await getDoc(path)
                    setCount(snapshot.data())
                }

                fetchData()
            }
        });
    }, []);
    console.log(count)

    async function logout() {
        await auth.signOut().then(() => {
            navigate('/login');
        }).catch(() => {
            console.error('Error during sign out:', error);
        });
    }

    async function viewMessage() {
        const path = doc(firestoredb, "contact", 'count')
        await setDoc(path, { count: 0 })
        navigate('/message')
    }

    return (
        <div className='w-full  bg-gradient-to-r from-gray-900 to-gray-800 min-h-screen p-6 '>
            {/* Header Section */}
            <div className='py-8 flex justify-between items-center'>
                <h1 className='text-3xl md:text-4xl font-bold text-yellow-400'>
                    Admin Dashboard Overview
                </h1>
                <div className="relative flex items-center justify-center">
                    <p className='absolute px-[0.30rem] py-[0.20rem]  text-white text-sm font-semibold rounded-full'>
                            {count.count}
                    </p>
                    <FaRegMessage className='text-3xl md:text-4xl text-yellow-400 cursor-pointer hover:text-yellow-300' onClick={viewMessage} />

                </div>
            </div>
            {/* Action Buttons */}
            <div className='pt-8 px-5 md:px-10 w-full flex justify-between items-center'>
                <button className='border-b-4 border-yellow-500 shadow p-3 flex items-center bg-gray-800 text-yellow-300 rounded-lg hover:bg-yellow-500 hover:text-white transition duration-300' onClick={logout}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <span className='mx-3'>Logout</span>
                </button>
                <button className='border-b-4 border-yellow-500 shadow p-3 flex items-center bg-gray-800 text-yellow-300 rounded-lg hover:bg-yellow-500 hover:text-white transition duration-300' onClick={() => navigate('users')}>
                    <span className='mx-3'>Users</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>

            {/* Bar Chart */}
            <div className='w-full my-16'>
                <UserStatusBarChart />
            </div>

        </div>
    );
};

export default AdminDashboard;
