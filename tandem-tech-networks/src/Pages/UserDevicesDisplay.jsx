import { useState, useEffect } from "react";
import { useAuth } from "../Services/useAuth";
import { fetchUserDevices } from "../Services/UserDevices";
import { useNavigate } from "react-router-dom";
import reassignNumberButton from "../Services/ReassignNumberButton";
import DeleteDeviceButton from "../Services/DeleteDeviceButton";
import Header from "./Header";

const UserDeviceDisplay = () => {
  const { authToken } = useAuth();
  const [userDevices, setUserDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

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

  const handleReassignNumber = async (currentDeviceId, assignedNumberId) => {
    const newDeviceId = selectedDevice[currentDeviceId];
    if (!newDeviceId) {
      alert("Please select a device to reassign the number to.");
      return;
    }

    try {
      await reassignNumberButton(currentDeviceId, assignedNumberId, newDeviceId, authToken);
      alert("Number reassigned successfully.");
      // I'm refreshing the device list
      const refreshDevices = await fetchUserDevices(authToken);
      setUserDevices(refreshDevices);
    } catch (error) {
      console.error(`Failed to reassign number: ${error}`);
      alert("Failed to reassign number.");
    }
  };

  if (!authToken) return (
    <>
      <Header />
      {navigation("/login")}
    </>
  );
  if (isLoading) return <h3>Loading devices...</h3>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <h2 className="d-flex justify-content-center">My Devices</h2>
      <div>
        {userDevices.map((device) => (
          <div key={device.id}>
            <h3>
              <strong>{device.name}</strong>
            </h3>
            <p>Device Type: {device.deviceInfo?.model}</p>
            <p>Device Manufacturer: {device.deviceInfo?.manufacturer}</p>
            <p>Serial: {device?.serial}</p>
            <p>Phone Number: +1{device.assignedNumber?.phoneNumber?.number}</p>
            <p>Plan: {device.assignedNumber?.userPlanId}</p>

            <select
              value={selectedDevice[device.id] || ""}
              onChange={(e) =>
                setSelectedDevice({
                  ...selectedDevice,
                  [device.id]: e.target.value,
                })
              }
            >
              <option value={""}>Select device</option>
              {userDevices
                .filter((dev) => dev.id !== device.id)
                .map((dev) => (
                  <option key={dev.id} value={dev.id}>
                    {dev.name}
                  </option>
                ))}
            </select>
            <button
              onClick={() =>
                handleReassignNumber(device.id, device.assignedNumber.id)
              }
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
