import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalAPI';

function HotelCard({ hotel }) {
    const [photoURL, setphotoURL] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel]);

    const GetPlacePhoto = async () => {
        const data = { textQuery: hotel?.hotelName };
        const result = await GetPlaceDetails(data).then((resp) => {
            console.log(resp.data.places[0].photos[3].name);
            const PhotoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
            setphotoURL(PhotoURL);
        });
    };

    return (
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName)} ${encodeURIComponent(hotel?.hotelAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="hover:scale-105 transition-all cursor-pointer">
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <img
                            src={photoURL}
                            alt={hotel?.hotelName || 'Hotel'}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h2 className="font-medium">{hotel?.hotelName || 'Unnamed Hotel'}</h2>
                        <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress || 'Unknown Address'}</h2>
                        <h2 className="text-sm">💰 {hotel?.price || 'Price Not Available'}</h2>
                        <h2 className="text-sm">⭐ {hotel?.rating || 'No Rating'} stars</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCard;
