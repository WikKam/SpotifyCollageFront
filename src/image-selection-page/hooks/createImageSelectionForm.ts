import { createSignal } from "solid-js";
import { CollageType } from "../../types";
import { ImageSelectionForm } from "../types/form";

const viableTimeSpanTypes: CollageType[] = ['top-artists', 'top-tracks'];

const viablePlaylistType: CollageType = 'playlists';

export function createImageSelectionForm() {
    const initialFormValue: ImageSelectionForm = {
        type: '',
        size: '', 
        playlist: '',
        time: '',
    }

    const [form, setForm] = createSignal(initialFormValue);

    const onSelect = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        setForm(prevValue => ({
            ...prevValue,
            [target.name]: target.value
        }))
    }

    const submitEnabled = () => {
        const { type, playlist, size, time } = form();
        
        if (type === '' || size === '') {
            return false;
        }

        if(type === 'recently-played') {
            return true;
        }

        if(viableTimeSpanTypes.some(timeSpanType => type === timeSpanType)) {
            return time !== '';
        }

        if(type === viablePlaylistType) {
            return playlist !== ''
        }
        
        return false
    }

    const timeSpanEnabled = () => viableTimeSpanTypes.some(type => form().type === type)

    const playlistsEnabled = () => form().type === viablePlaylistType;

    return { form, onSelect, submitEnabled, timeSpanEnabled, playlistsEnabled }
}