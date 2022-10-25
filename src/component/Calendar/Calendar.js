import Header from "../Header";
import { Badge, Breadcrumb, Calendar as Calendar2, Modal, Form, Input, Radio } from 'antd';
import Nav from "../Nav";
import moment from "moment";
import locale from "antd/es/calendar/locale/ko_KR";
import { useState } from "react";

function Calendar() {

    const [writeForm] = Form.useForm();

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
            "name":"김인하",
            "content":"오전 물건 진열하기",
        },
    ]

    const [selectedValue, setSelectedValue] = useState(moment(moment()));
    const [isListModalOpen, setisListModalOpen] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [isWriteModalOpen, setisWriteModalOpen] = useState(false);
    const [writeValue, setWriteValue] = useState("진행중");

    const onSelectDateCell = (newValue) => {
        const dateData = moment(newValue._d);
        setSelectedValue(dateData.format('YYYY/MM/DD'));
        getTodoList(data, selectedValue);
        if(todoList[0]==undefined) {
            showWriteModal();
        }
        else {
            showListModal();
        }
    };

    const getTodoList = (data, selectedValue) => {
        const TodoList = data.filter(data=>data.date == selectedValue)
            .map(data => data.content
        );
        const TodoArr = Object.entries(TodoList);
        const Arr = [];
        TodoArr.map((todo) => 
            Arr.push(todo[1])
        )
        setTodoList(Arr);
    } 

    const showListModal = () => {
        setisListModalOpen(true);
    };

    const onListOk = () => {
        setisListModalOpen(false);
    };

    const onListCancel = () => {
        setisListModalOpen(false);
    };


    const showWriteModal = () => {
        writeForm.setFieldsValue({
        tag: "진행중",
        });
        setisWriteModalOpen(true);
    };

    const onWriteStateChange = (e) => {
        setWriteValue(e.target.value);
    };

    const onWriteOk = () => {
        setisWriteModalOpen(false);
    };

    const onWriteCancel = () => {
        setisWriteModalOpen(false);
    };


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
                    <Calendar2
                        locale={locale}
                        onSelect={onSelectDateCell}
                        dateCellRender={dateCellRender}
                    />
                </div>
            </div>
            <Modal title={selectedValue} open={isListModalOpen} onOk={onListOk} onCancel={onListCancel}>
                <div className="TodoList">
                <ul style={{listStyle: "none", paddingTop:"10px", paddingLeft:"0px"}}> 
                    {todoList.map((t) => (
                            <li>{t}</li>
                        ))}
                    </ul>
                </div>
            </Modal>
            <Modal title={selectedValue + " 할 일 작성"} open={isWriteModalOpen} onOk={onWriteOk} onCancel={onWriteCancel}>
            <div className="Form">
                    <Form form={writeForm} style={{width:'80%', margin:'auto'}}
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                            tag : writeValue,
                        }}
                    autoComplete="off"
                    >
                        <Form.Item
                            label="이름"
                            name="name"
                            rules={[
                            {
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="시간"
                            name="time"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="할 일"
                            name="todo"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="상태"
                            name="tag"
                        >
                            <Radio.Group value={writeValue} onChange={onWriteStateChange}>
                                <Radio value="진행중">진행중</Radio>
                                <Radio value="완료">완료</Radio>
                                <Radio value="미완료">미완료</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default Calendar;