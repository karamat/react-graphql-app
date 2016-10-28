"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _database = require('./database');

var util = require('util');

var RegionEnum = new _graphql.GraphQLEnumType({
  name: 'RegionEnum',
  values: {
    New_York: { value: 1, name: "New York" },
    San_Francisco: { value: 2, name: "San Francisco" },
    Miami: { value: 3, name: "Miami" }
  }
});

var ReligionEnum = new _graphql.GraphQLEnumType({
  name: 'ReligionEnum',
  values: {
    christian: { value: 1, name: "Christian" },
    muslim: { value: 2, name: "Muslim" },
    hindu: { value: 3, name: "Hindu" },
    other: { value: 4, name: "Other" }
  }
});

var ProfessionEnum = new _graphql.GraphQLEnumType({
  name: 'ProfessionEnum',
  values: {
    builder: { value: 1, name: "Builder" },
    programmer: { value: 2, name: "Programmer" },
    tester: { value: 3, name: "Tester" }
  }
});

var AgeType = new _graphql.GraphQLObjectType({
  name: 'Age',
  fields: {
    min: { type: _graphql.GraphQLInt },
    max: { type: _graphql.GraphQLInt }
  }
});

var Profession = new _graphql.GraphQLObjectType({
  name: 'Profession',
  fields: {
    name: { type: _graphql.GraphQLString },
    value: { type: _graphql.GraphQLInt }
  }
});

var Region = new _graphql.GraphQLObjectType({
  name: 'Region',
  fields: {
    name: { type: _graphql.GraphQLString },
    value: { type: _graphql.GraphQLInt }
  }
});

var Religion = new _graphql.GraphQLObjectType({
  name: 'Religion',
  fields: {
    name: { type: _graphql.GraphQLString },
    value: { type: _graphql.GraphQLInt }
  }
});

var User = new _graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: _graphql.GraphQLID },
    name: { type: _graphql.GraphQLString },
    age: { type: AgeType },
    profession: { type: ProfessionEnum },
    religion: { type: ReligionEnum },
    region: { type: RegionEnum }
  }
});

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      users: {
        type: new _graphql.GraphQLList(User),
        resolve: function resolve(root) {
          return (0, _database.getUsers)();
        }
      },
      user: {
        type: User,
        args: {
          id: {
            type: _graphql.GraphQLID
          },
          name: {
            type: _graphql.GraphQLString
          }
        },
        resolve: function resolve(root, args) {
          return (0, _database.getUser)(args);
        }
      },
      regions: {
        type: new _graphql.GraphQLList(Region),
        resolve: function resolve() {
          var regions = [];
          RegionEnum._values.forEach(function (a) {
            regions.push({ name: a.name, value: a.value });
          });
          return regions;
        }
      },
      religions: {
        type: new _graphql.GraphQLList(Religion),
        resolve: function resolve() {
          var religions = [];
          ReligionEnum._values.forEach(function (a) {
            religions.push({ name: a.name, value: a.value });
          });
          return religions;
        }
      },
      professions: {
        type: new _graphql.GraphQLList(Profession),
        resolve: function resolve() {
          var professions = [];
          ProfessionEnum._values.forEach(function (a) {
            professions.push({ name: a.name, value: a.value });
          });
          return professions;
        }
      }
    };
  }
});

var UserInputType = new _graphql.GraphQLInputObjectType({
  name: 'UserInput',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLInt },
      name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      age: { type: AgeInput },
      profession: { type: ProfessionEnum },
      region: { type: RegionEnum },
      religion: { type: ReligionEnum },
      isMember: { type: _graphql.GraphQLBoolean }
    };
  }
});

var AgeInput = new _graphql.GraphQLInputObjectType({
  name: 'AgeInput',
  fields: {
    min: { type: _graphql.GraphQLInt },
    max: { type: _graphql.GraphQLInt }
  }
});

var MutationType = new _graphql.GraphQLObjectType({
  name: 'UserMutations',
  fields: function fields() {
    return {
      createUser: {
        type: User,
        args: {
          user: { type: UserInputType }
        },
        resolve: function resolve(root, _ref) {
          var user = _ref.user;

          return (0, _database.createUser)(user);
        }
      },
      updateUser: {
        type: User,
        args: {
          user: { type: UserInputType }
        },
        resolve: function resolve(root, _ref2) {
          var user = _ref2.user;

          return (0, _database.updateUser)(user);
        }
      },
      deleteUser: {
        type: _graphql.GraphQLInt,
        args: {
          id: { type: _graphql.GraphQLInt }
        },
        resolve: function resolve(root, _ref3) {
          var id = _ref3.id;

          return (0, _database.deleteUser)(id);
        }
      }
    };
  }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: MutationType
});