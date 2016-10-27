import React from 'react';
import { Link } from 'react-router';


export default class UserForm extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = { name: '', age: {min: '', max: ''}, professions: '', regions: '', religions: '' };
    this._updateState = this._updateState.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._changeRegion = this._changeRegion.bind(this);
    this._changeReligion = this._changeReligion.bind(this);
    this._changeProfession = this._changeProfession.bind(this);
  }

  _updateState(update) {
    this.setState(Object.assign({},this.state, update));
  }

  _changeName(e) {
    this._updateState({name: e.target.value});
  }

  _changeMinAge(e) {
    this._updateState({age: {min: e.target.value, max: this.state.age.max}});
  }

  _changeMaxAge(e) {
    this._updateState({age: {min: this.state.age.min, max: e.target.value}});
  }

  _changeProfession(e) {
    this._updateState({professions: e.target.value});
  }

  _changeRegion(e) {
    this._updateState({regions: e.target.value});
  }

  _changeReligion(e) {
    this._updateState({religions: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div>
          <label>Name</label>
          <input autoComplete="off" autoFocus type="text" name="name" onChange={this._changeName.bind(this)} value={this.state.name} />
        </div>
        <div>
          <label>Age</label>
          <input autoComplete="off" type="number" name="age[min]" onChange={this._changeMinAge.bind(this)} value={this.state.age.min} />
          <input autoComplete="off" type="number" name="age[max]" onChange={this._changeMaxAge.bind(this)} value={this.state.age.max} />
        </div>
        <div>
          <label>Profession</label>
          <select name="profession" onChange={this._changeProfession}>
            { this.props.professions.map( p =>
              <option value={p.name}>{p.name}</option>
            )}
          </select>
        </div>
        <div>
          <label>Region</label>
          <select name="region" onChange={this._changeRegion}>
            { this.props.regions.map( p =>
              <option value={p.name}>{p.name}</option>
            )}
          </select>
        </div>
        <div>
          <label>Religion</label>
          <select name="religion" onChange={this._changeReligion}>
            { this.props.religions.map( p =>
              <option value={p.name}>{p.name}</option>
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