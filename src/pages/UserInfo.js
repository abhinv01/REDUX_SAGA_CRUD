import { MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loadSingleUserStart } from "../redux/actions";

const UserInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleUserInfo, loading } = useSelector((state) => state.data);

  const handleHomeClick = () => {
    navigate("..");
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
      dispatch(loadSingleUserStart(id));
    }
  }, [id]);
  return (
    <div
      className="container my-5 border gx-2 "
      style={{
        minHeight: "70vh",
        boxShadow: "2px 2px 15px black",
        borderRadius: "20px",
      }}
    >
      <div className="fs-1 fw-4 py-3"> User Info</div>
      <p className="border"></p>
      <div class="row align-items-center py-5 g-2 fs-4">
        {!loading ? (
          <>
            {" "}
            <div class="col-6 my-3">Name - </div>
            <div class="col-6 my-3">{singleUserInfo.name}</div>
            <div class="col-6 my-3">Address - </div>
            <div class="col-6 my-3">{singleUserInfo.address}</div>
            <div class="col-6 my-3">Phone - </div>
            <div class="col-6 my-3">{singleUserInfo.phone}</div>
            <div class="col-6 my-3">Email - </div>
            <div class="col-6 my-3">{singleUserInfo.email}</div>
          </>
        ) : (
          <div className="mb-auto" style={{ minHeight: "30vh" }}>
            <MDBSpinner grow className="mx-2" color="info">
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          </div>
        )}
        <div className="col-12">
          <MDBBtn
            onClick={handleHomeClick}
            className="info mt-4 align-self-end"
          >
            <MDBIcon fas icon="home"></MDBIcon> Home
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
