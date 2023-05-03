const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { GraphQLError } = require("graphql");
module.exports = async (req) => {
  const authHeader = req?.headers?.authorization || "";
  let isAuth = false;
  let token = "";
  let decodeToken;
  if (!authHeader) {
    return { isAuth, userId: "" };
  }

  if (typeof authHeader === "string") {
    const authData = authHeader.split(" ");
    if (authData.length > 1) {
      token = authData[1];
    } else {
      token = authData[0];
    }
  }
  if (!token || token === "") {
    return { isAuth, userId: "" };
  }
  try {
    decodeToken = jwt.verify(token, "someSuperSecretKey");
    const { userId } = decodeToken;
    const user = await User.findById(userId);
    if (user) {
      return { isAuth: true, userId };
    } else {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
  } catch (err) {
    throw new GraphQLError("User is not authenticated", {
      extensions: {
        code: "UNAUTHENTICATED",
        http: { status: 401 },
      },
    });
  }
};
