// import { icons } from "lucide-react";

export const SelectTravelersList = [
    {
        id:1,
        title: "Just me",
        desc: 'A solo travelers in exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id:2,
        title: "A couple",
        desc: 'Two travelers in tandem',
        icon: '🥂',
        people: '2'
    },
    {
        id:3,
        title: "Family",
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 people'
    },
    {
        id:4,
        title: "Friends",
        desc: 'A bunch of thrill-seekers',
        icon: '⛵',
        people: '5 to 10 people'
    }
]

export const SelectBudgetOptions = [
    {
        id:1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵'
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '💸'
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {numberOfDays} Days for {travelers} with a {budget} budget, Give me a Hotels options list with HotelName, HotelAddress, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place name, place details, place image url, Geo Coordinates, ticket Pricing, rating, Time travel each of the locations for {numberOfDays} days, with each day plan with best time to visit in JSON Format'