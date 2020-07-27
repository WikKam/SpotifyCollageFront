import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import logo from './images/Spotify_Logo_RGB_Green.png';
import {Button, Logo, SelectorContainer} from './components/index'; 
import fetchData from './api/index';


const oauthEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "e34dc5d417494fb6be8b663a9631b502";
const redirectUri = "http://localhost:3000";
const scopes = "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-recently-played user-top-read"

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";
function App() {

  const [token, setToken] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    let mounted = true;
    console.log(hash);
    let _token:string = hash["access_token"];
    if(_token){
      setToken(_token);
      fetchData('/user/playlists', _token).then(data => {
        if(mounted){
          console.log('data fetched');
          if(data == 'error' || data == 'unauthorised'){
            alert('Something went wrong. Refreshingn page...');
            window.location.reload();
            return;
          }
          setPlaylists(data.map(playlist => playlist.name));
        }
      })
    }
    return () => {mounted = false};    
  },[])
  return (
    <div className={styles.App}>
      <Logo src = {logo}>Collage Generator</Logo>
        <p className = {styles.description}>Our generator uses your recently played songs, top tracks, artists and even playlists to create a collage which you can share with your friends!
        </p >
        <p className = {styles.description}>Note: If your collage has white, empty squares, you should try choosing smaller size</p>
        {!token && (
        <Button 
          link
          href={`${oauthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </Button>
      )}
      {token && (
        <SelectorContainer token = {token} playlists = {playlists}/>
      )}
    </div>
  );
}

export default App;
