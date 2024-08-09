import create from 'zustand';

const useStore = create((set) => ({
  formData: {},
  setFormData: (data:any) => set((state:any) => ({ formData: { ...state.formData, ...data } })),
}));

export default useStore;
