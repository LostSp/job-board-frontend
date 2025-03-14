const API_URL = "https://job-board-backend-production.up.railway.app/api/jobs";  

export const fetchJobs = async (keyword, location = "", experience = "") => {
  try {
    const response = await fetch(`${API_URL}?keyword=${keyword}&location=${location}&experience=${experience}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
