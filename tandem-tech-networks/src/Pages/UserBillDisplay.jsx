import { useState, useEffect } from "react";
import { useAuth } from "../Services/useAuth";
import { fetchUserBill } from "../Services/UserBill";
import Header from "./Header";



const UserBillDisplay = () => {
    const { authToken } = useAuth();
    const [userBill, setUserBill] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (!authToken) return (
      <>
        <Header />
        <p>Please log in to view this page.</p>
      </>
    );
    if (isLoading) return <h3>Loading bill...</h3>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header />
            <h2 className="d-flex justify-content-center">My Bill</h2>
            <div>
                <h3>
                    <strong>Total Bill: ${userBill.total}</strong>
                </h3>
                <p>Due Date: {new Date(userBill.billingDate).toLocaleDateString()}</p>
                {userBill.planBills && userBill.planBills.length > 0 && (
                    <div>
                        <h5>Plans & Prices:</h5>
                        <ul>
                            {userBill.planBills.map((planBill) => (
                                <li key={planBill.id}>
                                    <strong>{planBill.userPlan.planInfo.name} - ${planBill.amount}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};


export default UserBillDisplay;