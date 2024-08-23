import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  code: string;
  maritalStatus: string;
  activeStatus: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
  roleDate: string;
  role: string;
  selectEvent: string;
  eventDate: string;
  eventLocation: string;
  location: Location;
  classroom: classRooms[];
  staffProgram: staffProgram[];
}
interface Location {
  department: string;
  eventdate: string;
  role: string;
  eventStatus: string;
  date: string;
  location: string;
}

interface staffProgram {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
}
interface classRooms {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface StoreState {
  formData: FormData;
  tabValue: number;
  selectedRowId: number;

  setFormData: (data: Partial<FormData>) => void;
  setTabValue: (value: number) => void;
  setSelectedRowId: (value: number | undefined) => void;
  addStaffPro: (data: staffProgram) => void;
  addClassRoom: (data: classRooms) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      formData: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        code: "",
        maritalStatus: "",
        activeStatus: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        department: "",
        roleDate: "",
        role: "",
        selectEvent: "",
        eventDate: "",
        eventLocation: "",
        staffProgram: [
          {
            id: "",
            location: "",
            startDate: "",
            endDate: "",
          },
          {
            id: "",
            location: "",
            startDate: "",
            endDate: "",
          },
        ],
        location: {
          department: "",
          eventdate: "",
          role: "",
          eventStatus: "",
          date: "",
          location: "",
        },
        classroom: [
          {
            id: "",
            location: "",
            startDate: "",
            endDate: "",
          },
          {
            id: "",
            location: "",
            startDate: "",
            endDate: "",
          },
        ],
      },
      tabValue: 0,
      selectedRowId: 1,

      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      addStaffPro: (data: staffProgram) =>
        set((state) => ({
          staffProgram: [...state.staffProgram, data],
        })),
      addClassRoom: (data: classRooms) =>
        set((state) => ({
          classroom: [...state.classroom, data],
        })),
      setTabValue: (value) => set(() => ({ tabValue: value })),
      setSelectedRowId: (value) => set(() => ({ selectedRowId: value })),
    }),
    {
      name: "staff-form-data-storage", // name of the item in the storage (can be customized)
      getStorage: () => localStorage, // specify the storage type (localStorage/sessionStorage)
    }
  )
);

export default useStore;
