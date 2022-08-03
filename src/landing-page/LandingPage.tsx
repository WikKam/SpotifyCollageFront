import { ParentProps } from "solid-js";

export function LandingPage(props: ParentProps) {
    return (
        <main>
            <div class="flex flex-wrap items-center space-x-4 space-y-4 my-24 justify-center">
                <img class="h-28 w-auto" src="/images/Spotify_Logo_RGB_Green.png">Collage Generator</img>
                <h1 class="text-5xl text-center tracking-widest">Collage Generator</h1>
            </div>
            <section class="text-center block m-auto w-2/3 space-y-10 text-lg">
                <p>Our generator uses your recently played songs, top tracks, artists and even playlists to create a collage which you can share with your friends!</p>
                <p>Note: If your collage has white, empty squares, you should try choosing smaller size</p>
                {props.children}
            </section>
        </main>
    )
}