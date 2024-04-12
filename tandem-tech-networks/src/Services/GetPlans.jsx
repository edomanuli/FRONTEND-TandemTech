import axios from "axios";

const GetPlans = async () => {
    const response = await axios.get("https://localhost:5001/api/planinfo");
    return response.data;
}

export { GetPlans };