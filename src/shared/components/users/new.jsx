import React from 'react';
import { Link } from 'react-router';
import UserForm from "./form";
const util = require('util');



export default class UsersNew extends React.Component {

  constructor () {
    super();
    this.state = { 
      professions: [],
      religions: [],
      regions: []
    };
    this._submitForm = this._submitForm.bind(this);
  }

  componentWillMount () {
    fetch('/graphql', { 
      method: 'POST', 
      body: `{ professions { name, value } regions { name, value } religions { name, value } }`, 
      headers: {"Content-Type":"application/graphql"} 
    }).then ( (res) => {
      return res.json();
    }).then( (json) => {
      this.setState({
        professions: json.data.professions,
        religions: json.data.religions,
        regions: json.data.regions
      });
    });
  }

  _submitForm(data) {
    let query = 'mutation UserMutations{ createUser { user: { name: "'+data.name+'", age: { min: '+ data.age.min + ', max: '+ data.age.max +' } } } }';
    query = query.replace('\n','');
    console.log(query);
    fetch('/graphql', { 
        method: 'POST', 
        body: query, 
        headers: {"Content-Type":"application/graphql"
      } 
    }).then ( (res) => {
      return res.json();
    })
  }

  render() {
    return (
      <div>
       <UserForm professions={this.state.professions} regions={this.state.regions} 
       religions={this.state.religions} onSubmit={this._submitForm}></UserForm>
      </div>
    );
  }
}