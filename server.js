import {ApolloServer, gql} from "apollo-server";

let tweets = [
  {
    id: "1",
    test: "first one",
  },
  {
    id: "2",
    test: "2nd one",
  },
];

// let users = [
//   {
//     id:"1",
//     firstName:"nico",
//     lastName: "las"
//   }
// ]

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
        author : User
    }

    type Query {
        allUsers: [User!]!
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
    allTweets() {
      return tweets;
    },
    tweet(root, {id}) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      return users;
    },
  },
    Mutation : {
      postTweet(_,{ text , userId}){
        const newTweet = {
          id : tweets.length +1 ,
          text ,
        };
        tweets.push(newTweet);
        return newTweet;
      },
      deleteTweet(_, {id}){
        const tweet = tweets.find(tweet => tweet.id === id);
        if (!tweet) return false;
        tweets.filter(tweet => tweet.id !==id);
        return true;
      }
    },
};

const server = new ApolloServer({typeDefs , resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});