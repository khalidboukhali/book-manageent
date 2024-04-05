import {usersInstance} from './ApiProvider'
import User from '../models/User'


const userService = {
  
  getAllUsers: async () => {
    try {
        const response = await usersInstance.get('');
        return response.data;
    } catch (error) {
        console.log("Error: "+error);
    }
  },

  
  getUserById: async (userId: number)=> {
    const response = await usersInstance.get(`/${userId}`);
    return response.data.data;
  },

  
  createUser: async (newUser: Omit<User, 'id'>) => {
    await usersInstance.post('', newUser);
  },

  
  updateUser: async (userId: number, updatedUser: User)=> {
    await usersInstance.put(`/${userId}`, updatedUser);
  },

  
  deleteUser: async (userId: number)=> {
    await usersInstance.delete(`/${userId}`);
  },
};

export default userService;
