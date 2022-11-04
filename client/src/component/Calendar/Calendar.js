import Header from "../Header";
import { Badge, Breadcrumb, Calendar as Calendar2, Modal, Form, Input, Radio, Button } from 'antd';
import Nav from "../Nav";
import moment from "moment";
import locale from "antd/es/calendar/locale/ko_KR";
import { useState, useEffect } from "react";
import axios from "axios";

function Calendar() {

    const [writeForm] = Form.useForm();

    const data = [
        {
            "id":"1",
            "name":"점주",
            "date":"2022/10/03",
            "time": "점주",
            "todo":"물건 발주",
            "tag":["success"],
        },
        {
            "id":"2",
            "name":"오상욱",
            "date":"2022/10/04",
            "time": "평일 오후",
            "todo":"발주된 물건 검수",
            "tag":["success"],
        },
        {
            "id":"3",
            "name":"점주",
            "date":"2022/10/05",
            "time": "점주",
            "todo":"물건 발주",
            "tag":["success"],
        },
        {
            "id":"4",
            "name":"오상욱",
            "date":"2022/10/06",
            "time": "평일 오후",
            "todo":"발주된 물건 검수",
            "tag":["warning"],
        },
        {
            "id":"5",
            "name":"김현호",
            "date":"2022/10/04",
            "time": "평일 야간",
            "todo":"새벽에 쓰레기통 비우기",
            "tag":["error"],
        },
        {
            "id":"6",
            "name":"김인하",
            "date":"2022/10/08",
            "time": "주말 오전",
            "todo":"오전 물건 진열하기",
            "tag":["warning"],
        },
    ]
    // const [selectedDateTodoValue, setSelectedDateTodoValue] = useState([]);
    const [selectedValue, setSelectedValue] = useState(moment(moment()));
    const [isListModalOpen, setisListModalOpen] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [isWriteModalOpen, setisWriteModalOpen] = useState(false);
    const [writeValue, setWriteValue] = useState("진행중");
    const [todoData, setTodoData] = useState([]);

    let dataArry = [];
    let Arr = [];

    const getTodo = () => {
        axios.post('http://localhost:3001/getTodo').then((res) => {
            dataArry = res.data;
            getTableData(dataArry);
        })
    }

    const getTableData = (dataArry) => {
        dataArry.boardInfo.map((data, i) => {
            let dataValue = {
                "key":i.toString(),
                "id":dataArry.boardInfo[i].id,
                "name":dataArry.boardInfo[i].name,
                "date":dataArry.boardInfo[i].date,
                "time": dataArry.boardInfo[i].time,
                "todo":dataArry.boardInfo[i].todo,
                "tag":["success"]
            };
            console.log(dataValue);
            setTodoData(todoData => [...todoData, dataValue]);
        })
    }

    const onSelectDateCell = (newValue) => {
        const dateData = moment(newValue._d);
        setSelectedValue(dateData.format('YYYY/MM/DD'));
        getTodoList(data, selectedValue);
        if(todoList[0]===undefined) {
            showWriteModal();
        }
        else {
            showListModal();
        }
    };

    const getTodoList = (data, selectedValue) => {
        // setSelectedDateTodoValue(selectedDateTodoValue.filter(user => user.id !== id));
        // 선택한 날짜의 할일만 필터링
        const TodoList = data.filter(data=>data.date === selectedValue)
            .map(data => data.todo);
        // 배열로 형식 수정
        const TodoArr = Object.entries(TodoList);
        TodoArr.map((todo) => {
            let value = {
                key: todo[0],
                todo: todo[1]
            }
            Arr.push(value)
            console.log("value : "+value);
            // setDataTodoValue(value);
            // console.log("map : "+selectedDateTodoValue);
        }
            
        )
        console.log("Arr : "+Arr);
        setDataTodoValue(Arr);
        // console.log("Arr : "+Arr);
        // setSelectedDateTodoValue((selectedDateTodoValue) => {
        //     return Arr;
        // })
        // console.log("selectedDateTodoValue : "+selectedDateTodoValue);
    } 

    const setDataTodoValue = (Arr) => {
        // setSelectedDateTodoValue(Arr);
        setTodoList(() => {
            return Arr
        });
        console.log(todoList);
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
                    <li key={item.todo}>
                        <Badge status={item.tag} text={item.todo} />
                    </li>
                ))}
            </ul>
        )
    }

    const enterList = (todo) => {
        console.log(todo);
    }

    useEffect(() => {
        getTodo()
      },[]);

    return (
        <div>
            <div className="Header"><Header/></div>
            <div className="Nav" style={{float:"left"}}><Nav/></div>
            <div className="todo" style={{float:"left", width:"80%"}}>
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
                            <li><Button type="link" key={t.key} onClick={() => enterList({t})} style={{color:'black'}}>{t.todo}</Button></li>
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