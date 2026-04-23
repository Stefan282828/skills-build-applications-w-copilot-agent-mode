// API utility for constructing the base URL
export const getApiUrl = () => {
  const codesspaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codesspaceName) {
    return `https://${codesspaceName}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
};

export const fetchEndpoint = async (endpoint) => {
  const url = `${getApiUrl()}${endpoint}`;
  console.log(`Fetching from: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Data received from ${endpoint}:`, data);
    
    // Handle both paginated and plain array responses
    if (data.results && Array.isArray(data.results)) {
      console.log(`Paginated response detected. Returning ${data.results.length} items`);
      return data.results;
    } else if (Array.isArray(data)) {
      console.log(`Plain array response detected. Returning ${data.length} items`);
      return data;
    } else {
      console.warn(`Unexpected data format:`, data);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};
