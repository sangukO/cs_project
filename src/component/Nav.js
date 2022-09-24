import {Link} from "react-router-dom"

function Nav() {
    return (
        <div className="Nav" style={{display:'flex', justifyContent:'flex-end'}}>
            <div><h2><Link to="/">Home</Link></h2></div>
            <div className="Margin" style={{width:"100%"}}></div>
            <div><h2><Link to="/Login">Login</Link></h2></div>
            <div style={{marginLeft:'30px', marginRight:'10px'}}><h2><Link to="/Join">Join</Link></h2></div>
        </div>
    )
}

export default Nav