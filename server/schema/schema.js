const graphql = require('graphql');
const { GraphQLString, GraphQLInt, GraphQLID } = graphql;
const Project = require('../models/project');
const Task = require('../models/task');

const TaskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: TaskType,
      resolve: (parent, args) => {
        return Project.findById(parent.projectId);
      }
    }
  })
});

const ProjectType = new graphql.GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new graphql.GraphQLList(TaskType),
      resolve: (parent, args) => {
        return Task.find({ projectId: parent.id });
      }
    }
  })
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return Task.findById(args.id);
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      }
    },
    tasks: {
      type: new graphql.GraphQLList(TaskType),
      resolve: () => Task.find({})
    },
    projects: {
      type: new graphql.GraphQLList(ProjectType),
      resolve: () => Project.find({})
    }
  })
});

const Mutation = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new graphql.GraphQLNonNull(GraphQLString) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const newProject = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        return newProject.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new graphql.GraphQLNonNull(GraphQLString) },
        weight: { type: new graphql.GraphQLNonNull(GraphQLInt) },
        description: { type: new graphql.GraphQLNonNull(GraphQLString) },
        projectId: { type: new graphql.GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        const newTask = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description
        });
        return newTask.save();
      }
    }
  })
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
