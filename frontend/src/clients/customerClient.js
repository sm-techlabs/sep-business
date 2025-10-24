import apiClient from './apiClient';

const customerClient = {
  getClients: async () => {
    const response = await apiClient.get('/api/clients');
    return response.data;
  }
}
export default customerClient;
