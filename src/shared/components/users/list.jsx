import React from 'react';

export default class Users extends React.Component {
  
  constructor () {
    super();
    this.state = { users: [] };
  }

  componentWillMount () {
    fetch('/graphql', { 
        method: 'POST', 
        body: '{ users { id, name } }', 
        headers: {"Content-Type":"application/graphql"
      } 
    }).then ( (res) => {
      return res.json();
    }).then( (json) => {
      this.setState({users: json.data.users});
    });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          { this.state.users.map( user =>
            <li>{user.id} - {user.name}</li>
          )}
        </ul>
      </div>
    );
  }
}