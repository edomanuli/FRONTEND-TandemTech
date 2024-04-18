import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Services/useAuth";
import { UserPlan } from "../Services/UserPlan";
import { supportedDevices } from "../Services/SupportedDevices";
import Header from "./Header";
import Footer from "./Footer";

const AddDeviceForm = () => {
  const { authToken } = useAuth();
  const navigation = useNavigate();
  const [userPlans, setUserPlans] = useState([]);
  const [devices, setDevices] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({
    userPlanId: "",
    deviceInfoId: "",
    name: "",
    serial: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authToken) {
      UserPlan(authToken).then(setUserPlans).catch(console.error);
      supportedDevices(authToken).then(setDevices).catch(console.error);
    }
  }, [authToken]);

  const handleDeviceInputChange = (e) => {
    setDeviceInfo({ ...deviceInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:5001/api/user/devices", deviceInfo, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      alert("Device added successfully!");
      navigation("/my-devices");
    } catch (error) {
      console.error(
        `Device addition failed: ${error.response?.data || error.message}`
      );
    }
  };

  if (!authToken) {
    return (
      <>
        <Header />
        {navigation("/login")}
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="d-flex justify-content-center">
          <h2>Loading...</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <h2>Device Information</h2>
        </div>
        <div>
          <label className="form-label">
            Please select a plan to add your device to:
          </label>
          <select
            name="userPlanId"
            value={deviceInfo.userPlanId}
            onChange={handleDeviceInputChange}
          >
            <option value="">Select a Plan</option>
            {userPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.planInfo.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Supported devices:</label>
          <select
            name="deviceInfoId"
            value={deviceInfo.deviceInfoId}
            onChange={handleDeviceInputChange}
          >
            <option value="">Select a Device</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.model}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Name:</label>
          <input
            placeholder="What would you like to name your device?"
            type="text"
            name="name"
            value={deviceInfo.name}
            onChange={handleDeviceInputChange}
          />
        </div>

        <div>
          <label className="form-label">IMEI/Serial Number:</label>
          <input
            placeholder="Enter the IMEI or Serial Number of your device"
            type="text"
            name="serial"
            value={deviceInfo.serial}
            onChange={handleDeviceInputChange}
          />
        </div>

        <div>
          <button type="submit">Add Device</button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default AddDeviceForm;
