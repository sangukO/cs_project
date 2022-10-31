import {Link} from "react-router-dom";
import Header from "./Header";
import { Breadcrumb } from 'antd';
import Nav from "./Nav";

function Home() {
    return (
        <div>
            <div className="Header"><Header/></div>
            <div className="Nav" style={{float:"left"}}><Nav/></div>
            <div className="Content" style={{float:"left", width:"80%"}}>
                <div className="Breadcrumb">
                    <Breadcrumb
                    style={{
                        margin: '20px 0 0 20px',
                    }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Index</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="Margin" style={{height:"50px"}}></div>
                <div className="Title" style={{textAlign:"center"}}><h1>편의점 통합 관리 웹앱</h1></div>
            </div>
        </div>
    )
}

export default Home;