const API_URL = "http://localhost:8080/api/jobs";  

export const fetchJobs = async (keyword, location = "", experience = "") => {
  try {
    const response = await fetch(`${API_URL}?keyword=${keyword}&location=${location}&experience=${experience}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
