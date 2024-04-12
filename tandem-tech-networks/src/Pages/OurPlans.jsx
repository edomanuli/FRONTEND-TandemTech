import React, { useState, useEffect } from 'react';
import { GetPlans } from '../Services/GetPlans';

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
        <div>
          <h1>Our Plans</h1>
          <ul>
            {plans.map((plan) => (
              <li key={plan.id}>
                <h3>Plan Name: {plan.name}</h3>
                <h4>Price: ${plan.price}</h4>
                <h5>Device Limit: {plan.deviceLimit}</h5>
                <h5>Data Limit: {plan.dataLimit}</h5>
                <p>
                  <strong>Plan Description:</strong> {plan.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
};


export default OurPlans;