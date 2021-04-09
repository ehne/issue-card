// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Color from "color"
import { request, gql, GraphQLClient } from 'graphql-request'




async function getData(user) {
    const endpoint = 'https://api.github.com/graphql';
   
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${process.env.PAT}`,
      },
    })
   
    const query = gql`
        query getStatus{
          user(login: "${user}") {
            status {
              message
              emoji
            }
          }
        }`
   
    const data = await graphQLClient.request(query)
   // console.log(JSON.stringify(data, undefined, 2))
    return data
  }




async function main(req, res) {
    //console.log(req)
    const {
        query: { user },
      } = req
    //console.log(user, repo)
    const data = await getData(user)
      //console.log(data.repository.labels.nodes)
    //const data = getData(repo, user)
   
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.send(data.user.status);
};

export default main