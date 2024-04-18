import { Route, Routes, Outlet } from "react-router-dom";
import UserPlanDisplay from "../Pages/UserPlanDisplay";
import UserDeviceDisplay from "../Pages/UserDevicesDisplay";
import UserBillDisplay from "../Pages/UserBillDisplay";
import AddDeviceForm from "../Pages/AddDeviceForm";
import Footer from "../Pages/Footer";

const Account = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="my-plans" element={<UserPlanDisplay />} />
          <Route path="my-devices" element={<UserDeviceDisplay />} />
          <Route path="my-bill" element={<UserBillDisplay />} />
          <Route path="add-device" element={<AddDeviceForm />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Account;
