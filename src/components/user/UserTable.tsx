import { BsTrashFill, BsPencilFill } from "react-icons/bs";
import User from '../../models/User'
import "../../assets/Table.css";

interface TableProps {
  users: User[];
  deleteUser: (id: number) => void;
  editUser: (id: number) => void;
}

export const UserTable: React.FC<TableProps> = ({ users, deleteUser, editUser }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Full name</th>
            <th>E-mail</th>
            <th>Phone number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>
                <td className="fit">
                  <span className="actions">
                    <BsTrashFill
                      className="delete-btn"
                      onClick={() => deleteUser(user.id)}
                    />
                    <BsPencilFill
                      className="edit-btn"
                      onClick={() => editUser(user.id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

