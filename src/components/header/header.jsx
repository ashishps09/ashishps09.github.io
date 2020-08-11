import React from "react";
import { useDispatch } from "react-redux";
import "./header.scss";
import logo from "../../assets/bluestacks_logo_cut.png";
import { connect } from "react-redux";
import { SET_LOCALE_LANG } from "../../store/actions/types";
import { FormattedMessage } from "react-intl";
function AppHeader(props) {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <main className="app-header d-flex align-items-center justify-content-between flex-wrap">
        <header className="app-header-logo d-flex flex-wrap">
          <img alt="Bluestacks logo" src={logo} width="50px" height="45px" />
          <div className="d-flex flex-column ml-3 mt-2">
            <FormattedMessage
              id="app.header_title"
              defaultMessage="Bluestacks"
            ></FormattedMessage>
            <FormattedMessage
              id="app.header_phrase"
              defaultMessage="Play Bigger"
            ></FormattedMessage>
          </div>
        </header>
        <div className="my-2">
          <select
            className="form-control cursor-pointer"
            onChange={e =>
              dispatch({ type: SET_LOCALE_LANG, payload: e.target.value })
            }
            value={props.lang.val}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </main>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  lang: state.language
});

export default connect(
  mapStateToProps,
  {}
)(AppHeader);
