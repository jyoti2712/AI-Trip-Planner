import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import Navbar from './components/custom/Navbar.jsx'
import CreateTrip from './pages/CreateTrip.jsx'
import { Toaster } from 'sonner'
import Viewtrip from './viewTrip/[tripId]/index.jsx'
import MyTrips from './pages/MyTrips.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<LandingPage />} />
        <Route path='/create-trip' element={<CreateTrip />} />
        <Route path='/view-trip/:tripId' element={< Viewtrip/>} />
        <Route path='/my-trips' element={<MyTrips/>}/>
      </Routes>
    </>
  )
}

export default App
