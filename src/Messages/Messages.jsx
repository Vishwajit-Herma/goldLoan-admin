import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { firestoredb } from "../firebase"

function Messages() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        async function fetchData() {
            const path = collection(firestoredb, "contact")
            const snapshot = await getDocs(path)
            let message = []
            snapshot.forEach((doc) => {
                if(doc.id !== 'count'){
                    message.push(doc.data())
                }
            })
            setMessages(message)
        }

        fetchData()
    }, [])

    console.log(messages)
    return (
        <div className="w-full  p-4 bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-yellow-400 my-8">Customer Messages</h1>
            <div className="w-[70%] mx-auto grid grid-cols-1 gap-8">
                {messages.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 bg-gray-800 shadow-lg rounded-lg border border-yellow-500 "
                    >
                        <p className="text-xl font-semibold text-yellow-300">{item.name}</p>
                        <p className="text-sm text-yellow-400">{item.email}</p>
                        <p className="text-gray-200 mt-2">{item.message}</p>
                        <p className="text-sm text-yellow-400 mt-1">Phone: {item.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Messages
