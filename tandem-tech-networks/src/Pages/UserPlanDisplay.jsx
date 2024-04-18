import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../Services/useAuth";
import { UserPlan } from "../Services/UserPlan";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import DeletePlanButton from "../Services/DeletePlanButton";


const UserPlanDisplay = () => {
  const { authToken } = useAuth();
  const [userPlan, setUserPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  const fetchUserPlan = useCallback(async () => {
    if (!authToken) {
      setError("User not logged in.");
      setIsLoading(false);
      return;
    }

    try {
      const plans = await UserPlan(authToken);
      setUserPlan(Array.isArray(plans) ? plans : [plans]);
      if (plans.length === 0) {
        setError("Please add a plan to your account.");
      }
    } catch (error) {
      setError("Failed to fetch user plans");
      console.error(error);
    }
    setIsLoading(false);
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchUserPlan();
    }
  }, [authToken, fetchUserPlan]);


  if (!authToken) return (
    <>
      <Header />
      {navigation("/login")}
    </>
  );
  if (userPlan.length === 0) return (
    <>
      <Header />
      <h3 className="d-flex justify-content-center">No plans found. Please add a plan to your account.</h3>
    </>
  );
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <h2 className="d-flex justify-content-center">MY PLANS</h2>
      <div className="user-plan-container">
        {userPlan.map((plan) => (
          <div className="user-plan-list" key={plan.id}>
            <h3 className="user-plan-name-price">
              <strong>
                {plan.planInfo.name} - ID: {plan.id}
              </strong>
              ${plan.planInfo.price}
            </h3>
            <p className="user-plan-enrollment">
              <strong>Enrollment Date:</strong> {plan.enrollmentDate}
            </p>
            <p className="user-plan-device-limit">
              <strong>Device Limit: </strong>
              {plan.planInfo.deviceLimit}
            </p>
            <p className="user-plan-data-limit">
              <strong>Data Limit:</strong> {plan.planInfo.dataLimit}GB
            </p>
            <p className="text-wrap user-plan-description">
              <strong>Description:</strong> {plan.planInfo.description}
            </p>
            <div className="btn-container">
              {/* <AddPlanButton
                planInfoId={plan.planInfo.id}
                onPlanAdd={handlePlanAdd}
              /> */}
              <DeletePlanButton userPlanId={plan.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPlanDisplay;
