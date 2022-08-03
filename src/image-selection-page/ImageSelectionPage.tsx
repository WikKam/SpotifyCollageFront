import { For, Switch, Match, Show, ErrorBoundary } from "solid-js";

import GeneratedImageModal from "../generated-image-modal/GeneratedImageModal";
import createModal from "../generated-image-modal/createModal";
import { LandingPage } from "../landing-page/LandingPage";
import { sizeOptions, timeSpanOptions, typeOptions } from "./dropdownOptions";
import createImageBlob from "./hooks/createImageBlob";
import { createImageSelectionForm } from "./hooks/createImageSelectionForm";
import { createPlaylistOptions } from "./hooks/createPlaylistOptions";
import { Button, Select } from "../components";

interface ImageSelectionPageProps {
    token: string;
} 

interface DropdownProps<T extends string> {
    onSelect: (e: Event) => void;
    disabled?: boolean;
    value: string
    values: Array<{label: string, value: T | ''}>
    name: string,
    class?: string 
}

function Dropdown<T extends string>(props: DropdownProps<T>) {
    return (
        <Select 
            class={props.class} 
            disabled={props.disabled} 
            name={props.name} 
            onChange={props.onSelect} 
            value={props.value} 
            required
        >
            <For each={props.values}>
                {(entry) => <option value={entry.value} hidden={entry.value === ''}>{entry.label}</option>}
            </For>
        </Select>
    )
}

export function ImageSelectionPage(props: ImageSelectionPageProps) {    
    const { form, onSelect, submitEnabled, timeSpanEnabled, playlistsEnabled } = createImageSelectionForm();

    const [imageBlob] = createImageBlob(form, props.token, submitEnabled);

    const { open, openModal, closeModal } = createModal();

    const playlistOptions = createPlaylistOptions(props.token);

    return (
        <div class="space-y-6">
            <LandingPage/>
            <form>
                <section class="flex justify-center items-center flex-wrap">
                    <Dropdown values={typeOptions} name="type" value={form().type} onSelect={onSelect}/>
                    <Dropdown values={sizeOptions} name="size" value={form().size} onSelect={onSelect} />
                    <Dropdown 
                        disabled={!timeSpanEnabled()} 
                        values={timeSpanOptions} 
                        name="time" 
                        value={form().time} 
                        onSelect={onSelect}
                    />
                    <ErrorBoundary fallback={<span>Failed to fetch playlists 😔 Try logging in again by pressing back button</span>}>
                        <Show when={playlistOptions().data} fallback={
                            <Dropdown 
                                disabled 
                                values={[{ label: 'Loading playlists...', value: '' }]}
                                value={form().playlist} 
                                onSelect={onSelect} 
                                class='w-96'
                                name="playlist"
                            />}>
                            <Dropdown 
                                disabled={!playlistsEnabled()} 
                                values={playlistOptions().data} name="playlist" 
                                value={form().playlist} 
                                onSelect={onSelect} 
                                class='w-96'
                            />
                        </Show>
                    </ErrorBoundary>
                </section>
                <section class="flex justify-center">
                    <Button 
                        disabled={!submitEnabled()}
                        onClick={openModal} 
                        type="button" 
                        data-modal-toggle="generatedImageModal"
                        class="mt-8"
                    >
                            Generate Collage
                    </Button>
                    <GeneratedImageModal 
                        open={open()} 
                        onClose={closeModal} 
                        imageBlob={imageBlob} 
                    />
                </section>
            </form>
        </div>
    )
}