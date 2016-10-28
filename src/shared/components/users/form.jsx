import React from 'react';
import { Link } from 'react-router';


export default class UserForm extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {};
    this._updateState = this._updateState.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._changeRegion = this._changeRegion.bind(this);
    this._changeReligion = this._changeReligion.bind(this);
    this._changeProfession = this._changeProfession.bind(this);
  }

  _updateState(update) {
    this.props.updateState(update);
    
  }

  _changeName(e) {
    this._updateState({name: e.target.value});
  }

  _changeMinAge(e) {
    this._updateState({age: {min: e.target.value, max: this.props.user.age.max}});
  }

  _changeMaxAge(e) {
    this._updateState({age: {min: this.props.user.age.min, max: e.target.value}});
  }

  _changeProfession(e) {
    this._updateState({profession: e.target.value});
  }

  _changeRegion(e) {
    this._updateState({region: e.target.value});
  }

  _changeReligion(e) {
    this._updateState({religion: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div>
          <label>Name</label>
          <input autoComplete="off" autoFocus type="text" name="name" onChange={this._changeName.bind(this)} value={this.props.user.name} />
        </div>
        <div>
          <label>Age</label>
          <input autoComplete="off" type="number" name="age[min]" onChange={this._changeMinAge.bind(this)} value={this.props.user.age.min} />
          <input autoComplete="off" type="number" name="age[max]" onChange={this._changeMaxAge.bind(this)} value={this.props.user.age.max} />
        </div>
        <div>
          <label>Profession</label>
          <select name="profession" onChange={this._changeProfession} value={this.props.user.profession}>
            { this.props.professions.map( p =>
              <option key={"profession-"+p.value} value={p.name}>{p.name}</option>
            )}
          </select>
        </div>
        <div>
          <label>Region</label>
          <select name="region" onChange={this._changeRegion} value={this.props.user.region}>
            { this.props.regions.map( p =>
              <option key={"region-"+p.value} value={p.name}>{p.name}</option>
            )}
          </select>
        </div>
        <div>
          <label>Religion</label>
          <select name="religion" onChange={this._changeReligion} value={this.props.user.religion}>
            { this.props.religions.map( p =>
              <option key={"religion-"+p.value} value={p.name}>{p.name}</option>
            )}
          </select>
        </div>
        <div>
          <button className="btn btn-default" type="submit">Save</button>
        </div>
     </form>
    );
  }
}