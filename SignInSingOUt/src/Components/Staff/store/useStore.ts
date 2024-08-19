import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthorizedParty {
  firstName: string;
  lastName: string;
  authorized: boolean;
}

interface ResponsibleParty {
  firstName: string;
  lastName: string;
  relationship: string;
  authorizedParties?: AuthorizedParty[];
}

interface Patient {
  firstName: string;
  lastName: string;
  authorized: boolean;
}

interface AuthorizedPartyWithDetails {
  firstName: string;
  phone: string;
  email: string;
  patients?: Patient[];
}

interface EmergencyContact {
  firstName: string;
  phone: string;
  email: string;
}

interface Doctor {
  firstName: string;
  lastName: string;
  email: string;
  clinicName: string;
  clinicWebsite: string;
  clinicPhone: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  ssn: string;
  code: string;
  maritalStatus: string;
  status: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  responsibleParties: ResponsibleParty[];
  authorizedParties: AuthorizedPartyWithDetails[];
  emergencyContacts: EmergencyContact[];
  doctors: Doctor[];
}

interface StoreState {
  formData: FormData;
  tabValue: number;
  selectedRowId: number;
  setFormData: (data: Partial<FormData>) => void;
  addResponsibleParty: (data: ResponsibleParty) => void;
  addAuthorizedParty: (data: AuthorizedPartyWithDetails) => void;
  addSubchildToChild: (child:string, data: AuthorizedPartyWithDetails) => void;
  addNestedChildToSubChild: (child:string,subChild:string, data: AuthorizedPartyWithDetails) => void;
  addDoctor: (data: Doctor) => void;
  setChildObjFormData: (objName: string, data: any) => void;
  setTabValue: (value: number) => void;
  setSelectedRowId: (value: number | null) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      formData: {
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        ssn: "",
        code: "",
        maritalStatus: "",
        status: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipCode: "",
        responsibleParties: [
          {
            firstName: "",
            lastName: "",
            relationship: "",
            authorizedParties: [
              { firstName: "", lastName: "", authorized: false },
              { firstName: "", lastName: "", authorized: false },
            ],
          },
          {
            firstName: "",
            lastName: "",
            relationship: "",
            authorizedParties: [
              { firstName: "", lastName: "", authorized: false },
              { firstName: "", lastName: "", authorized: false },
            ],
          },
        ],
        authorizedParties: [
          {
            firstName: "",
            phone: "",
            email: "",
            patients: [
              { firstName: "", lastName: "", authorized: false },
              { firstName: "", lastName: "", authorized: false },
            ],
          },
          {
            firstName: "",
            phone: "",
            email: "",
            patients: [
              { firstName: "", lastName: "", authorized: false },
              { firstName: "", lastName: "", authorized: false },
            ],
          },
        ],
        emergencyContacts: [
          { firstName: "", phone: "", email: "" },
          { firstName: "", phone: "", email: "" },
        ],
        doctors: [
          {
            firstName: "",
            lastName: "",
            email: "",
            clinicName: "",
            clinicWebsite: "",
            clinicPhone: "",
          },
          {
            firstName: "",
            lastName: "",
            email: "",
            clinicName: "",
            clinicWebsite: "",
            clinicPhone: "",
          },
        ],
      },
      addResponsibleParty: (data: ResponsibleParty) =>
        set((state) => ({
          formData: {
            ...state.formData,
            responsibleParties: [...state.formData.responsibleParties, data],
          },
        })),
      addAuthorizedParty: (data: AuthorizedPartyWithDetails) =>
        set((state) => ({
          formData: {
            ...state.formData,
            authorizedParties: [...state.formData.authorizedParties, data],
          },
        })),
addSubchildToChild: (child, data) =>
    set((state) => ({
        formData: {
            ...state.formData,
            [child]: [...state.formData[child], data],
        },
    })),

  addNestedChildToSubChild: (child, subChild, data) =>
    set((state) => ({
        formData: {
            ...state.formData,
            [child]: {
                ...state.formData[child],
                [subChild]: [...state.formData[child][subChild], data],
            },
        },
    })),

      addDoctor: (data: Doctor) =>
        set((state) => ({
          formData: {
            ...state.formData,
            doctors: [...state.formData.doctors, data],
          },
        })),
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      setChildObjFormData: (objName, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [objName]: [
              ...state.formData[objName].slice(0, state.selectedRowId),
              {
                ...state.formData[objName][state.selectedRowId],
                ...data,
              },
              ...state.formData[objName].slice(state.selectedRowId + 1),
            ],
          },
        })),
      setTabValue: (value) => set(() => ({ tabValue: value })),
      setSelectedRowId: (value) => set(() => ({ selectedRowId: value })),
      tabValue: 0,
      selectedRowId: 1,
    }),
    {
      name: "form-data-storage", // name of the item in the storage (can be customized)
      getStorage: () => localStorage, // specify the storage type (localStorage/sessionStorage)
    }
  )
);

export default useStore;
