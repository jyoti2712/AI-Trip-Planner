import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Button } from '../../components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../service/GlobalAPI';

const InfoSection = ({ trip }) => {
    const [photoURL, setphotoURL] = useState();
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = { textQuery: trip?.userSelection?.location?.label };
        const result = await GetPlaceDetails(data).then((resp) => {
            const PhotoURL = PHOTO_REF_URL.replace(
                '{NAME}',
                resp.data.places[0].photos[3].name
            );
            setphotoURL(PhotoURL);
        });
    };

    const handleCopyLink = () => {
        const shareableLink = `${window.location.origin}/trip/${trip?.id || 'example-trip-id'}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000); // Hide toast after 2 seconds
            })
            .catch(() => {
                console.error('Failed to copy link.');
            });
    };

    return (
        <div>
            <img src={photoURL} className="h-[340px] w-full object-cover rounded-xl" alt="Trip" />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip.userSelection?.numberOfDays} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💰 {trip.userSelection?.budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            🧑‍🤝‍🧑 No. of Traveler : {trip.userSelection?.travelers}
                        </h2>
                    </div>
                </div>
                <div className="relative">
                    <Button onClick={handleCopyLink} className="w-10 h-10 flex items-center justify-center">
                        <IoIosSend size={20} />
                    </Button>
                </div>
            </div>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Link copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default InfoSection;
