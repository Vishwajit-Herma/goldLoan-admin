import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faUserCircle, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { firestoredb } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function getStatusColor(status) {
  switch (status) {
    case 'pending...':
      return 'bg-yellow-50 text-yellow-600';
    case 'rejected...':
      return 'bg-red-50 text-red-600';
    case 'approved...':
      return 'bg-green-50 text-green-600';
    default:
      return 'bg-gray-50 text-gray-600';
  }
}

function Users() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keys, setKeys] = useState([]);
  const [exist, setExist] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = collection(firestoredb, "users"); 
        const snapShot = await getDocs(docRef);
  
        const dataArray = [];
        const keyArray = [];
  
        snapShot.forEach((doc) => {
          dataArray.push(doc.data());
          keyArray.push(doc.id);
        });
  
        setData(dataArray);
        setKeys(keyArray);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
 
  return (
    <div className="w-full  p-4 relative min-h-screen bg-gradient-to-l from-gray-900 to-gray-800 ">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="200"
            height="200"
            style={{
              display: 'block',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <style>
              {`
                @keyframes rotateRing {
                  0%, 100% { transform: rotate(0deg) translateX(0); }
                  50% { transform: rotate(180deg) translateX(-15px); }
                }
                @keyframes rotateBangle {
                  0%, 100% { transform: rotate(0deg) translateX(0); }
                  50% { transform: rotate(-180deg) translateX(15px); }
                }
                .jewelry {
                  filter: url(#glow);
                }
                #ring {
                  animation: rotateRing 4s ease-in-out infinite;
                  transform-origin: center;
                }
                #bangle {
                  animation: rotateBangle 4s ease-in-out infinite;
                  transform-origin: center;
                }
              `}
            </style>

            <g id="ring" className="jewelry">
              <circle cx="50" cy="50" r="20" fill="none" stroke="url(#goldGradient)" strokeWidth="4" />
              <circle cx="50" cy="35" r="5" fill="url(#goldGradient)" />
            </g>

            <g id="bangle" className="jewelry">
              <circle cx="50" cy="50" r="25" fill="none" stroke="url(#goldGradient)" strokeWidth="6" />
            </g>
          </svg>
        </div>
      )}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}
      {!loading && (
        <ul className="space-y-4 w-[75%] mx-auto mt-10">
          {exist ? (
            <li className="w-full min-h-screen font-bold flex justify-center items-center text-6xl text-yellow-500">
              No Pending Users Found...
            </li>
          ) : (
            data.map((item, index) => {
              if(item.loan_info?.hasOwnProperty('status')) {

                const loanStatus = item?.loan_info?.status?.loanStatus;
                const statusColor = getStatusColor(loanStatus?.toLowerCase());
    
                return (
                  <li
                    key={keys[index]}
                    className={`flex items-center justify-between p-4 shadow-lg rounded-lg border border-yellow-500 transition ease-in-out duration-300 ${statusColor}`}
                  >
                    <div className="flex items-center space-x-4">
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        size="3x"
                        className="text-yellow-400"
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-lg font-semibold text-yellow-300">
                          {item.personal_Info?.name || 'N/A'}
                        </span>
                        <span className="text-sm text-yellow-500">
                          Loan Status: {loanStatus || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        navigate(`/users/${keys[index]}`, { state: { item, key: keys[index] } })
                      }
                    >
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        size="1x"
                        className="text-yellow-400 hover:text-yellow-300 transition ease-in-out duration-200"
                      />
                    </button>
                  </li>
                );
              }
              return null;
            })
          )}
        </ul>
      )}
    </div>
  );
}

export default Users;
