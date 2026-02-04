const BASE_URL = "https://chat-app-1-ioju.onrender.com";

const fetchWithBaseUrl = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions = {
    credentials: "include",
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    return response;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export default fetchWithBaseUrl;
