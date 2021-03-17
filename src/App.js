import './App.css';
import { useState } from "react"
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/ckmapkaybhw8l01ur19s79mgp/master",
  cache: new InMemoryCache()
});

const query = gql`
  query GetPlaylists($stage: Stage!) {
    playlists(stage: $stage) {
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

function App() {

  const [playlistsPreview, setPlaylistsPreview] = useState([]);
  const [playlistsPublished, setPlaylistsPublished] = useState([]);

  client
    .query({
      query: query, variables: { stage: "PREVIEW" }
    })
    .then(result => {
      console.log("PREVIEW", result)
      if (result?.data?.playlists) {
        setPlaylistsPreview(result.data.playlists)
      }
    });

  client
    .query({
      query: query, variables: { stage: "PUBLISHED" }
    })
    .then(result => {
      console.log("PUBLISHED", result)
      if (result?.data?.playlists) {
        setPlaylistsPublished(result.data.playlists)
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