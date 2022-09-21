import {Link} from "react-router-dom"

function Home() {
    return (
        <div>
            <h1>편의점 통합 관리 웹앱</h1>
            <hr/>
            <h2><Link to="/Login">Login</Link></h2>
            <h2><Link to="/Join">Join</Link></h2>
        </div>
    )
}

export default Home