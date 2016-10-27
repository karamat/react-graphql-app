import { Router, Route, Link, browserHistory } from "react-router";  
import React from "react";
import AppHandler from "./components/AppHandler";
import UsersHandler from "./components/UsersHandler";
import UsersList from "./components/users/list";
import UsersNew from "./components/users/new";
import UsersEdit from "./components/users/edit";


export default (
  <Router history={browserHistory} >
    <Route path="/" component={ AppHandler } >
      <Route path="users" component={ UsersHandler }>
        <Route path="list" component={ UsersList}></Route>
        <Route path="new" component={ UsersNew }></Route>
        <Route path="edit" component={ UsersEdit }></Route>
      </Route>
    </Route>
  </Router>
);
