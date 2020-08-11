import React, { useRef } from "react";
import "./cardsContainer.scss";
import AppCalendar from "../../../../components/appCalendar/appCalendar";
import { FormattedMessage } from "react-intl";
const CardsContainer = ({
  cardsData,
  showPricing,
  selectedCampaignType,
  children
}) => {
  const calendarRef = useRef();
  const getCampaignDate = campaignDate => {
    let date = new Date(campaignDate);
    const monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    let dateToShow = `${
      monthArray[date.getMonth()]
    } ${date.getFullYear()}, ${date.getDate()}`;

    return <span>{dateToShow}</span>;
  };

  const getDateDiff = campaignDate => {
    let dateToShow;
    const date = new Date();
    const todaysDate = date.getTime();
    const difference = campaignDate - todaysDate;
    const diffInDays = Math.floor(difference / (1000 * 3600 * 24));
    if (Math.sign(diffInDays) === 1) {
      dateToShow = `${Math.abs(diffInDays)} days ahead`;
    } else if (Math.sign(diffInDays) === 0) {
      dateToShow = `Today`;
    } else {
      dateToShow = `${Math.abs(diffInDays)} days ago`;
    }
    return <span>{dateToShow}</span>;
  };

  return (
    <React.Fragment>
      <div className="campaigns-cards-container d-flex justify-content-between flex-wrap mt-4">
        {cardsData.map((c, index) => (
          <div
            className="d-flex flex-column justify-content-between shadow campaigns-cards p-4 flex-fill flex-wrap"
            key={index}
          >
            <div className="d-flex flex-fill justify-content-between flex-wrap mb-3">
              <div className="d-flex justify-content-start mr-3 mb-2">
                <div className="d-flex align-items-start">
                  <div>
                    <img
                      src={require("../../../../assets/icons/" + c.image_url)}
                      alt="App"
                      width="40px"
                      height="40px"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="grid-large-font">{c.name}</div>
                    <div className="font-italic grid-light-color">
                      {c.region}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <div className="grid-large-font">
                    {getCampaignDate(c.createdOn)}
                  </div>
                  <div className="font-italic grid-light-color">
                    {getDateDiff(c.createdOn)}
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap mt-2">
                  <div
                    onClick={() => calendarRef.current.handleShow(c)}
                    className="cursor-pointer mr-2"
                  >
                    <img
                      src={require("../../../../assets/icons/calendar.png")}
                      alt="Calendar"
                      width="25px"
                      height="25px"
                    />
                  </div>
                  <div
                    onClick={() => calendarRef.current.handleShow(c)}
                    className="cursor-pointer"
                  >
                    <FormattedMessage
                      id="app.grid_schedule_again"
                      defaultMessage="Schedule Again"
                    ></FormattedMessage>
                  </div>
                </div>
              </div>
            </div>
            <div className="check-detail d-flex align-items-center justify-content-between flex-wrap mt-2 flex-fill">
              <div className="d-flex align-items-center flex-wrap mt-2">
                <div
                  className="cursor-pointer mr-2"
                  onClick={() => showPricing(c)}
                >
                  <img
                    src={require("../../../../assets/icons/Price.png")}
                    alt="Price"
                    width="25px"
                    height="25px"
                  />
                </div>
                <div className="cursor-pointer" onClick={() => showPricing(c)}>
                  <FormattedMessage
                    id="app.grid_view_pricing"
                    defaultMessage="View Pricing"
                  ></FormattedMessage>
                </div>
              </div>
              <a
                href={c.csv}
                className="d-flex align-items-center flex-wrap mt-2 mx-3"
              >
                <div className="cursor-pointer mr-2">
                  <img
                    src={require("../../../../assets/icons/file.png")}
                    alt="CSV"
                    width="25px"
                    height="25px"
                  />
                </div>
                <div className="cursor-pointer">
                  <FormattedMessage
                    id="app.grid_csv"
                    defaultMessage="CSV"
                  ></FormattedMessage>
                </div>
              </a>
              <a
                href={c.report}
                className="d-flex align-items-center flex-wrap mt-2"
              >
                <div className="cursor-pointer mr-2">
                  <img
                    src={require("../../../../assets/icons/statistics-report.png")}
                    alt="Report"
                    width="25px"
                    height="25px"
                  />
                </div>
                <div className="cursor-pointer">
                  <FormattedMessage
                    id="app.grid_report"
                    defaultMessage="Report"
                  ></FormattedMessage>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
      {cardsData.length < 1 && (
        <h3 className="text-center p-4">No {selectedCampaignType[0].name}</h3>
      )}
      <AppCalendar ref={calendarRef} />
    </React.Fragment>
  );
};

export default CardsContainer;
