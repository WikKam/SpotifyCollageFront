import { CollageType, ImageSize, TimeSpan } from "../../types";

export interface ImageSelectionForm {
    type: CollageType | '',
    size: ImageSize | '', 
    playlist: string,
    time: TimeSpan | '',
}