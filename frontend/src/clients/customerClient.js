import apiClient from './apiClient';

const customerClient = {
  getClients: async () => {
    const response = await apiClient.get('/api/clients');
    return response;
  }
}
export default customerClient;
