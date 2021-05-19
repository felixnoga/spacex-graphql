const { default: axios } = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const { LaunchType, RocketType } = require('./types/spaceXTypes');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get('https://api.spacexdata.com/v4/launches')
          .then((res) => res.data);
      },
    },
    launch: {
      type: LaunchType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then((res) => res.data);
      },
    },
    rocket: {
      type: RocketType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${args.id}`)
          .then((res) => res.data);
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve() {
        return axios
          .get('https://api.spacexdata.com/v4/rockets')
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
