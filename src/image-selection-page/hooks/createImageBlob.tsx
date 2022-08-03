import { Accessor, createResource } from "solid-js";
import { getPlaylistImage, getRecentlyPlayedTracksImage, getTopArtistsImage, getTopTracksImage } from "../../api";
import { TimeSpan } from "../../types";
import { ImageSelectionForm } from "../types/form";

const getImageFetcher = (form: ImageSelectionForm, token: string) => {
    
    if(form.type === '' || form.size === ''){
        throw new Error('Form values are incomplete!');
    }

    const size = form.size;

    switch(form.type) {        
        case 'playlists':
            
            return () => getPlaylistImage(token, size, form.playlist);

        case 'recently-played':
            
            return () => getRecentlyPlayedTracksImage(token, size);

        case 'top-artists': 

            if(form.time === '') {
                throw new Error('Form values are incomplete!');
            }

            return () => getTopArtistsImage(token, size, form.time as TimeSpan);
        
        case 'top-tracks':
            
            if(form.time === '') {
                throw new Error('Form values are incomplete!');
            }
            
            return () => getTopTracksImage(token, size, form.time as TimeSpan);
    }
}

export default function createImageBlob(formStore: Accessor<ImageSelectionForm>, token: string, submitEnabled: () => boolean) {
    const getImageBlob = () => {
        return getImageFetcher(formStore(), token)();
    }

    return createResource(formStore, async () => {
        if(submitEnabled()) {
            return getImageBlob();
        }
        return null;
    }, { initialValue: null });
}