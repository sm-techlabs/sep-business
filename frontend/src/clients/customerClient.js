import apiClient from './apiClient';

const customerClient = {

  /**
   * Retrieves Clients (may accept params in the future)
   */
  getClients: async () => {
    const response = await apiClient.get('/api/clients');
    return response;
  }
}
export default customerClient;
