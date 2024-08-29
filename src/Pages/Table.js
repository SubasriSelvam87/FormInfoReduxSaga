import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReq, getAllReq, getIdReq } from "../Redux/Action/action";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const Table = ({ id }) => {
  const [array, setArray] = useState([]);
  // const[editData,setEditData]=useState(null);
  const state = useSelector((state) => state.crudReducer.item);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(() => {
    dispatch(getAllReq());
  }, [dispatch]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    console.log("State updated:", state);
    setArray(state);
  }, [state]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = async (id) => {
    dispatch(deleteReq(id));
    await new Promise((Resolve) => {
      toast.error("Deleted Successfully", {
        theme: "dark",
        position: "top-right",
        onClose: Resolve,
      });
    });
  };

  // const handleEdit=(data)=>{
  //   // setEditData(data);
  //   navigate(`/form/${data.id}`,{state:{data}});
  // };
  const handleEdit = (data) => {
    navigate("/Form", { state: { data } });
  };

  useEffect(() => {
    if (id) {
      dispatch(getIdReq(id)); // Fetch item by ID when component mounts
    }
  }, [id, dispatch]);

  const backBtn = () => {
    navigate("/Form");
  };

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <h1 className="text-center text-white">Form Data</h1>
          <div>
            {array && array.length > 0 ? (
              <table className="table table-bordered mt-3 w-75 mx-auto px-3">
                <thead>
                  <tr className="text-center">
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>E-Mail</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pin</th>
                    <th>status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((row) => (
                    <tr key={row.id}>
                      <td>{row.firstName}</td>
                      <td>{row.lastName}</td>
                      <td>{row.userName}</td>
                      <td>{row.city}</td>
                      <td>{row.state}</td>
                      <td>{row.pinCode}</td>
                      <td>{row.checkBox ? "Active" : "Inactive"}</td>

                      <td className="d-flex">
                        <button
                          className="btn tableBtn"
                          onClick={() => handleEdit(row)}
                        >
                          <FaEdit style={{ color: "aliceblue" }} />
                        </button>
                        <button
                          className="btn tableBtn"
                          onClick={() => handleDelete(row.id)}
                        >
                          <FaTrash style={{ color: "aliceblue" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h4 className="text-center text-danger">*No data submitted*</h4>
            )}
          </div>
          <div className="d-flex justify-content-center">
          <button className="btn btn-info" onClick={backBtn}>
            Back
          </button>
          </div>
        </>
      )}
      ;
    </div>
  );
};

export default Table;
