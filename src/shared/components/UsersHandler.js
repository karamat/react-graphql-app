import React from 'react';
import { Link } from 'react-router';


export default class UserHandler extends React.Component {
  render() {
    return (
      <div>
        <div>
          <li><Link to="/users/new">New User</Link></li>
          <li><Link to="/users/list">List Users</Link></li>
        </div>
        {this.props.children}
      </div>
    );
  }
}