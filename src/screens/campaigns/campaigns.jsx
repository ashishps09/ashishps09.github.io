import React, { Component } from "react";
import "./campaigns.scss";
import MenuBar from "../../components/menuBar/menuBar";
import AppModal from "../../components/appModal/appModal";
import { connect } from "react-redux";
import { getCampaigns } from "../../store/actions/campaignAction";
import CampaignTable from "./component/campaignTable/campaignTable";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import CardsContainer from "./component/cardsContainer/cardsContainer";

class Campaigns extends Component {
  state = {
    menuDataArray: [
      { name: "Upcoming Campaigns", selected: true },
      { name: "Live Campaigns", selected: false },
      { name: "Past Campaigns", selected: false }
    ],
    totalCampaigns: [],
    campaignsToShow: []
  };

  constructor(props) {
    super(props);
    // Getting called to get campaigns
    this.props.getCampaigns();
    this.modalRef = React.createRef();
  }

  // When campaigns got retrieved in campaign saga it will recieve props and update accordingly
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, totalCampaigns: nextProps.campaigns }, () =>
      this.showSelectedMenuData()
    );
  }

  // On change of menu selection
  onMenuChange = selectedName => {
    this.state.menuDataArray.map(m => {
      if (m.name === selectedName) {
        m.selected = true;
      } else {
        m.selected = false;
      }
      return m;
    });
    this.setState(
      { ...this.state, menuDataArray: this.state.menuDataArray },
      () => this.showSelectedMenuData()
    );
  };

  // To filter data based on selected menu
  showSelectedMenuData = () => {
    let selectedMenu = this.getSelectedMenuName();
    let todaysDate = new Date();
    let currentTime = todaysDate.getTime();
    let campaignsToShow;
    switch (selectedMenu[0].name) {
      case "Upcoming Campaigns":
        campaignsToShow = this.state.totalCampaigns.data.filter(campaigns => {
          if (currentTime < campaigns.createdOn) {
            return campaigns;
          }
        });
        break;
      case "Live Campaigns":
        campaignsToShow = this.state.totalCampaigns.data.filter(campaigns => {
          let dateToday = this.getDateformatted(currentTime);
          let campaignDate = this.getDateformatted(campaigns.createdOn);
          if (dateToday === campaignDate) {
            return campaigns;
          }
        });
        break;
      case "Past Campaigns":
        campaignsToShow = this.state.totalCampaigns.data.filter(campaigns => {
          if (currentTime > campaigns.createdOn) {
            return campaigns;
          }
        });
        break;
      default:
        campaignsToShow = [];
        break;
    }
    this.setState({
      ...this.state,
      campaignsToShow
    });
  };

  getDateformatted = date => {
    const dateTobeFormatted = new Date(date);
    const year = dateTobeFormatted.getFullYear();
    const month = dateTobeFormatted.getMonth() + 1;
    const day = dateTobeFormatted.getDate();
    return `${year}-${month}-${day}`;
  };

  getSelectedMenuName = () => {
    return this.state.menuDataArray.filter(selectedMenu => {
      if (selectedMenu.selected) {
        return selectedMenu;
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="screen-container campaigns">
          <main>
            <div className="page-header">
              <FormattedMessage
                id="app.campaigns_title"
                defaultMessage="Manage Campaigns"
              ></FormattedMessage>
            </div>
            <MenuBar
              menuData={this.state.menuDataArray}
              handleMenuChange={this.onMenuChange}
            />

            <div className="campaign-table">
              <CampaignTable
                tableData={this.state.campaignsToShow}
                showPricing={details =>
                  this.modalRef.current.handleShow(details)
                }
                selectedCampaignType={this.getSelectedMenuName()}
              >
                <div>
                  <FormattedMessage
                    id="app.grid_date_column"
                    defaultMessage="DATE"
                  ></FormattedMessage>
                </div>
                <div>
                  <FormattedMessage
                    id="app.grid_campaign_column"
                    defaultMessage="CAMPAIGN"
                  ></FormattedMessage>
                </div>
                <div>
                  <FormattedMessage
                    id="app.grid_view_column"
                    defaultMessage="VIEW"
                  ></FormattedMessage>
                </div>
                <div>
                  <FormattedMessage
                    id="app.grid_action_column"
                    defaultMessage="ACTIONS"
                  ></FormattedMessage>
                </div>
              </CampaignTable>
            </div>
            <div className="cards-container">
              <CardsContainer
                cardsData={this.state.campaignsToShow}
                showPricing={details =>
                  this.modalRef.current.handleShow(details)
                }
                selectedCampaignType={this.getSelectedMenuName()}
              />
            </div>
          </main>
        </div>
        <AppModal ref={this.modalRef} />
      </React.Fragment>
    );
  }
}

Campaigns.propTypes = {
  campaigns: PropTypes.object.isRequired,
  getCampaigns: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
  getCampaigns: () => dispatch(getCampaigns())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaigns);
