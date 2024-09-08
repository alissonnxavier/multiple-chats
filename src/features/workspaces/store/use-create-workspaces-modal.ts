import { atom, useAtom } from 'jotai';


const modalStore = atom(false);

export const useCreateWorkspacesModal = () => {
    return useAtom(modalStore);
}