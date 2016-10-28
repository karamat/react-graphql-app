"use strict";

const util = require('util');

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType, 
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from './database'

const RegionEnum = new GraphQLEnumType({
  name: 'RegionEnum',
  values: {
    New_York: {value: 1, name: "New York" },
    San_Francisco: {value: 2, name: "San Francisco" },
    Miami: {value: 3, name: "Miami" }
  }
})

const ReligionEnum = new GraphQLEnumType({
  name: 'ReligionEnum',
  values: {
    christian: {value: 1, name: "Christian" },
    muslim: {value: 2, name: "Muslim" },
    hindu: {value: 3, name: "Hindu" },
    other: {value: 4, name: "Other" }
  }
})

const ProfessionEnum = new GraphQLEnumType({
  name: 'ProfessionEnum',
  values: {
    builder: {value: 1, name: "Builder" },
    programmer: {value: 2, name: "Programmer" },
    tester: {value: 3, name: "Tester" }
  }
})

const AgeType = new GraphQLObjectType({
  name: 'Age',
  fields: {
    min: { type: GraphQLInt },
    max: { type: GraphQLInt }
  }
});

const Profession = new GraphQLObjectType({
  name: 'Profession',
  fields: {
    name: { type: GraphQLString },
    value: { type: GraphQLInt }
  }
});

const Region = new GraphQLObjectType({
  name: 'Region',
  fields: {
    name: { type: GraphQLString },
    value: { type: GraphQLInt }
  }
});

const Religion = new GraphQLObjectType({
  name: 'Religion',
  fields: {
    name: { type: GraphQLString },
    value: { type: GraphQLInt }
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age : { type: AgeType },
    profession: { type: ProfessionEnum },
    religion: { type: ReligionEnum },
    region: { type: RegionEnum }
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      resolve(root) {
        return getUsers();
      }
    },
    user: {
      type: User,
      args: {
        id: {
          type: GraphQLID
        },
        name: {
          type: GraphQLString
        }
      },
      resolve: ( root, args ) => {
        return getUser(args);
      }
    },
    regions: {
      type: new GraphQLList(Region),
      resolve: () => {
        const regions = [];
        RegionEnum._values.forEach(a => {
          regions.push({name: a.name, value: a.value});
        });
        return regions;
      }
    },
    religions: {
      type: new GraphQLList(Religion),
      resolve: () => {
        const religions = [];
        ReligionEnum._values.forEach(a => {
          religions.push({name: a.name, value: a.value});
        });
        return religions;
      }
    },
    professions: {
      type: new GraphQLList(Profession),
      resolve: () => {
        const professions = [];
        ProfessionEnum._values.forEach(a => {
          professions.push({name: a.name, value: a.value});
        });
        return professions;
      }
    }
  })
});

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: AgeInput },
    profession: { type: ProfessionEnum },
    region: { type: RegionEnum },
    religion: { type: ReligionEnum },
    isMember: { type: GraphQLBoolean }
  })
});

const AgeInput = new GraphQLInputObjectType({
  name: 'AgeInput',
  fields: {
    min: { type: GraphQLInt },
    max: { type: GraphQLInt }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'UserMutations',
  fields: () => ({
    createUser: {
      type: User,
      args: {
        user: { type: UserInputType }
      },
      resolve: (root, { user }) => {
        return createUser(user);
      }
    },
    updateUser: {
      type: User,
      args: {
        user: { type: UserInputType }
      },
      resolve: (root, { user }) => {
        return updateUser(user);
      }
    },
    deleteUser: {
      type: GraphQLInt,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (root, { id }) => {
        return deleteUser(id);
      }
    }
  })
})

export const Schema = new GraphQLSchema({
  query: Query,
  mutation: MutationType
});
