import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
    const [photoURL, setphotoURL] = useState();

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = { textQuery: trip?.userSelection?.location?.label };
        const result = await GetPlaceDetails(data).then((resp) => {
            console.log(resp.data.places[0].photos[3].name);
            const PhotoURL = PHOTO_REF_URL.replace(
                '{NAME}',
                resp.data.places[0].photos[3].name
            );
            setphotoURL(PhotoURL);
        });
    };

    return (
        <Link to={"/view-trip/" + trip?.id}>
            <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden mb-4 hover:scale-105 transition-all hover:shadow-md w-full max-w-xs">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <img
                        src={photoURL}
                        alt={trip?.userSelection?.location?.label}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4">
                    <h2 className="font-bold text-lg truncate">{trip?.userSelection?.location?.label}</h2>
                    <h2 className="text-sm text-gray-500">
                        {trip?.userSelection?.numberOfDays} Days trip with {trip?.userSelection?.budget} Budget
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;
