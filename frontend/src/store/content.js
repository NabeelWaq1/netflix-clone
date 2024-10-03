import { create } from "zustand";

export const content = create((set) => ({
    contentType:'movie',
    setContentType: (type) => set({ contentType: type }),
}))