import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Behavior {
  id: number;
  label: string;
  counter: number;
}

interface BehaviorColumnOneState {
  behaviorsColumnOne: Behavior[];
  incrementCounter: (id: number) => void;
}

interface BehaviorColumnTwoState {
  behaviorsColumnTwo: Behavior[];
  incrementCounter: (id: number) => void;
}

// First store for behaviors in column one
const useBehaviorColumnOneStore = create<BehaviorColumnOneState>()(
  persist(
    (set) => ({
      behaviorsColumnOne: [
        { id: 1, label: "Mumbling", counter: 0 },
        { id: 2, label: "Wiggling", counter: 0 },
        { id: 3, label: "Talking Loud", counter: 0 },
        { id: 4, label: "Walking Around", counter: 0 },
        { id: 5, label: "Crying", counter: 0 },
        { id: 6, label: "Swearing", counter: 0 },
        { id: 7, label: "Screaming", counter: 0 },
        { id: 8, label: "Aggression", counter: 0 },
        { id: 9, label: "Spitting", counter: 0 },
      ],
      incrementCounter: (id: number) =>
        set((state) => ({
          behaviorsColumnOne: state.behaviorsColumnOne.map((behavior) =>
            behavior.id === id
              ? { ...behavior, counter: behavior.counter + 1 }
              : behavior
          ),
        })),
    }),
    {
      name: "behaviors-column-one-store", // unique name for localStorage key
    }
  )
);

// Second store for behaviors in column two
const useBehaviorColumnTwoStore = create<BehaviorColumnTwoState>()(
  persist(
    (set) => ({
      behaviorsColumnTwo: [
        { id: 1, label: "Pushing", counter: 0 },
        { id: 2, label: "Disrobing", counter: 0 },
        { id: 3, label: "Attempt Escaping", counter: 0 },
        { id: 4, label: "Running", counter: 0 },
        { id: 5, label: "Body Functions", counter: 0 },
        { id: 6, label: "Physical Injury to Child", counter: 0 },
        { id: 7, label: "Physical Injury to Staff", counter: 0 },
        { id: 8, label: "Property Damage", counter: 0 },
        { id: 9, label: "Biting", counter: 0 },
      ],
      incrementCounter: (id: number) =>
        set((state) => ({
          behaviorsColumnTwo: state.behaviorsColumnTwo.map((behavior) =>
            behavior.id === id
              ? { ...behavior, counter: behavior.counter + 1 }
              : behavior
          ),
        })),
    }),
    {
      name: "behaviors-column-two-store", // unique name for localStorage key
    }
  )
);

export { useBehaviorColumnOneStore, useBehaviorColumnTwoStore };
