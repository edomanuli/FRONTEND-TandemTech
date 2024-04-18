import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

const AddDeviceButton = ({ userPlanId }) => {
  const { authToken } = useAuth();
  const navigation = useNavigate();
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDevices = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://localhost:5001/api/deviceinfo",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setDevices(response.data);
    } catch (error) {
      console.error("Failed to fetch devices: ", error);
      setError("Failed to fetch devices");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (authToken) {
      getDevices();
    }
  }, [authToken]);

  const handleDeviceAdd = async () => {
    if (!authToken || !selectedDevice) {
      alert("You must be logged in and select a device to add.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:5001/api/user/devices",
        {
          userPlanId: userPlanId,
          deviceInfoId: selectedDevice.id,
          name: selectedDevice.model,
          serial: selectedDevice.serial,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Device added successfully!");
      navigation("/my-devices");
      console.log("Response: ", response.data);
    } catch (error) {
      alert("An error occurred while adding the device.");
      console.error(
        "Error: ",
        error.response ? error.response.data : error.message || "No response"
      );
    }
  };

  return (
    <>
      <div>
        <select
          value={selectedDevice ? selectedDevice.id : ""}
          onChange={(e) =>
            setSelectedDevice(
              devices.find((device) => device.id === parseInt(e.target.value))
            )
          }
          disabled={isLoading}
        >
          <option value="">Select a device</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.model} - {device.serial}
            </option>
          ))}
        </select>
        <button
          onClick={handleDeviceAdd}
          disabled={!selectedDevice || isLoading}
        >
          Add Device
        </button>
      </div>
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default AddDeviceButton;
