import React, { useState } from "react";
import { allPlans } from "../Services/AuthService";

const AllPlans = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const data = await allPlans();
      setPlans(data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1>Plans</h1>
      <button onClick={fetchPlans}>Get Plans</button>
      <ul>
        <li>{plans.name}</li>
        <li>{plans.price}</li>
        <li>{plans.deviceLimit}</li>
        <li>{plans.description}</li>
      </ul>
      {/* <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            <p>{plan.name}</p>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <p>{plan.deviceLimit}</p>
          </li>
        ))}
      </ul> */}
    </>
  );
};

export default AllPlans;
