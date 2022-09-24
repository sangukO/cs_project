import {Link} from "react-router-dom"

function Home() {
    return (
        <div>
            <div className="Nav" style={{display:'flex', justifyContent:'flex-end'}}>
                <div style={{}}><h2><Link to="/">Home</Link></h2></div>
                <div><h2><Link to="/Login">Login</Link></h2></div>
                <div style={{marginLeft:'30px', marginRight:'10px'}}><h2><Link to="/Join">Join</Link></h2></div>
            </div>
            <h1>편의점 통합 관리 웹앱 commit test</h1>
        </div>
    )
}

export default Home