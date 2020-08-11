import React from "react";
import "./App.scss";
import AppHeader from "./components/header/header";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { IntlProvider } from "react-intl";
import messages from "./translations/messages";
import { connect } from "react-redux";
function App(props) {
  return (
    <React.Fragment>
      <IntlProvider locale="hi" messages={messages[props.lang.val]}>
        <Router>
          <AppHeader />
          <Routes />
        </Router>
      </IntlProvider>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  lang: state.language
});

export default connect(
  mapStateToProps,
  {}
)(App);

// merge and push check
