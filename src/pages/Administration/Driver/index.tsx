import React from "react";
import {
  Container,
  Row,
} from "react-bootstrap";
import Breadcrumb from "Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import DriverTable from "./DriverTable";
import { useGetAllDriverQuery } from "features/driver/driverSlice";

const Driver = () => {
  document.title = "Driver | Bouden Coach Travel";

  const navigate = useNavigate();

  function tog_AddDriver() {
    navigate("/new-driver");
  }
  const {data = []} = useGetAllDriverQuery()
  const driver = [
   data
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Driver" pageTitle="Contacts" />
          <Row>
            <DriverTable driver={data} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Driver;
