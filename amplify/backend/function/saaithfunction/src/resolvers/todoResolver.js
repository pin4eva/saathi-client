const { AWS_CONFIG, dynamo } = require("../utils/config");
const { v4: uuid } = require("uuid");
const { authentication } = require("../utils/authentication");

const params = {
  TableName: AWS_CONFIG.aws_table_item,
};
const TableName = AWS_CONFIG.aws_table_item;

module.exports = {
  Query: {
    getTodos: async () => {
      try {
        const data = await dynamo.scan(params).promise();

        return data.Items;
      } catch (error) {
        throw new Error(error);
      }
    },
    getUserTodos: async (_, args, { token }) => {
      const user = await authentication(token);
      if (!user) throw Error("Unauthorized access");
      try {
        const todo = await dynamo
          .query({
            TableName,
            KeyConditionExpression: "userId = :n1",
            // ExpressionAttributeNames: {},
            ExpressionAttributeValues: {
              ":n1": user.id,
            },
          })
          .promise();
        console.log(todo);
        return todo.Items;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addTodo: async (_, { title, body }, { token }) => {
      const user = await authentication(token);
      if (!user) throw new Error("Invalid token provided");
      const id = uuid();

      try {
        await dynamo
          .put({
            TableName,

            Item: {
              id,
              title,
              body,
              completed: false,
              userId: user.id,
            },
          })
          .promise();

        return {
          id,
          userId: user.id,
          completed: false,
          title,
          body,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTodo: async (_, { id, title, body }) => {
      try {
        const data = await dynamo
          .update({
            TableName: AWS_CONFIG.aws_table_item,
            Key: { id },
            UpdateExpression: "set title = :n1,body = :n2",
            ExpressionAttributeValues: {
              ":n1": title,
              ":n2": body,
            },
            ReturnValues: "UPDATED_NEW",
          })
          .promise();

        return { ...data.Attributes, id };
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        await dynamo
          .delete({ TableName: AWS_CONFIG.aws_table_item, Key: { id } })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteAllTodos: async (_, { id }) => {
      try {
        const todo = await dynamo
          .delete({
            TableName: AWS_CONFIG.aws_table_item,
            Key: { complete: null },
          })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    markCompleted: async (_, { id }) => {
      try {
        await dynamo
          .update({
            TableName: AWS_CONFIG.aws_table_item,
            Key: { id },
            UpdateExpression: "set completed = :n1",
            ExpressionAttributeValues: { ":n1": true },
          })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
