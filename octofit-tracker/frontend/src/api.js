/**
 * API service for Octofit Tracker
 * Handles all backend API communication with Codespaces support
 */

/**
 * Get the API base URL based on environment
 * When VITE_CODESPACE_NAME is set, uses Codespaces URLs
 * Otherwise falls back to localhost
 */
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:8000';
};

/**
 * Fetch data from an API endpoint
 * @param {string} endpoint - The API endpoint path (e.g., '/api/users/')
 * @returns {Promise<Array>} - The response data
 */
export const fetchFromApi = async (endpoint) => {
  try {
    const url = `${getApiBaseUrl()}${endpoint}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both direct array responses and paginated/nested responses
    if (Array.isArray(data)) {
      return data;
    }
    
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // If results is an array (common pagination pattern)
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Post data to an API endpoint
 * @param {string} endpoint - The API endpoint path
 * @param {object} body - The request body
 * @returns {Promise<object>} - The response data
 */
export const postToApi = async (endpoint, body) => {
  try {
    const url = `${getApiBaseUrl()}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to post to ${endpoint}:`, error);
    throw error;
  }
};
