import { useState } from "react"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/ckmapkaybhw8l01ur19s79mgp/master",
  cache: new InMemoryCache()
});

const queryPublished = gql`
  query GetPlaylists{
    playlists(stage: PUBLISHED) {
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
`

const queryPreview = gql`
  query GetPlaylists{
    playlists(stage: PREVIEW) {
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
`
const previewTask = client
  .query({
    query: queryPreview
  });

const publishedTask = client.query({
  query: queryPublished
})

function App() {

  const [playlistsPreview, setPlaylistsPreview] = useState([]);
  const [playlistsPublished, setPlaylistsPublished] = useState([]);

  previewTask
    .then(result => {
      if (result?.data?.playlists && playlistsPreview.length === 0) {
        setPlaylistsPreview(result.data.playlists)
        console.log("PREVIEW", result.data.playlists)
      }
    });

  publishedTask
    .then(result => {
      if (result?.data?.playlists && playlistsPublished.length === 0) {
        setPlaylistsPublished(result.data.playlists)
        console.log("PUBLISHED", result.data.playlists)
      }
    });

  return (
    <main>

      <div className="stage">
        <h2>Dette vises i Stage</h2>
        {
          renderPlaylists(playlistsPreview)
        }
      </div>

      <div className="prod">
        <h2>Dette vises i Prod</h2>
        {
          renderPlaylists(playlistsPublished)
        }
      </div>

    </main>
  );
}

export default App;

const renderPlaylists = (playlists) => {
  return playlists.length > 0 &&
    <div className="playlists">
      {playlists.map(playlist => (
        <div className="playlist">
          {
            playlist.localizations.map(l => (
              <p>{l.locale}: {l.title}</p>
            ))
          }

          {
            playlist.activities.length > 0 &&
            <div className="activities">
              {playlist.activities.map(a => (
                <div className="activity">
                  {
                    a.localizations.map(l => (
                      <p>{l.locale}: {l.title}</p>
                    ))
                  }
                </div>
              ))}
            </div>
          }
        </div>
      ))}
    </div>
}