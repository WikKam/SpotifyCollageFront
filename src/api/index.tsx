import { ImageSize, TimeSpan } from "../types";
import fetchData from "./fetch";

export function getPlaylists(token: string) {
   return fetchData<Array<Record<'name', string>>>('/user/playlists', token);
}

export function getRecentlyPlayedTracksImage(token: string, size: ImageSize) {
    return fetchData(`/user/recently-played/images?size=${size}`, token, (response) => response.blob())
}

export function getTopArtistsImage(token: string, size: ImageSize, timeRange: TimeSpan) {
    return fetchData(`/user/top-artists/images?size=${size}&time_range=${timeRange}`, token, (response) => response.blob())
}

export function getTopTracksImage(token: string, size: ImageSize, timeRange: TimeSpan) {
    return fetchData(`/user/top-tracks/images?size=${size}&time_range=${timeRange}`, token, (response) => response.blob())
}

export function getPlaylistImage(token: string, size: ImageSize, playlist: string) {
    return fetchData(`/user/playlists/${playlist}/images?size=${size}`, token, (response) => response.blob())
}