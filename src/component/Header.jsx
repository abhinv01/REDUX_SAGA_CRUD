import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchUserStart } from "../redux/actions";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearchQuery = (e) => {
    e.preventDefault();
    dispatch(searchUserStart(search));
    setSearch("");
  };
  return (
    <>
      <MDBNavbar expand="lg" light className="bg-info bg-gradient .text-light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-white">
            <span style={{ marginRight: "10px" }}>
              <NavLink to="/">
                <MDBIcon fab icon="black-tie" className="text-light" />
              </NavLink>
            </span>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="text-light"
            onClick={() => setOpenNav((openNav) => !openNav)}
          >
            <MDBIcon icon="bars" fas className="grey-text" />
          </MDBNavbarToggler>

          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page">
                  <NavLink
                    to="/"
                    className={({ isActive }) => {
                      return `px-2 py-1  ${
                        isActive
                          ? "fw-bolder fst-italic rounded bg-white text-info"
                          : "text-light"
                      } `;
                    }}
                  >
                    Home
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink>
                  <NavLink
                    to="/addUser"
                    className={({ isActive }) => {
                      return `px-2 py-1  ${
                        isActive
                          ? "fw-bolder fst-italic rounded bg-white text-info"
                          : "text-light"
                      } `;
                    }}
                  >
                    Add User
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink>
                  <NavLink
                    to="/about"
                    className={({ isActive }) => {
                      return `px-2 py-1  ${
                        isActive
                          ? "fw-bolder fst-italic rounded bg-white text-info"
                          : "text-light"
                      } `;
                    }}
                  >
                    About
                  </NavLink>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <form
              onSubmit={handleSearchQuery}
              className="d-flex input-group w-auto"
            >
              <input
                type="search"
                className="form-control"
                placeholder="Search By Name"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MDBBtn type="submit" color="dark">
                Search
              </MDBBtn>
            </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
