import React from 'react';
import { Router, Link } from 'react-router';
import UserForm from "./form";
const util = require('util');



export default class UsersNew extends React.Component {

  constructor () {
    super();
    this.state = { 
      professions: [ {name: 'Select profession', value: 0} ],
      religions: [ {name:'Select religion', value: 0} ],
      regions: [ {name: 'Select region', value: 0} ],
      user: { name: '', age: {min: '', max: ''}, profession: '', region: '', religion: '' }

    };
    this._updateState = this._updateState.bind(this); 
    this._submitForm = this._submitForm.bind(this);
    this._redirectToList = this._redirectToList.bind(this);

  }

  componentWillMount () {
    fetch('/graphql', { 
      method: 'POST', 
      body: `{ professions { name, value } regions { name, value } religions { name, value } }`, 
      headers: {"Content-Type":"application/graphql"} 
    }).then ( (res) => {
      return res.json();
    }).then( (json) => {
      let professions = this.state.professions.concat(json.data.professions);
      let religions = this.state.religions.concat(json.data.religions);
      let regions = this.state.regions.concat(json.data.regions);

      this.setState({professions, religions, regions});
    });
  }

  _submitForm() {
    const user = this.state.user;
    let query = `mutation UserMutations { 
                  createUser ( 
                    user: { 
                      name: "${user.name}",
                      age: { 
                        min: ${user.age.min},
                        max: ${user.age.max}
                      },
                      profession: ${user.profession},
                      religion: ${user.religion},
                      region: ${user.region}
                    }
                  ) { id, name, age { min, max }, profession, religion, region }
                }`

    fetch('/graphql', { 
        method: 'POST', 
        body: query, 
        headers: {"Content-Type":"application/graphql"
      } 
    }).then ( (res) => {
      this._redirectToList();
    });
  }

  _redirectToList() {
    this.props.router.push('/users');
  }

  _updateState(update) {
    let user = Object.assign({}, this.state.user, update);
    this.setState(Object.assign({}, this.state, { user: user }));
   }

  render() {
    return (
      <div>
       <UserForm professions={this.state.professions} regions={this.state.regions} 
       religions={this.state.religions} onSubmit={this._submitForm} updateState={this._updateState} user={this.state.user}></UserForm>
      </div>
    );
  }
}