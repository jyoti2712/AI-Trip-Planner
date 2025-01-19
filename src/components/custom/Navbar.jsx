import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button.jsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { FcGoogle } from "react-icons/fc";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [OpenDialog, setOpenDialog] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Track toggle menu state
  const [popoverOpen, setPopoverOpen] = useState(false); // Track popover state
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

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
      window.location.reload();
    });
  };

  useEffect(() => {
    console.log(user);
  }, []);

  const handlePopoverToggle = () => {
    setPopoverOpen(!popoverOpen); // Toggle popover visibility on large screens
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <Link to="/" className='flex items-center'>
        <img src="/logo.svg" alt="Logo" className='h-8 w-8 mr-2' />
        <span className='text-xl font-bold'>Trip Planner</span>
      </Link>

      <div className="flex items-center gap-3">

        {/* For Large Screens */}
        {user ? (
          <>
            <div className="hidden lg:flex gap-3">
              <Button
                variant="outline"
                className="rounded-full text-sm sm:text-base py-2 px-4 sm:px-6"
                onClick={() => { navigate("/create-trip") }}
              >
                Create Trip
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-sm sm:text-base py-2 px-4 sm:px-6"
                onClick={() => { navigate("/my-trips") }}
              >
                My Trips
              </Button>
            </div>

            {/* Popover for Profile and Logout (visible on larger screens) */}
            <div className="hidden lg:block">
              <Popover open={popoverOpen} onOpenChange={handlePopoverToggle}>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full cursor-pointer'
                    alt="User Profile"
                    onClick={handlePopoverToggle} // Toggle popover on click
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col items-start space-y-2">
                    {/* <Link to="/create-trip">
                      <button className="text-sm text-gray-700 hover:bg-gray-100 w-full py-2 px-3 rounded-md">
                        Create Trip
                      </button>
                    </Link>
                    <Link to="/my-trips">
                      <button className="text-sm text-gray-700 hover:bg-gray-100 w-full py-2 px-3 rounded-md">
                        My Trips
                      </button>
                    </Link> */}
                    <Button
                      onClick={() => {
                        googleLogout();
                        localStorage.clear();
                        navigate("/");
                        window.location.reload();
                      }}
                      className="text-sm text-white hover:bg-red-100 w-full py-2 px-3 rounded-md hover:text-red-700"
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </>
        ) : (
          <Button
            onClick={() => { setOpenDialog(true) }}
            className="text-sm sm:text-base py-2 px-4 sm:px-6"
          >
            Sign in
          </Button>
        )}

        {/* Hamburger Menu for Small Screens */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-full text-xl"
        >
          <BsThreeDots />
        </button>

        {/* Custom dropdown for profile and logout (visible on small screens) */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-3 lg:hidden">
            <div className="flex flex-col items-start space-y-2">
              <Link to="/create-trip">
                <button className="text-sm text-gray-700 hover:bg-gray-100 w-full py-2 px-3 rounded-md">
                  Create Trip
                </button>
              </Link>
              <Link to="/my-trips">
                <button className="text-sm text-gray-700 hover:bg-gray-100 w-full py-2 px-3 rounded-md">
                  My Trips
                </button>
              </Link>
              <button
                onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
                className="text-sm text-red-500 hover:bg-red-100 w-full py-2 px-3 rounded-md hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dialog for Google Sign In */}
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Navbar;