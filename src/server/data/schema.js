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
    New_York: {value: 0, name: "New York" },
    San_Francisco: {value: 1, name: "San Francisco" },
    Miami: {value: 2, name: "Miami" }
  }
})

const ReligionEnum = new GraphQLEnumType({
  name: 'ReligionEnum',
  values: {
    christian: {value: 0, name: "Christian" },
    muslim: {value: 1, name: "Muslim" },
    hindu: {value: 2, name: "Hindu" },
    other: {value: 3, name: "Other" }
  }
})

const ProfessionEnum = new GraphQLEnumType({
  name: 'ProfessionEnum',
  values: {
    builder: {value: 0, name: "Builder" },
    programmer: {value: 1, name: "Programmer" },
    tester: {value: 2, name: "Tester" }
  }
})

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    }
  }
});

const Profession = new GraphQLObjectType({
  name: 'Profession',
  fields: {
    name: {
      type: GraphQLString
    },
    value: {
      type: GraphQLInt
    }
  }
});

const Region = new GraphQLObjectType({
  name: 'Region',
  fields: {
    name: {
      type: GraphQLString
    },
    value: {
      type: GraphQLInt
    }
  }
});

const Religion = new GraphQLObjectType({
  name: 'Religion',
  fields: {
    name: {
      type: GraphQLString
    },
    value: {
      type: GraphQLInt
    }
  }
});

const AgeInput = new GraphQLInputObjectType({
  name: 'AgeInput',
  fields: {
    min: {
      type: GraphQLInt
    },
    max: {
      type: GraphQLInt
    }
  }
});


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      resolve(obj) {
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
      resolve: (obj) => {
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
      type: User,
      args: {
        user: { type: UserInputType }
      },
      resolve: (root, { user }) => {
        return deleteUser(user);
      }
    }
  })
})

export const Schema = new GraphQLSchema({
  query: Query,
  mutation: MutationType
});
