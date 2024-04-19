import { useState, useEffect } from "react";
import { useAuth } from "../Services/useAuth";
import { fetchUserBill } from "../Services/UserBill";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../modules/bill.css";

const UserBillDisplay = () => {
  const { authToken } = useAuth();
  const [userBill, setUserBill] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigate();

  useEffect(() => {
    if (!authToken) {
      setError("Please log in to view your bill.");
      setIsLoading(false);
      return;
    }

    const loadBill = async () => {
      try {
        const bill = await fetchUserBill(authToken);
        setUserBill(bill);
        setError(null);
      } catch (error) {
        setError("Failed to get bill.");
        console.error(error);
      }
      setIsLoading(false);
    };

    loadBill();
  }, [authToken]);

  if (!authToken)
    return (
      <>
        <Header />
        {navigation("/login")}
      </>
    );
  if (isLoading) return <h3>Loading bill...</h3>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="bill-container">
        <h2 className="bill-heading">My Bill</h2>
        <div>
          <h3 className="bill-total">
            <strong>Total Bill: ${userBill.total}</strong>
          </h3>
          <p className="bill-details">
            Billing Date: {new Date(userBill.billingDate).toLocaleDateString()}
          </p>
          {userBill.planBills && userBill.planBills.length > 0 && (
            <div className="bill-plans">
              <h5>Plans & Prices:</h5>
              <ul>
                {userBill.planBills.map((planBill) => (
                  <li key={planBill.id}>
                    <strong>
                      {planBill.userPlan.planInfo.name} - ${planBill.amount}
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {error && <div className="error-message">Error: {error}</div>}
      {isLoading && <div className="loading-message">Loading bill...</div>}
    </>
  );
};

export default UserBillDisplay;
