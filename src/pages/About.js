import { MDBIcon, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const About = () => {
  return (
    <div className="container gx-2">
      <div className="row align-items-center py-5 g-2 fs-4">
        <MDBTypography note noteColor="success">
          This is a react-app with full CRUD operation using REDUX and
          REDUX-SAGA<br></br> React-router and MDBBootstrap is also utilized
          <br></br>
          You can create user, edit user, delete user and also view info of any
          user using{" "}
          <MDBIcon
            fas
            icon="info-circle"
            size="lg"
            // style={{ color: "#442e2b" }}
            color="info"
          ></MDBIcon>{" "}
          button. Copy pasting URL in another tab to see same data as it is
          consistent
        </MDBTypography>
      </div>
    </div>
  );
};

export default About;
