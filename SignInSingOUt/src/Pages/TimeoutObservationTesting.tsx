import React from 'react'
import { useBehaviorColumnOneStore, useBehaviorColumnTwoStore } from './Store/TimeOutRoomStore'

const BehaviorListColumnOne: React.FC = () => {
    const behaviors = useBehaviorColumnOneStore((state) => state.behaviorsColumnOne)
    const incrementCounter = useBehaviorColumnOneStore((state) => state.incrementCounter)

    return (
        <div>
            {behaviors.map((behavior) => (
                <div key={behavior.id}>
                    <span>{behavior.label}: {behavior.counter}</span>
                    <button onClick={() => incrementCounter(behavior.id)}>+</button>
                </div>
            ))}
        </div>
    )
}

const BehaviorListColumnTwo: React.FC = () => {
    const behaviors = useBehaviorColumnTwoStore((state) => state.behaviorsColumnTwo)
    const incrementCounter = useBehaviorColumnTwoStore((state) => state.incrementCounter)

    return (
        <div>
            {behaviors.map((behavior) => (
                <div key={behavior.id}>
                    <span>{behavior.label}: {behavior.counter}</span>
                    <button onClick={() => incrementCounter(behavior.id)}>+</button>
                </div>
            ))}
        </div>
    )
}

const App: React.FC = () => (
    <div>
        <h1>Behavior Column One</h1>
        <BehaviorListColumnOne />
        <h1>Behavior Column Two</h1>
        <BehaviorListColumnTwo />
    </div>
)

export default App
