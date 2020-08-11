import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal } from "react-bootstrap";
import "./appModal.scss";
import { getImageURL } from "../../util/util";
const AppModal = React.memo(
  forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [campaignDetails, setCampaignDetails] = useState({
      name: "",
      region: "",
      createdOn: "",
      price: [],
      csv: "",
      report: "",
      image_url: ""
    });
    const handleClose = () => setShow(false);
    useImperativeHandle(ref, () => ({
      handleShow(details) {
        setCampaignDetails(details);
        setShow(true);
      }
    }));
    return (
      <>
        <Modal
          className="app-modal"
          show={show}
          onHide={handleClose}
          animation={false}
        >
          {/* <Modal.Header closeButton> */}
          <Modal.Header>
            <div className="d-flex align-items-end">
              <div>
                {getImageURL(campaignDetails.image_url).map(image_url => (
                  <img
                    key="image"
                    src={image_url}
                    alt="App"
                    width="100px"
                    height="100px"
                  />
                ))}
              </div>
              <div className="ml-2">
                <div className="large-font">{campaignDetails.name}</div>
                <div className="font-italic light-color">
                  {campaignDetails.region}
                </div>
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h3 className="font-weight-bold">Pricing</h3>
              <div className="pricing">
                {campaignDetails.price.map(({ price, duration }, index) => (
                  <div className="price-grid  py-3" key={`price-${index}`}>
                    <div className="light-color">{duration}</div>
                    <div className="text-right font-weight-bold">{price}</div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <button className="modal-btn" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  })
);

export default AppModal;
