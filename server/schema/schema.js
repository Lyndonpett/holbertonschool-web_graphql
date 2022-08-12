const graphql = require('graphql');
const { GraphQLString, GraphQLInt } = graphql;

const TaskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  }),
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {},
    },
  }),
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
});

module.exports = schema;
