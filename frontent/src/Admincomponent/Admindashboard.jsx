import { useNavigate } from "react-router";
import { useGetusersMutation,useDeleteuserMutation } from "../Adminslice/adminapislice.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import {setSelectedUser} from "../Adminslice/adminauthslice"


const Admindashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [getUsers] = useGetusersMutation();
  const [deleteuser] = useDeleteuserMutation();

  console.log("Users",users);

  const fetchData = async () => {
    try {
      const response = await getUsers().unwrap();
      console.log("the response of admindashboard",response);
        setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    console.log('aaaa');
    fetchData();
  },[]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
            user.email.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const handleEditProfileClick = (user) => {
    dispatch(setSelectedUser(user));
    navigate(`/admin/admin_editprofile/${user._id}`);
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteuser(userId).unwrap();
        toast.success("User deleted successfully");
        setUsers(users.filter((user) => user._id !== userId));
        setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <>
       <div className="flex justify-between items-center  mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-semibold justify-center">Admin Dashboard</h1>
        </div>
        <div className="pr-28">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 rounded"
          />
        </div>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profile Pic
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-20 w-20 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEditProfileClick(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <span className="text-gray-300 mx-2">|</span>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admindashboard;
