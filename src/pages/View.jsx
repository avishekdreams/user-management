import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userInfo } from "../features/userSlice";
import Layout from '../components/shared/Layout';

export default function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useSelector(userInfo);
  const currentUser = users.filter((usr) => usr.id === id);

  return (
    <Layout title="User details" desc="Get the info for the exiting user details.">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details.</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Username</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currentUser[0].username}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currentUser[0].email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currentUser[0].role}</dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <button
                className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => navigate(`/update/${id}`)}>
                Edit
              </button>
              <button
                className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => navigate("/", { replace: true })}>
                Back
              </button>
            </div>

          </dl>
        </div>
      </div>
    </Layout>
  )
}
