import { JSX, ParentProps, Switch, Match, Resource } from "solid-js";
import { Button } from "../components";

interface GeneratedImageModalProps {
    open?: boolean;
    onClose(): void;
    imageBlob: Resource<Blob>;
}

const DownloadButtonFallback = () => (
    <Button disabled type="button">Loading...</Button>
)

const ImageFallback = () => (
    <div style={{height: '624px'}} class='flex w-auto justify-center items-center'>
        <div role="status" class="text-center">
            <svg class="inline w-40 h-40 animate-spin text-gray-400 fill-spotify-green" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        <span class="sr-only">Loading...</span>
        </div>
    </div>
)

const ImageError = () => (
    <div style={{height: '624px'}} class='flex w-auto justify-center items-center'>
        <div class="text-center">
            Something went wrong 😔 Try refreshing the page or selecting different settings
        </div>
    </div>
)

const DownloadButtonError = () => (
    <Button disabled type="button">Error 😔</Button>
)

function CloseModalButton(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
    )
}

function ModalFooter(props: ParentProps) {
    return (
        <footer class="flex items-center p-3 space-x-2 rounded-b border-t border-spotify-light-grey">
            {props.children}
        </footer>
    )
}

function Modal(props: ParentProps<{ open: boolean }>){
    return (
        <div id="generatedImageModal" tabindex="-1" aria-hidden={!props.open} class={`${props.open ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
            <div class="relative p-4 m-auto w-full max-w-2xl h-full md:h-auto">
                <div class="relative bg-spotify-grey rounded-lg shadow">
                    {props.children}
                </div>
            </div>
        </div>

    )
}

function DownloadLink(props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a {...props} download class="inline-block text-center py-3 px-6 rounded-full bg-spotify-green">Download</a>
    )
}

function ModalHeader(props: ParentProps) {
    return (
        <header class="flex justify-between items-start p-3 rounded-t border-b border-spotify-light-grey">
            {props.children}
        </header>
    )
}

export default function GeneratedImageModal(props: GeneratedImageModalProps) {

    return (
        <Modal open={props.open}>
            <ModalHeader>
                <h3 class="text-xl font-semibol">
                    Your collage
                </h3>
                <CloseModalButton onClick={props.onClose} type="button" data-modal-toggle="defaultModal" />
            </ModalHeader>
            <main class="p-2">
                <Switch>
                    <Match when={props.imageBlob?.error}>
                        <ImageError />
                    </Match>
                    <Match when={!props.imageBlob?.error && !props.imageBlob?.loading && props.imageBlob()}>
                        <img width='624px' height='624px' src={URL.createObjectURL(props.imageBlob())} alt='Your collage'/>
                    </Match>
                    <Match when={props.imageBlob.loading}>
                        <ImageFallback/>
                    </Match>
                </Switch>
            </main>
            <ModalFooter>
                <Switch>
                    <Match when={props.imageBlob?.error}>
                        <DownloadButtonError />
                    </Match>
                    <Match when={!props.imageBlob?.error && !props.imageBlob?.loading && props.imageBlob()}>
                        <DownloadLink href={URL.createObjectURL(props.imageBlob())} type="button" />
                    </Match>
                    <Match when={props.imageBlob.loading}>
                        <DownloadButtonFallback/>
                    </Match>
                </Switch>
            </ModalFooter>
        </Modal>
    )
}