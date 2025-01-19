
import React, { useEffect, useState } from 'react';
// import { GetPlaceDetails } from '../../service/GlobalAPI';
// import { PHOTO_REF_URL } from './InfoSection';
// import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalAPI';
import HotelCard from './HotelCard.jsx';

function Hotels({ trip }) {
    
    return (
        <div>
            <div className='font-bold text-xl mt-5 mb-5'>Hotel Recommendation</div>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <HotelCard hotel = {hotel} />
                ))}
            </div>
        </div>
    );
}

export default Hotels;
