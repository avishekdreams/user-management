import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo, fetchUsersAsync, deleteUserAsync } from '../features/userSlice';
import DataTable from '../components/DataTable';
import { useNavigate } from "react-router-dom";
import Layout from '../components/shared/Layout';
import ModalBox from '../components/ModalBox';

export default function Home() {
  const dispatch = useDispatch();
  const { error, loading, users } = useSelector(userInfo);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const handleAdd = () => {
    navigate("/create");
  }

  const handleDelete = (e) => {
    setDeleteUserId(e);
    setIsModalOpen(true);
  }

  const handleConfirmRemove = async () => {
    if (deleteUserId !== "") {
      dispatch(deleteUserAsync(deleteUserId));
      setDeleteUserId("");
      setIsModalOpen(false);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  // console.log(users.length);

  return (
    <Layout title="List of all users" desc="Enumerate a comprehensive compilation of all users.">
      <div className="flex justify-between items-center">
        <button
          className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAdd()}
        >
          Add +
        </button>
        <div>
          <input
            type="text"
            placeholder="Search with username"
            className="border border-gray-300 rounded-md py-2 px-4 mr-2"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
      {loading ? <h2>Loading</h2> : (
        <>
          {users && (
            <DataTable
              userData={users}
              handleAdd={handleAdd}
              handleDelete={(e) => handleDelete(e)}
              setFiltering={setSearchData}
              filteredData={searchData}
            />
          )}
        </>
      )}
      <ModalBox isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmRemove} />
    </Layout>
  )
}
