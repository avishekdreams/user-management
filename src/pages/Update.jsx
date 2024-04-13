import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userInfo, updateUserAsync } from "../features/userSlice";
import Layout from '../components/shared/Layout';

export default function Update() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {users} = useSelector(userInfo);
  const existingUser = users.filter((usr) => usr.id === id);

  const [formData, setFormData] = useState({
    id: existingUser[0].id,
    username: existingUser[0].username,
    email: existingUser[0].email,
    role: existingUser[0].role,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(updateUserAsync(formData));
    navigate("/");
  }

  return (
    <Layout title="Update user" desc="Revise and modify the details and attributes of an existing user.">
      <form className="mx-auto w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-username">
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              name="username"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-email">
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              name="email"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-role">
              Role
            </label>
          </div>
          <div className="relative md:w-2/3">
            <select
              name="role"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">---Select---</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="md:w-1/3">
            <button
              className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => navigate("/", { replace: true })}>
              Back
            </button>
          </div>
        </div>
      </form>
    </Layout>
  )
}
