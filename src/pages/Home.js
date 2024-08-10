import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsersStart,
  filterUserStart,
  loadUsersStart,
  sortUserStart,
} from "../redux/actions";
import {
  MDBBadge,
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);
  const [sortValue, setSortValue] = useState("");
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = (id, name) => {
    console.log("id", id);
    if (window.confirm(`Are you sure you want to delete ${id} ${name} `)) {
      dispatch(deleteUsersStart(id));
      toast.error(`${name} deleted sucessfully`);
    }
  };

  const onFilterChange = (status) => {
    dispatch(filterUserStart(status));
    setFilterVal(status);
  };

  const onSortChange = (e) => {
    let str = e.target.value;
    // setSortValue(str.charAt(0).toLowerCase() + str.slice(1));
    if (sortOptions.includes(str)) {
      console.log("sorting");
      dispatch(sortUserStart(str.toLowerCase()));
      setFilterVal("");
    }
    setSortValue(str);
  };

  const sortOptions = ["Name", "Email", "Address", "Phone", "Status"];
  return (
    <>
      <MDBContainer className="my-5">
        <MDBRow>
          {users.length > 0 && (
            <MDBCol size="md" className="my-2">
              <h6>Sort By:</h6>
              <select
                style={{ width: "40%", borderRadius: "2px", height: "35px" }}
                value={sortValue}
                onChange={onSortChange}
              >
                <option>Please select value</option>
                {sortOptions.map((item, ind) => {
                  return (
                    <option key={ind} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </MDBCol>
          )}
          <MDBCol size="md" className="my-2">
            <h6>RESET:</h6>

            <MDBBtn
              style={{ width: "maxContent" }}
              onClick={() => {
                dispatch(loadUsersStart());
                setFilterVal("");
                setSortValue("Please select value");
              }}
            >
              Reset{" "}
              <MDBIcon fas icon="sync" style={{ display: "inlineBlock" }} />
            </MDBBtn>
          </MDBCol>
          {users.length > 0 && (
            <MDBCol size="md" className="my-2">
              <h6>Filter By Staus:</h6>
              <MDBBtnGroup>
                <MDBBtn
                  color={filterVal === "active" ? "success" : "light"}
                  onClick={() => onFilterChange("active")}
                >
                  Active{" "}
                </MDBBtn>
                <MDBBtn
                  color={filterVal === "inactive" ? "success" : "light"}
                  onClick={() => onFilterChange("inactive")}
                >
                  Inactive
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
          )}
        </MDBRow>
        <div
          className="container"
          style={{
            marginTop: "50px",
            marginBottom: "30px",
            overflowX: "auto",
          }}
        >
          <MDBTable align="middle">
            <MDBTableHead className="table-info">
              <tr className="table-info">
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Staus</th>
                <th scope="col">Action</th>
              </tr>
            </MDBTableHead>

            {!loading ? (
              <MDBTableBody>
                {users.length > 0 ? (
                  users.map((element, ind) => (
                    <React.Fragment key={ind}>
                      <tr>
                        <th scope="row">{ind + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.phone}</td>
                        <td>{element.address}</td>

                        <td>
                          {" "}
                          <MDBBadge
                            color={
                              element.status === "active" ? "success" : "danger"
                            }
                            light
                          >
                            {element.status.toUpperCase()}
                          </MDBBadge>
                        </td>
                        <td className="d-flex justify-content-evenly align-items-center">
                          <Link to={`/editUser/${element.id}`} className="m-1">
                            <MDBTooltip title="Edit" tag="a">
                              <MDBIcon
                                fas
                                icon="pencil"
                                style={{ color: "#442e2b" }}
                              ></MDBIcon>
                            </MDBTooltip>
                          </Link>
                          <MDBBtn
                            className="mx-1"
                            tag="a"
                            color="none"
                            onClick={() =>
                              handleDelete(element.id, element.name)
                            }
                          >
                            <MDBTooltip title="Delete" tag="a">
                              <MDBIcon
                                fas
                                icon="trash"
                                style={{ color: "#d65f50" }}
                              ></MDBIcon>
                            </MDBTooltip>
                          </MDBBtn>{" "}
                          <Link to={`/userInfo/${element.id}`}>
                            <MDBTooltip title="View user" tag="a">
                              <MDBIcon
                                fas
                                icon="info-circle"
                                size="lg"
                                // style={{ color: "#442e2b" }}
                                color="info"
                              ></MDBIcon>
                            </MDBTooltip>
                          </Link>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr className="my-4">
                    <td colSpan={7} className="text-center">
                      <h3>No data found</h3>
                    </td>
                  </tr>
                )}
              </MDBTableBody>
            ) : (
              <MDBTableBody>
                <tr className="my-4">
                  <td colSpan={7}>
                    <MDBSpinner grow className="mx-2" color="info">
                      <span className="visually-hidden">Loading...</span>
                    </MDBSpinner>
                  </td>
                </tr>
              </MDBTableBody>
            )}
          </MDBTable>
        </div>
      </MDBContainer>
    </>
  );
};

export default Home;
