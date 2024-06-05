import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image1 from "assets/images/products/img-1.png";
import image2 from "assets/images/products/img-2.png";
import image3 from "assets/images/products/img-3.png";
import image6 from "assets/images/products/img-6.png";
import image5 from "assets/images/products/img-5.png";
import {
  Note,
  useDeleteNoteMutation,
  useFetchNoteQuery,
  useFetchNotesByCompanyQuery,
} from "../features/notes/noteSlice";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { selectCurrentUser } from "../features/affiliate/authAffiliateSlice";

const MyCartDropdown = () => {
  const cartItemTotal: any = useRef();
  const emptyCart: any = useRef();

  // const { data = [] } = useFetchNoteQuery();
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const { data } = useFetchNotesByCompanyQuery({ id_corporate: user?._id! });

  // Type assertion to inform TypeScript about the shape of `data`
  const notes: Note[] = (data as any)?.getNotesByIdCompany || [];
  console.log(notes);

  const notesTotal = notes.length;

  console.log(data);
  const [deleteNote] = useDeleteNoteMutation();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const removeNote = async (_id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, archive it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          deleteNote(_id);
          swalWithBootstrapButtons.fire({
            title: "Archived!",
            text: "Your file has been archived.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your complain is safe :)",
            icon: "error",
          });
        }
      });
  };
  // pdf and image handlers
  const [selectedPdf, setSelectedPdf] = useState<string>("");
  const [selectedPhoto, setSelectedPhoto] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  useEffect(() => {
    if (pdfUrl !== "") {
      window.open(pdfUrl);
    }
  }, [pdfUrl]);

  useEffect(() => {
    if (photoUrl !== "") {
      window.open(photoUrl);
    }
  }, [photoUrl]);
  const openPdfInNewTab = (PDF: string) => {
    setSelectedPdf(PDF);
    setPdfUrl(`http://localhost:3000/noteFiles/pdf/${PDF}`);
  };
  const openPhotoInNewTab = (PHOTO: string) => {
    setSelectedPhoto(PHOTO);
    setPhotoUrl(`http://localhost:3000/noteFiles/photo/${PHOTO}`);
  };

  return (
    <React.Fragment>
      <Dropdown className="topbar-head-dropdown ms-1 header-item">
        <Dropdown.Toggle
          id="cart-dropdown"
          type="button"
          className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle arrow-none"
        >
          <i className="bi bi-pencil-square "></i>
          <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">
            {notesTotal}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart">
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fs-16 fw-semibold"> My Notes</h6>
              </Col>
              <div className="col-auto">
                <span className="badge bg-info-subtle text-info fs-13">
                  {" "}
                  <span className="cartitem-badge"> {notesTotal} </span> notes
                </span>
              </div>
            </Row>
          </div>
          <SimpleBar style={{ maxHeight: "300px" }}>
            <div className="p-2">
              <div
                className="text-center empty-cart"
                ref={emptyCart}
                style={{ display: "none" }}
              >
                <div className="avatar-md mx-auto my-3">
                  <div className="avatar-title bg-info-subtle fs-36 rounded-circle">
                    <i className="bx bx-cart"></i>
                  </div>
                </div>
                <h5 className="mb-3">Your Cart of notes is Empty!</h5>
                <Link to="/" className="btn btn-success w-md mb-3">
                  Write New One
                </Link>
              </div>
              {notes.map((item, key) => (
                <div
                  className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2"
                  key={item._id}
                >
                  <div className="d-flex align-items-center">
                    {/* <img src={item.img} alt="user-pic" className='me-3 rounded-circle avatar-sm p-2 bg-light' /> */}
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center">
                        <h6 className="mt-0 mb-1 fs-14">
                          {/* <Link to="/apps-ecommerce-product-details" className="text-reset">{item.product}</Link> */}
                          {item.title}
                        </h6>
                        {/* Avatar With Content  */}
                        {item!.photo!.slice(36) === "" ? (
                          ""
                        ) : (
                          <div
                            className="avatar-xs p-1 "
                            onClick={() => openPhotoInNewTab(item.photo)}
                          >
                            <div className="avatar-title rounded bg-primary-subtle text-primary">
                              <i className="bi bi-file-earmark-image"></i>
                            </div>
                          </div>
                        )}
                        {item!.pdf!.slice(34) === "" ? (
                          ""
                        ) : (
                          <div
                            className="avatar-xs p-1"
                            onClick={() => openPdfInNewTab(item.pdf)}
                          >
                            <div className="avatar-title rounded bg-danger-subtle text-danger">
                              <i className="bi bi-filetype-pdf"></i>
                            </div>
                          </div>
                        )}
                      </div>

                      <p className="mb-0 fs-12 text-muted">
                        <span>{item.message} </span>
                      </p>
                    </div>
                    {/* <div className="px-2">
                                            <h5 className="m-0 fw-normal">$<span className="cart-item-price">{item.quantity * item.price}</span></h5>
                                        </div> */}
                    <div className="ps-2">
                      <Button
                        variant="ghost-secondary"
                        type="button"
                        className="btn btn-icon btn-sm btn-ghost-danger remove-item-btn"
                        onClick={() => removeNote(item._id)}
                      >
                        <i className="ri-close-fill fs-16"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SimpleBar>
          {/* <div className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border d-grid" id="checkout-elem">
                        <div className="d-flex justify-content-between align-items-center pb-3">
                            <h5 className="m-0 text-muted">Total:</h5>
                            <div className="px-2">
                                <h5 className="m-0">$ <span ref={cartItemTotal} id="cart-item-total">3400</span></h5>
                            </div>
                        </div>

                        <Link to="/apps-ecommerce-checkout" className="btn btn-success text-center w-100">
                            Checkout
                        </Link>
                    </div> */}
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
};

export default MyCartDropdown;
