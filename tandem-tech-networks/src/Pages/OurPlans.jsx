import { useState, useEffect } from "react";
import { GetPlans } from "../Services/GetPlans";
import AddPlanButton from "../Services/AddPlanButton";
import Header from "./Header";
import Footer from "./Footer";

const OurPlans = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPlans = async () => {
      const plansFromAPI = await GetPlans();
      setPlans(plansFromAPI);
      setIsLoading(false);
    };

    getPlans();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <Header />
      <h1 className="d-flex justify-content-center">Plans & Pricing</h1>
      <div className="all-plan-container">
        {plans.map((plan) => (
          <div className="plan-list" key={plan.id}>
            <h3 className="plan-name">Plan Name: {plan.name}</h3>
            <h4 className="plan-price">Price: ${plan.price}</h4>
            <h5 className="plan-device-limit">
              Device Limit: {plan.deviceLimit}
            </h5>
            <h5 className="plan-data-limit">
              Data Limit:{" "}
              {plan.dataLimit === 0 ? "Unlimited" : `${plan.dataLimit}GB`}
            </h5>
            <p className="plan-description">
              <strong>Plan Description:</strong> {plan.description}
            </p>
            <AddPlanButton planInfoId={plan.id} />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default OurPlans;
