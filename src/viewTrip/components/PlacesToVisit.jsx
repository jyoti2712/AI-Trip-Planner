import React from 'react';

function PlacesToVisit({ trip }) {
    // Convert itinerary object to an array
    const itinerary = trip?.tripData?.itinerary
        ? Object.values(trip.tripData.itinerary)
        : [];

    console.log("🛠 Itinerary Data:", itinerary); // Debugging: Check data in console

    return (
        <div className="p-5">
            <h2 className="font-bold text-2xl mb-8 text-center">Places to Visit</h2>
            <div>
                {itinerary.length > 0 ? (
                    itinerary.map((item, index) => (
                        <div
                            key={index}
                            className="mb-10 p-6 border border-gray-300 rounded-lg shadow-md"
                        >
                            <h2 className="font-semibold text-xl text-blue-700 mb-4">Day {index + 1}</h2>

                            {Array.isArray(item?.activities) && item.activities.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {item.activities.map((place, placeIndex) => (
                                        <div
                                            key={placeIndex}
                                            className="bg-white p-4 border-l-4 border-orange-500 rounded-lg shadow-sm flex flex-col overflow-hidden"
                                        >
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <p className="text-gray-800 font-semibold mt-2 truncate">{place?.placeName || "Unnamed Place"}</p>
                                                <p className="text-sm text-gray-600 mt-1">{place?.placeDetails || "No details provided."}</p>
                                                <p className="text-sm text-gray-500 mt-1 italic">Travel Time: {place?.travelTime || "Not specified"}</p>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No places available for this day</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No itinerary available</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;
