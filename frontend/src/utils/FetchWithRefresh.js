const API_BASE_URL = "https://chat-app-1-ioju.onrender.com/api";

const fetchWithRefresh = async (endpoint, options = {}) => {
  try {
    
    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
      credentials: "include",
    });

    if (!refreshResponse.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken } = await refreshResponse.json();

    
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };

    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, authOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch resource from ${endpoint}`);
    }

    return response;
  } catch (error) {
    console.error(`Error fetching resource from ${endpoint}:`, error.message);
    throw error;
  }
};

export default fetchWithRefresh;
