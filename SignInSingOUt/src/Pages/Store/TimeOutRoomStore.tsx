import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Behavior {
  id: number;
  label: string;
  counter: number;
}

interface Behavior {
  id: number;
  label: string;
  counter: number;
}

interface BehaviorStoreState {
  behaviors: Behavior[];
  incrementCounter: (id: number) => void;
}

const createBehaviorStore = (storeName: string, initialBehaviors: Behavior[]) =>
  create<BehaviorStoreState>()(
    persist(
      (set) => ({
        behaviors: initialBehaviors,
        incrementCounter: (id: number) =>
          set((state) => ({
            behaviors: state.behaviors.map((behavior) =>
              behavior.id === id
                ? { ...behavior, counter: behavior.counter + 1 }
                : behavior
            ),
          })),
      }),
      {
        name: storeName, // unique name for localStorage key
      }
    )
  );

const useBehaviorColumnOneStore = createBehaviorStore(
  "behaviors_column_one_store",
  [
    { id: 1, label: "Mumbling", counter: 0 },
    { id: 2, label: "Wiggling", counter: 0 },
    { id: 3, label: "Talking Loud", counter: 0 },
    { id: 4, label: "Moving Around", counter: 0 },
    { id: 5, label: "Crying", counter: 0 },
    { id: 6, label: "Swearing", counter: 0 },
    { id: 7, label: "Screaming", counter: 0 },
    { id: 8, label: "Aggression", counter: 0 },
    { id: 9, label: "Spitting", counter: 0 },
  ]
);

const useBehaviorColumnTwoStore = createBehaviorStore(
  "behaviors_column_two_store",
  [
    { id: 1, label: "Disrobing", counter: 0 },
    { id: 2, label: "Attempt Escaping", counter: 0 },
    { id: 3, label: "Running", counter: 0 },
    { id: 4, label: "Body Functions", counter: 0 },
    { id: 5, label: "Self Harming", counter: 0 },
    { id: 6, label: "Biting", counter: 0 },
    { id: 7, label: "Injury to Child", counter: 0 },
    { id: 8, label: "Injury to Staff", counter: 0 },
    { id: 9, label: "Property Damage", counter: 0 },
  ]
);

interface TimeoutStoreState {
  description: string;
  setDescription: (newDescription: string) => void;
  level: number;
  setLevel: (level: number) => void;
  startTime: string;
  setStartTime: (level: string) => void;
}

const useTimeoutAllVariables = create<TimeoutStoreState>()(
  persist(
    (set) => ({
      description: "",
      setDescription: (newDescription: string) =>
        set({ description: newDescription }),
      level: 2,
      setLevel: (level: number) => set({ level: level }),
      startTime: "",
      setStartTime: (startTime: string) => set({ startTime: startTime }),
    }),
    {
      name: "all_TOR_variables",
    }
  )
);

export const clearLocalStorage = () => {
  console.log("delete");
  localStorage.removeItem("behaviors_column_one_store");
  localStorage.removeItem("behaviors_column_two_store");
  localStorage.removeItem("all_TOR_variables");
};

export {
  useBehaviorColumnOneStore,
  useBehaviorColumnTwoStore,
  useTimeoutAllVariables,
};
