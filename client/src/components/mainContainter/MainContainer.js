import { Outlet } from "react-router-dom"

const MainContainer = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
}

export default MainContainer