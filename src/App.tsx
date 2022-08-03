import { Component, createSignal, onMount, Show } from 'solid-js';
import { getHash } from './auth/getHash';
import { oauthEndpoint, clientId, redirectUri, scopes } from './auth/url';
import { ImageSelectionPage } from './image-selection-page/ImageSelectionPage';
import { LandingPage } from './landing-page/LandingPage';

const App: Component = () => {
  const token = getHash()['access_token'];

  return (
    <>
      <Show when={token}>
        <ImageSelectionPage token={token} />
      </Show>
      <Show when={!token}>
        <LandingPage>
          <a 
            href={`${oauthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`}
            class="inline-block text-center py-3 px-6 rounded-full bg-spotify-green"
          >
            Login to Spotify
          </a>
        </LandingPage>
      </Show>
    </>
  );
};

export default App;
