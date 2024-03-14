import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get("https://checkinn.co/api/v1/int/requests");
    return response.data.requests;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchData;