import apiClient from './apiClient';

const healthClient = {
  getHealth: async () => {
    const { data } = await apiClient.get('/api/health', { auth: false });
    return data;
  },
};

export default healthClient;
