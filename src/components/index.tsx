import { JSX } from "solid-js";


export function Button(props: JSX.ButtonHTMLAttributes<HTMLButtonElement>){
    return (
        <button {...props} class={`inline-block text-center py-3 px-6 rounded-full bg-spotify-green ${!props.disabled ? '' : 'opacity-70'} ${props.class ?? ''}`}>
            {props.children}
        </button>
    )
}

export function Select(props: JSX.SelectHTMLAttributes<HTMLSelectElement>){
    return (
        <select class={"bg-spotify-green p-3 border-4 border-spotify-green m-4 rounded-full " + (props.class ?? '')} {...props}>
            {props.children}
        </select>
    )
}