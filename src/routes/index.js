import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Campaigns from "../screens/campaigns/campaigns";
const Routes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/">
          <Redirect to="campaigns" />
        </Route>
        <Route path="/campaigns" exact component={Campaigns} />
        <Route
          path="**"
          exact
          component={() => {
            return (
              <h1 className="d-flex justify-content-center align-item-center p-4">
                404 Not Found
              </h1>
            );
          }}
        />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
