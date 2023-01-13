import {ApolloServer, gql} from "apollo-server";

const tweets = [
  {
    id: "1",
    test: "first one",
  },
  {
    id: "2",
    test: "2nd one",
  },
]

const typeDefs = gql`
    type User{
        id:ID!
        username: String!
        firstName : String!
        lastName : String
    }
    
    type Tweet {
        id:ID!
        text:String!
        author : User!
    }

    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
        ping : String!
    }
    
    type Mutation{
        postTweet(test:String! , userId: ID!): Tweet!
        deleteTweet(id:ID!):Boolean!
    }

`;

const resolvers = {
  Query : {
    tweet(){
      console.log("I`m called");
      return null;
    },
    ping(){
      return "pong";
    }
  }
}

const server = new ApolloServer({typeDefs , resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});