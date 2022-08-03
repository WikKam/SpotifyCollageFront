import { createResource } from "solid-js";
import { getPlaylists } from "../../api";

function mapToPlaylistOptions(playlistsData: () => Record<"name", string>[] | null) {
    if (!playlistsData()) {
        return null;
    }

    return [{ label: 'Playlist', value: '' }, ...playlistsData()
    .map(({ name }) => ({ value: name, label: name }))]
}

export function createPlaylistOptions(token: string) {
    const [playlistsData] = createResource(() => getPlaylists(token));

    return () => ({
        data: mapToPlaylistOptions(playlistsData), 
        loading: playlistsData.loading,
        error: playlistsData.error
    });
}