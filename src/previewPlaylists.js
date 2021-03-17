import { graphql, useStaticQuery } from 'gatsby';

const query = graphql`
{
gcms 
{
  playlists(stage:PREVIEW) {
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

const PreviewPlaylists = () => {
  const preview = useStaticQuery(query);
  console.log("preview", preview)

  return preview
};

export default PreviewPlaylists;
