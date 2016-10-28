import React from 'react';
const _ = require('lodash');

export default class Users extends React.Component {
  
  constructor () {
    super();
    this.state = { users: [] };
    this._editUser = this._editUser.bind(this);
    this._removeUser = this._removeUser.bind(this);
    this._deleteUser = this._deleteUser.bind(this);

  }

  componentWillMount () {
    fetch('/graphql', { 
        method: 'POST', 
        body: '{ users { id, name, age {min, max}, profession, religion, region } }', 
        headers: {"Content-Type":"application/graphql"
      } 
    }).then ( (res) => {
      return res.json();
    }).then( (json) => {
      this.setState({users: json.data.users});
    });
  }

  _editUser(e) {
    const id = e.target.parentElement.parentElement.id;
    this.props.router.push(`/users/edit?id=${id}`);
  }

  _deleteUser(e) {
    const id = e.target.parentElement.parentElement.id;
    let removeUser = this._removeUser;
    let query = `mutation UserMutations { 
                  deleteUser ( 
                    id: ${id}
                  )
                }`
    fetch('/graphql', { 
        method: 'POST', 
        body: query, 
        headers: {"Content-Type":"application/graphql"
      } 
    }).then ( (res) => {
      removeUser(id);
    });

  }

  _removeUser(id) {
    this.setState({users: _.reject(this.state.users, (a) => a.id == id)}); 
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          { this.state.users.map( user =>
            <li key={"user-" + user.id} id={user.id}>
              <pre>{JSON.stringify(user, null, 2)}</pre>
              <div className="actions">
                <a onClick={this._editUser}>Edit</a>
                {" . "}
                <a onClick={this._deleteUser}>Delete</a>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
}