import {getThings, type Thing, ThingBox} from "pooka-react"
import './App.css'
import {useEffect, useState} from "react";

function App() {
    const bar = "bar"
    const empty: Thing[] = [];
    const [things, setThings] = useState(empty)

    useEffect(() => {
        getThings("/things/things.json")
            .then(things => setThings(things))
    }, [bar])

    if (things.length == 0) {
        return <div>Nothing yet</div>
    }

    return (
        <>
            <div>
                <ThingBox thing={things[0]} root={"/things"}></ThingBox>
            </div>
        </>
    )
}

export default App
