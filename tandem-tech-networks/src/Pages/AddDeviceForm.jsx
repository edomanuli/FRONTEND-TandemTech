import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Services/useAuth";
import { UserPlan } from "../Services/UserPlan";
import { supportedDevices } from "../Services/SupportedDevices";
import Header from "./Header";
import Footer from "./Footer";
import "../modules/addDevice.css"

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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authToken) {
      navigation("/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const plans = await UserPlan(authToken);
        const devices = await supportedDevices(authToken);
        setUserPlans(plans);
        setDevices(devices);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authToken, navigation]);

  const handleDeviceInputChange = (e) => {
    setDeviceInfo({ ...deviceInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("https://localhost:5001/api/user/devices", deviceInfo, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      navigation("/my-devices");
    } catch (error) {
      console.error(
        "Device addition failed:",
        error.response?.data || error.message
      );
      if (error.response?.status === 403) {
        setError(
          "Failed to add device."
        );
      } else {
        setError("You have exceeded the number of devices allowed.Please upgrade your plan.");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="add-container">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <h2>Device Information</h2>
          </div>
          {error && (
            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          )}
          <div>
            <label className="add-label add-label">
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
            <label className="add-label add-label">Supported devices:</label>
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
            <label className="add-label">Name:</label>
            <input
              placeholder="What would you like to name your device?"
              type="text"
              name="name"
              value={deviceInfo.name}
              onChange={handleDeviceInputChange}
            />
          </div>

          <div>
            <label className="add-label">IMEI/Serial Number:</label>
            <input
              placeholder="IMEI/Serial Number of your device"
              type="text"
              name="serial"
              value={deviceInfo.serial.toUpperCase()}
              onChange={handleDeviceInputChange}
            />
          </div>

          <div>
            <button className="add-button" type="submit">Add Device</button>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default AddDeviceForm;
