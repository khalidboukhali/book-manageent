import { useState, useEffect } from "react";
import {UserForm} from "../components/user/UserForm";
import {UserTable} from "../components/user/UserTable";
import userService from '../service/UserService'

import User from '../models/User'
import '../assets/Table.css'

function Users() {
  const [formOpen, setFormOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<number>(0);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch users when component mounts
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      await userService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId: number) => {
    setUserToEdit(userId);
    setFormOpen(true);
  };

  const handleSubmit = async (newUser: User) => {
    try {
      if (userToEdit === 0) {
        // Add new user
        await userService.createUser(newUser);
        fetchUsers();
      } else {
        // Update existing user
        await userService.updateUser(userToEdit, newUser);
        fetchUsers();
      }
      setUserToEdit(0);
      setFormOpen(false);
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  return (
    <div>
      <div className="App">
        <h1 className="room-list-title">Users list:</h1>
        <UserTable
          users={users}
          deleteUser={handleDeleteUser}
          editUser={handleEditUser}
        />
        <button onClick={() => setFormOpen(true)} className="btn">
          Add new user
        </button>
        {formOpen && (
          <UserForm
            closeModal={() => {
              setFormOpen(false);
              setUserToEdit(0);
            }}
            onSubmit={handleSubmit}
            defaultValue={
              userToEdit !== 0
                ? users.find((user) => user.id === userToEdit)
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

export default Users;
