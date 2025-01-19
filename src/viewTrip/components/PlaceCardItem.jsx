import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    return (
        <div key={place?.placeName}>
            <Link
                to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
                target="_blank"
            >
                <div className="border rounded-xl overflow-hidden hover:scale-105 transition-transform hover:shadow-lg cursor-pointer">
                    <img
                        src= "/placeholder.jpg"
                        alt={place?.placeName || "Place"}
                        className="w-full h-48 object-cover"
                    />
                </div>
            </Link>
        </div>
    );
}

export default PlaceCardItem;
