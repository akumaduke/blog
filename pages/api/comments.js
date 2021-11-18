import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT;
const graphcmsToken= process.env.GRAPHCMS_TOKEN


export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateCommentaire($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createCommentaire(data: {nom: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;
try {
  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
} catch(error) {
  console.log(error);
  return res.status(500).send(error)
}
}