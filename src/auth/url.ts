export const oauthEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = import.meta.env.VITE_CLIENT_ID;
export const redirectUri = window.location.origin;
export const scopes = "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-recently-played user-top-read"