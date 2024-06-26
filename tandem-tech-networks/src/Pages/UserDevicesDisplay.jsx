import { useState, useEffect } from "react";
import { useAuth } from "../Services/useAuth";
import { fetchUserDevices } from "../Services/UserDevices";
import { useNavigate } from "react-router-dom";
import reassignNumberButton from "../Services/ReassignNumberButton";
import DeleteDeviceButton from "../Services/DeleteDeviceButton";
import Header from "./Header";
import "../modules/userDevices.css";


const UserDeviceDisplay = () => {
  const { authToken } = useAuth();
  const [userDevices, setUserDevices] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      setError("Please log in to view your devices.");
      setIsLoading(false);
      navigate("/login");
      return;
    }

    const loadDevices = async () => {
      try {
        const devices = await fetchUserDevices(authToken);
        setUserDevices(devices);
        setError(null);
        if (devices.length === 0) setError("No devices found. Please add a device.");
        
      } catch (error) {
        setError("Failed to get devices.");
        console.error(error);
      }
      setIsLoading(false);
    };

    loadDevices();
  }, [authToken, navigate]);

  const handleReassignNumber = async (currentDeviceId, newNumber) => {
    
    try {
      await reassignNumberButton(currentDeviceId, newNumber, authToken);
      alert("Number reassigned successfully.");
      // I'm refreshing the device list
      const refreshDevices = await fetchUserDevices(authToken);
      setUserDevices(refreshDevices);
    } catch (error) {
      console.error(`Failed to reassign number: ${error}`);
      alert("Failed to reassign number.");
    }
  };

  if (userDevices.length === 0) return (
    <>
      <Header />
      <h3 className="d-flex justify-content-center">No devices found. Please add a device.</h3>
    </>
  );
  if (isLoading) return <h3>Loading devices...</h3>;
  if (error) return (
    <>
      <Header />
      <p>Error: {error}</p>
    </>
  );

  return (
    <>
      <Header />
      <h2 className="d-flex justify-content-center">My Devices</h2>
      <div className="device-container">
        {userDevices.map((device) => (
          <div key={device.id} className="device-detail">
            <h3 className="device-name">
              <strong>{device.name}</strong>
            </h3>
            <p className="device-info">
              Device Type: {device.deviceInfo?.model}
            </p>
            <p className="device-info">
              Device Manufacturer: {device.deviceInfo?.manufacturer}
            </p>
            <p className="device-info">Serial/IMEI: {device?.serial}</p>
            <p className="device-info">
              Phone Number: +1{device.assignedNumber?.phoneNumber?.number}
            </p>
            <p className="device-info">
              Plan Information:{" "}
              {device.assignedNumber?.userPlan?.planInfo?.name} -{" "}
              {device.assignedNumber?.userPlanId}
            </p>

            <select
              value={selectedNumber[device.id] || ""}
              onChange={(e) =>
                setSelectedNumber({
                  ...selectedNumber,
                  [device.id]: e.target.value,
                })
              }
            >
              <option value={""}>Reassign to new number:</option>
              {userDevices
                .filter((dev) => dev.id !== device.id)
                .flatMap((dev) => dev.assignedNumber)
                .map((num) => (
                  <option key={num.id} value={num.id}>
                    {num.phoneNumber.number}
                  </option>
                ))}
            </select>
            <button
              onClick={() =>
                handleReassignNumber(device.id, selectedNumber[device.id])
              }
              className="device-button"
            >
              Reassign Number
            </button>
            <DeleteDeviceButton deviceId={device.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDeviceDisplay;
