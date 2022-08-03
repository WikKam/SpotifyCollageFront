import { CollageType, ImageSize, TimeSpan } from "../types";

export const typeOptions: Array<{label: string, value: CollageType | ''}> = [
    {
        label: 'Collage type',
        value: ''
    },
    {
        label: 'Playlists',
        value: 'playlists'
    },
    {
        value: 'recently-played',
        label: 'Recently played'
    },
    {
        value: 'top-artists',
        label: 'Top artists'
    },
    {
        value: 'top-tracks',
        label: 'Top tracks'
    }
];

export const sizeOptions: Array<{label: string, value: ImageSize | ''}> = [
    {
        label: 'Size',
        value: ''
    },
    {
        label: '2x2',
        value: '2'
    },
    {
        label: '3x3',
        value: '3'
    },
    {
        label: '4x4',
        value: '4'
    },
    {
        label: '5x5',
        value: '5'
    },
    {
        label: '6x6',
        value: '6'
    },
];

export const timeSpanOptions: Array<{label: string, value: TimeSpan | ''}> = [
    {
        label: 'Time span',
        value: ''
    },
    {
        label: 'Short (~2 weeks)',
        value: 'short_term'
    },
    {
        label: 'Medium (~6 months)',
        value: 'medium_term'
    },
    {
        label: 'Long (several years)',
        value: 'long_term'
    },
];