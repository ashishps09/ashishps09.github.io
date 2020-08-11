import React, { useRef } from "react";
import "./campaignTable.scss";
import AppCalendar from "../../../../components/appCalendar/appCalendar";
import { FormattedMessage } from "react-intl";
// import { FormattedHTMLMessage, FormattedMessage } from "react-intl";
const CampaignTable = ({
  tableData,
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
      <div className="campaigns-table-container shadow">
        <div className="grid-row grid-header-row">{children}</div>
        {tableData.map((c, index) => (
          <div className="grid-row grid-body-row" key={index}>
            <div>
              <div className="grid-large-font">
                {getCampaignDate(c.createdOn)}
              </div>
              <div className="font-italic grid-light-color">
                {getDateDiff(c.createdOn)}
              </div>
            </div>
            <div className="d-flex align-items-center">
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
                <div className="font-italic grid-light-color">{c.region}</div>
              </div>
            </div>
            <div className="d-flex align-items-center flex-wrap">
              <div className="d-flex align-items-center flex-wrap">
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
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <a href={c.csv} className="d-flex align-items-center flex-wrap">
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
                className="d-flex align-items-center flex-wrap mx-2"
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
              <div className="d-flex align-items-center flex-wrap">
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
        ))}
      </div>
      {tableData.length < 1 && (
        <h3 className="text-center p-4">No {selectedCampaignType[0].name}</h3>
      )}
      <AppCalendar ref={calendarRef} />
    </React.Fragment>
  );
};

export default CampaignTable;
