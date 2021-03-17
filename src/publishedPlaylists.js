import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
{
gcms 

{
  playlists(stage:PUBLISHED) {
    __typename
    stage
    id
    localizations(includeCurrent: true){
      locale
      title
    }
    activities{
      id
      localizations(includeCurrent: true){
        locale
        title
      }
    }
  }
}

}
`;

const PublishedPlaylists = () => {
  const published = useStaticQuery(query);
  console.log("published", published)

  return published
};

export default PublishedPlaylists