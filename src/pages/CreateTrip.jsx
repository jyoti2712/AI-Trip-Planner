import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { SelectBudgetOptions, SelectTravelersList } from '../constants/options';
import { Button } from '../components/ui/button.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AI_PROMPT } from '../constants/options';
import { chatSession } from '../service/AIModal.jsx';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig.jsx';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState();
    const [OpenDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const onGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.numberOfDays > 5 || formData?.numberOfDays < 0) {
            toast.error('Please add days from 1 to 5');
            return;
        }
        if (!formData?.location || !formData?.budget || !formData?.travelers) {
            toast("Please fill all the details");
            return;
        }
        // console.log(formData);
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location?.label)
            .replace('{numberOfDays}', formData?.numberOfDays)
            .replace('{travelers}', formData?.travelers)
            .replace('{budget}', formData?.budget)
            .replace('{numberOfDays}', formData?.numberOfDays);

        console.log(FINAL_PROMPT);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        console.log("--", result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());
    };

    const SaveAiTrip = async (tripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        await setDoc(doc(db, "TripPlanner", docId), {
            userSelection: formData,
            tripData: JSON.parse(tripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            onGenerateTrip();
        });
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v); }
                        }}
                    />
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
                    <Input placeholder={"Ex.3"} type="number"
                        onChange={(e) => handleInputChange('numberOfDays', e.target.value)} />
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelersList.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('travelers', item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.travelers == item.people && 'shadow-lg border-black'}`}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button disabled={loading} onClick={onGenerateTrip}>{loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip!'}</Button>
                <ToastContainer />
            </div>

            {/* Dialog for Sign-in */}
            <Dialog open={OpenDialog} onOpenChange={(isOpen) => setOpenDialog(isOpen)}>
                <DialogContent>
                    <DialogHeader className="relative">
                        <DialogDescription>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className="font-bold text-lg mt-2">Sign in with Google</h2>
                            <p>Sign in to the App with Google Authentication Securely</p>
                            <Button onClick={login} className="w-full mt-2">
                                <FcGoogle />
                                Sign in
                            </Button>
                        </DialogDescription>
                        {/* Close Icon */}
                        {/* <IoMdClose
                            onClick={() => setOpenDialog(false)}
                            // className="absolute top-2 right-2 cursor-pointer text-gray-500"
                            // size={24}
                        /> */}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;
