import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Outlet, Link } from "react-router-dom"

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([])

    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json()
        })
        .then(setDirectors)
        .catch(console.log)
    }, [])

    console.log(directors)

         const addDirector = (newDirector) => {
    setDirectors(previousDirectors => [...previousDirectors, newDirector])
  }


    const updateDirectors = (updatedDirector) => {
        setDirectors(prevDirectors => prevDirectors.map(director => {
            if(director.id === updatedDirector.id) {
                return updatedDirector
            }
            return director
        }))
    }

    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Director's Directory!</h1>
                <Link to="new">Add a new Director</Link>
                <Outlet context={{directors, addDirector, updateDirectors}}/>
                {/* all director components should render here depending on route */}
            </main>
        </>
    );
}

export default DirectorContainer;
