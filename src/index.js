const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

// Mock Data
// 1
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
},
{
  id: 'link-1',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
    link: (obj, args) => { 
      return links.find(l => l.id === args.id)
    }
  },
  // 3
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
}

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );