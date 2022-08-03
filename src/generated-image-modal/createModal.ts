import { createSignal } from "solid-js";

type ModalAction = 'TOGGLE' | 'OPEN' | 'CLOSE';

export function modalReducer(open: boolean, action: ModalAction) {
    switch (action) {
      case 'TOGGLE':
        return !open
      case 'OPEN': 
        return true
      case 'CLOSE':
        return false
    }
  }

export default function createModal(reducer =  modalReducer) {
    const [open, setOpen] = createSignal(false);

    const toggleModal = () => setOpen(reducer(open(), 'TOGGLE'));

    const closeModal = () => setOpen(reducer(open(), 'CLOSE'));

    const openModal = () => setOpen(reducer(open(), 'OPEN'));

    return { open, openModal, closeModal, toggleModal }
}