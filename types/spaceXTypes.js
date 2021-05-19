const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLSchema,
} = require('graphql');

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    small: { type: GraphQLString },
    large: { type: GraphQLString },
  }),
});

const PatchType = new GraphQLObjectType({
  name: 'Patch',
  fields: () => ({
    patch: { type: ImageType },
  }),
});

exports.LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    id: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: { type: GraphQLString },
    details: { type: GraphQLString },
    links: { type: PatchType },
  }),
});

exports.RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) },
  }),
});
