import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../Services/AuthService";
import { fetchUserDevices } from "../Services/UserDevices";
import Header from "./Header";
import Footer from "./Footer";


const UserDeviceDisplay = () => {
    const { authToken } = useAuth();
    const [userDevices, setUserDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authToken) {
            setError("Please log in to view your devices.");
            setIsLoading(false);
            return;
        }
        
        const loadDevices = async () => {
            try {
                const devices = await fetchUserDevices(authToken);
                setUserDevices(devices);
                setError(null);
            } catch (error) {
                setError("Failed to get devices.");
                console.error(error);
            }
            setIsLoading(false);
        };

        loadDevices();
    }, [authToken]);

    // if (authToken === null) return <p>Please log in to view this page.</p>;
    if (isLoading) return <h1>Loading devices...</h1>;
    // if (error) return <p>Error: {error}</p>;

    return (
      <>
        <Header />
        <div>
          <h2>My Devices</h2>
          {userDevices.map((device) => (
            <div key={device.id}>
              <h3>
                <strong>{device.name}</strong>
              </h3>
              <p>Device Type: {device.deviceInfo.model}</p>
              <p>Device Manufacturer: {device.deviceInfo.manufacturer}</p>
              <p>Serial: {device.serial}</p>
              <p>Phone Number: +1{device.assignedNumber.phoneNumber.number}</p>
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
};


export default UserDeviceDisplay;