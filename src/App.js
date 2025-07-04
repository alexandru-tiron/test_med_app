// Import necessary modules from React library
import React, { useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'
import Notification from './Components/Notification/Notification';
import GiveReviews from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
// Function component for the main App
function App() {
    // Render the main App component
    return (
        <div className="App">
            {/* Set up BrowserRouter for routing */}
            <BrowserRouter>
                {/* Display the Navbar component */}
                <Notification>
                    {/* Set up the Routes for different pages */}
                    <Routes>
                        <Route path="/" element={<Landing_Page />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<Sign_Up />} />
                        <Route path="/instant-consultation" element={<InstantConsultation />} />
                        <Route path="/reviews" element={<GiveReviews />} />
                        <Route path="/profile" element={<ProfileCard />} />
                        <Route path="/reports" element={<ReportsLayout />} />
                        {/* Define individual Route components for different pages */}
                    </Routes>
                </Notification>

            </BrowserRouter>
        </div>
    );
}
// Export the App component as the default export
export default App;