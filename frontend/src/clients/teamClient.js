import apiClient from './apiClient';

const teamClient = {
  // getAll: async (params = {}) => {
  //   const query = new URLSearchParams(params).toString();
  //   const url = query ? `/api/teams?${query}` : '/api/teams';
  //   return await apiClient.get(url);
  // },

  getSubteams: async () => 
    apiClient.get(`/api/teams/my-subteams`),
  
  getTeamMembers: async () => 
    apiClient.get(`/api/teams/my-team-members`),

  // create: async (data) => 
  //   apiClient.post('/api/teams/', data),

  // update: async (id, data) => 
  //   apiClient.put(`/api/teams/${id}`, data),

  // delete: async (id) => 
  //   apiClient.delete(`/api/teams/${id}`),

};

export default teamClient;
