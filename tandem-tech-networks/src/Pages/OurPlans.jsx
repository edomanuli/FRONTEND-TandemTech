import React, { useState, useEffect } from "react";
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

  const handleButtonClick = (id) => {
    console.log(`Button Clicked with ID: ${id}`);
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <Header />
      <h1>Plans & Pricing</h1>
      <div>
        <ul>
          {plans.map((plan) => (
            <li key={plan.id}>
              <h3>Plan Name: {plan.name}</h3>
              <h4>Price: ${plan.price}</h4>
              <h5 >Device Limit: {plan.deviceLimit}</h5>
              <h5>Data Limit: {plan.dataLimit}</h5>
              <p>
                <strong>Plan Description:</strong>{" "}
                {plan.description}
              </p>
              <AddPlanButton planInfoId={plan.id} />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default OurPlans;
