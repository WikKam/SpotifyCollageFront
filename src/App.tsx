import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import logo from './images/Spotify_Logo_RGB_Green.png';
import {Button} from './components/index'; 

const oauthEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "e34dc5d417494fb6be8b663a9631b502";
const redirectUri = "http://localhost:3000";
const scopes = "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-recently-played user-top-read"

const api = "http://localhost:8080";

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

  const getSample = async () => {
      console.log(token);
      const response = await fetch(api + "/login",{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*'
      },
      redirect: "follow",
      })

      const data = await response.text();
      console.log(data);
      return data;
  }
  const [token, setToken] = useState(null);
  useEffect(() => {
    console.log(hash);
    let _token:string = hash["access_token"];
    if(_token){
      setToken(_token);
    }
  },[])
  return (
    <div className={styles.App}>
      <div className = {styles.title}>
        <img className = {styles.logo} src={logo}/>
        <h1>Collage Generator</h1>
      </div>
        <p className = {styles.description}>Our generator uses your recently played songs, top tracks, artists and even playlists to create a collage which you can share with your friends!</p>
        {!token && (
        <Button 
          href={`${oauthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </Button>
      )}
      {token && (
        <div>
        <div>{token}</div>
        <button onClick = {getSample}>test</button>
        </div>
      )}
    </div>
  );
}

export default App;
