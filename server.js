const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const Auth = require("./middleware/auth");
const mongoURL =
  "mongodb+srv://mhddanish111:Danish%40123@cluster0.i3tvjgf.mongodb.net/banking_system?retryWrites=true&w=majority";
require("./models").connect(mongoURL);
dotenv.config();
const schema = require("./schema");
const app = express();
app.use(cors());
// app.use(Auth);
const apolloSetup = new ApolloServer({
  schema,
  context:async ({ req }) => {
    return await Auth(req);
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        "editor.theme": "dark", // light
      },
      tabs: [
        {
          endpoint: process.env.END_POINT,
        },
      ],
    }),
  ],
});

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
(async () => {
  await apolloSetup.start();
  apolloSetup.applyMiddleware({ app });
  app.listen(process.env.PORT, process.env.HOST, () =>
    console.log(`Server ready at http://${process.env.HOST}:${process.env.PORT}/graphql`)
  );
})();
