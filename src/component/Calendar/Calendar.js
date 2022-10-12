import Header from "../Header";
import { Alert, Badge, Breadcrumb, Calendar as Calendar2 } from 'antd';
import Nav from "../Nav";
import locale from "antd/es/calendar/locale/ko_KR";
import moment from "moment";
import { useState } from "react";

function Calendar() {

    const [selectedValue, setSelectedValue] = useState(moment(moment()));

    const onSelectDateCell = (newValue) => {
        setSelectedValue(newValue);
    }

    const data = [
        {
            "id":1,
            "type":"success",
            "date":"2022/10/03",
            "content":"물건 발주",
        },
        {
            "id":2,
            "type":"success",
            "date":"2022/10/04",
            "name":"오상욱",
            "content":"발주된 물건 검수",
        },
        {
            "id":3,
            "type":"success",
            "date":"2022/10/05",
            "content":"물건 발주",
        },
        {
            "id":4,
            "type":"warning",
            "date":"2022/10/06",
            "name":"오상욱",
            "content":"발주된 물건 검수",
        },
        {
            "id":5,
            "type":"error",
            "date":"2022/10/04",
            "name":"김현호",
            "content":"새벽에 쓰레기통 비우기",
        },
        {
            "id":6,
            "type":"warning",
            "date":"2022/10/08",
            "name":"김은하",
            "content":"	오전 물건 진열하기",
        },
    ]

    const dateCellRender = (value) => {
        const stringValue = value.format("yyyy/MM/DD");
        const listData = data.filter(({date}) => date === stringValue);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        )
    }

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
                        <Breadcrumb.Item>Calendar</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="Margin" style={{height:"50px"}}></div>
                <div className="Title" style={{textAlign:"center"}}><h1>일정 관리</h1></div>
                <div className="Calendar">
                    <Alert message={`${selectedValue?.format('YYYY-MM-DD')}`} />
                    <Calendar2
                        locale={locale}
                        onSelect={onSelectDateCell}
                        dateCellRender={dateCellRender}
                    />
                </div>
            </div>
        </div>
    )
}

export default Calendar;