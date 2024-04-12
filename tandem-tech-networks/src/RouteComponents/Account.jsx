import React, { useState, useEffect } from 'react';
import { UserPlan } from '../Services/UserPlan';
import UserPlanDisplay from '../Pages/UserPlanDisplay';


const Account = () => {

    return (
        <>
            <h1>Account Information</h1>
            <UserPlanDisplay />
        </>
    );
};


export default Account;