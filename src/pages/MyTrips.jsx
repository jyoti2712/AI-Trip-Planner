import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import UserTripCardItem from './UserTripCardItem';

function MyTrips() {
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, []);
    
    const navigation = useNavigate();

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }

        const q = query(collection(db, 'TripPlanner'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
            console.log("Document ID:", doc.id);
            trips.push({ id: doc.id, ...doc.data() });
        });

        setUserTrips(trips); // Replace the entire state instead of appending
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl mb-4">My Trips</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {userTrips?.length>0 ? userTrips.map((trip) => (
                    <UserTripCardItem key={`${trip.id}-${trip.someUniqueAttribute || Date.now()}`} trip={trip} />
                ))
            :[1,2,3,4,5,6].map((item,index) => (
                <div key={index} className='h-48 w-full bg-slate-200 animate-pulse rounded-xl'></div>
            ))
            }
            </div>
        </div>
    );
}

export default MyTrips;
