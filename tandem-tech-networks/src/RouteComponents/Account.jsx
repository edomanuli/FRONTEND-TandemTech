import React, { useState, useEffect } from 'react';
import { UserPlan } from '../Services/UserPlan';
import UserPlanDisplay from '../Pages/UserPlanDisplay';
import UserDeviceDisplay from '../Pages/UserDevicesDisplay';


const Account = () => {

    return (
        <>
            <UserPlanDisplay />
            <UserDeviceDisplay />
        </>
    );
};


export default Account;