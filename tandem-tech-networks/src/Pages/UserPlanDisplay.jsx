import React, { useState, useEffect } from "react";
import { useAuth } from "../Services/AuthService";
import { UserPlan } from "../Services/UserPlan";
import AddPlanButton from "../Services/AddPlanButton";
import Header from "./Header";
import DeletePlanButton from "../Services/DeletePlanButton"; // not fully implemented yet

const UserPlanDisplay = () => {
  const { authToken, isLoggedIn } = useAuth();
  const [userPlan, setUserPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!isLoggedIn()) {
        setError("User not logged in.");
        setIsLoading(false);
        return;
      }

      try {
        const plans = await UserPlan(authToken);
        setUserPlan(Array.isArray(plans) ? plans : [plans]);
      } catch (error) {
        setError("Failed to fetch user plans");
        console.error(error);
      }
      setIsLoading(false);
    };

    if (isLoggedIn()) {
      fetchUserPlan();
    }
  }, [authToken, isLoggedIn]);

  if (!isLoggedIn()) return <p>Please log in to view this page.</p>;
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header />
      <h2>My Plans</h2>
      {userPlan.map((plan) => (
        <div key={plan.id}>
          <h3>
            <strong>{plan.planInfo.name}</strong> - ${plan.planInfo.price}
          </h3>
          <p>Enrollment Date: {plan.enrollmentDate}</p>
          <p>Device Limit: {plan.planInfo.deviceLimit}</p>
          <p>Data Limit: {plan.planInfo.dataLimit}GB</p>
          <p>Description: {plan.planInfo.description}</p>
          <AddPlanButton planInfoId={plan.planInfo.id} />
          <DeletePlanButton planInfoId={plan.planInfo.id} /> 
        </div>
      ))}
    </div>
  );
};

export default UserPlanDisplay;
