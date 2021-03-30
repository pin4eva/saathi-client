const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { authentication } = require("../utils/authentication");
const sgMail = require("@sendgrid/mail");
const { nanoid } = require("nanoid");
const { dynamo } = require("../utils/config");
const { config } = require("../utils/config");

sgMail.setApiKey(process.env.SENDGRID_API);

("use strict");

const TableName = config.AWS_CONFIG.aws_table_user;
module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await dynamo.scan({ TableName }).promise();

        return users.Items;
      } catch (error) {
        throw new Error(error);
      }
    },
    auth: async (_, args, { token }) => {
      let authUser = await authentication(token);
      if (!authUser) return null;
      const user = await dynamo
        .get({
          TableName,
          Key: { email: authUser.email },
        })
        .promise();

      return user.Item;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      const { email, password, username, name } = input;
      if (!email || !password) throw new Error("Please provide a valid email");
      const id = uuid();

      let user = await dynamo.get({ TableName, Key: { email } }).promise();
      if (user.Item) throw new Error("User with same email already exist");

      try {
        const info = {
          id,
          email,
          username,
          name,
          password: await bcrypt.hash(password, 10),
          otp: nanoid(5),
        };

        const mailOptions = {
          from: "hello.gojeje@gmail.com",
          to: email,
          subject: "Please confirm your account",
          html: `
          <h2 align="center">Your OTP is ${info.otp} </h2>
          `,
        };
        await sgMail.send(mailOptions).catch((err) => console.log(err));

        await dynamo
          .put({
            TableName,
            Item: {
              ...info,
            },
          })
          .promise();

        return {
          ...input,
          id,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_, { email, password }, { res }) => {
      try {
        let user = await dynamo
          .get({
            TableName,
            Key: { email },
          })
          .promise();
        if (!user) throw new Error("No record found");

        const isMatch = bcrypt.compareSync(password, user.Item.password);
        if (!isMatch) throw new Error("Email or password is not correct");
        const payload = {
          id: user.Item.id,
          timeIn: Date.now(),
          email: user.Item.email,
        };

        const token = sign(payload, config.SECRET);

        return {
          ...user.Item,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    verifyToken: async (_, { otp }) => {
      try {
        let user = await dynamo
          .scan({
            TableName,
            FilterExpression: "otp = :otp",
            ExpressionAttributeValues: {
              ":otp": otp,
            },
          })
          .promise();

        user = user.Items[0];

        if (otp !== user.otp) throw new Error("Invalid token");

        user = await dynamo
          .update({
            TableName,
            Key: { email: user.email },
            UpdateExpression: "set otp = :n1",
            ExpressionAttributeValues: {
              ":n1": "",
            },
          })
          .promise();

        const payload = {
          id: user.id,
          timeIn: Date.now(),
          email: user.email,
        };

        const token = sign(payload, config.SECRET);

        return {
          ...user,
          otp: "",
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    googleLogin: async (_, { googleId }) => {
      try {
        let user = await dynamo
          .scan({
            TableName,
            FilterExpression: "googleId = :n1",
            ExpressionAttributeValues: {
              ":n1": googleId,
            },
          })
          .promise();

        user = user.Items[0];

        const payload = {
          id: user.id,
          timeIn: Date.now(),
          email: user.email,
        };

        const token = sign(payload, config.SECRET);

        return {
          ...user,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    googleSignup: async (_, { input }) => {
      const { email } = input;

      const id = uuid();
      try {
        let user = await dynamo
          .get({
            TableName,
            Key: { email },
          })
          .promise();

        if (user && user.Item && user.Item.email)
          throw Error("The email address is already registered, Login instead");

        user = await dynamo
          .put({
            TableName,
            Item: {
              ...input,
              id,
            },
          })
          .promise();

        const payload = {
          id: user.id,
          timeIn: Date.now(),
          email: input.email,
        };

        const token = sign(payload, config.SECRET);

        return {
          ...input,
          id,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (_, { email }) => {
      try {
        await dynamo.delete({ TableName, Key: { email } }).promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
