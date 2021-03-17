import React from 'react';
import PreviewPlaylists from '../previewPlaylists';
import PublishedPlaylists from "../publishedPlaylists"
import "../app.css"

const IndexPage = () => {
  const preview = PreviewPlaylists();
  const previewPlaylists = preview?.gcms?.playlists

  const published = PublishedPlaylists();
  const publishedPlaylists = published?.gcms?.playlists

  return <main>

    <div class="stage">
      <h2>Dette vises i Stage</h2>
      {
        renderPlaylists(previewPlaylists)
      }
    </div>

    <div class="prod">
      <h2>Dette vises i Prod</h2>
      {
        renderPlaylists(publishedPlaylists)
      }
    </div>

  </main>
};

export default IndexPage;

const renderPlaylists = (playlists) => {
  return playlists.length > 0 &&
    <div class="playlists">
      {playlists.map(playlist => (
        <div class="playlist">
          {
            playlist.localizations.map(l => (
              <p>{l.locale}: {l.title}</p>
            ))
          }

          {
            playlist.activities.length > 0 &&
            <div class="activities">
              {playlist.activities.map(a => (
                <div class="activity">
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