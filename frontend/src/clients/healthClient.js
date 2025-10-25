import apiClient from './apiClient';

const healthClient = {
  getHealth: async () => {
    const response = await apiClient.get('/api/health');
    return response;
  },
};

export default healthClient;
