const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error.message || 'Network error',
      0,
      { error: error.message }
    );
  }
}

export const api = {
  async getGuildData() {
    return apiRequest('/data');
  },

  async getFilteredGuildData(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const queryString = queryParams.toString();
    const endpoint = `/data/filtered${queryString ? `?${queryString}` : ''}`;
    return apiRequest(endpoint);
  },

  async getMissingEnchantsStats() {
    return apiRequest('/stats/missing-enchants')
  },

  async getTopPvPPlayers() {
    return apiRequest('/stats/top-pvp')
  },

  async getTopPvEPlayers() {
    return apiRequest('/stats/top-pve')
  },

  async getStatus() {
    return apiRequest('/status')
  },

  async healthCheck() {
    return apiRequest('/health')
  },

  async getSeason3Data() {
    return apiRequest('/api/season3/data');
  },

  async getRoleCounts() {
    return apiRequest('/stats/role-counts')
  },

  async getGuildProgression() {
    return apiRequest('/guild/progression')
  },

  async getRaidTeamData() {
    return apiRequest('/raid-team')
  },
};

export { ApiError };