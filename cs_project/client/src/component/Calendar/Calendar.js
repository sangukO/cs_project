import Header from "../Header";
import { Badge, Breadcrumb, Calendar as Calendar2, Modal, Form, Input, Radio, Button } from 'antd';
import 'antd/dist/antd.min.css';
import Nav from "../Nav";
import  { Link } from 'react-router-dom'; 
import moment from "moment";
import locale from "antd/es/calendar/locale/ko_KR";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    CloseOutlined,
    CheckOutlined,
    UndoOutlined
  } from '@ant-design/icons';
    
function Calendar() {

    const [writeForm] = Form.useForm();
    const [memoForm] = Form.useForm();
    const [selectedValue, setSelectedValue] = useState(moment(moment()));
    const [isListModalOpen, setisListModalOpen] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [isWriteModalOpen, setisWriteModalOpen] = useState(false);
    const [writeValue, setWriteValue] = useState("진행중");
    const [todoData, setTodoData] = useState([]);
    const [mountCount, setMountCount] = useState(0);
    const [memoModalTitle, setMemoModalTitle] = useState("");
    const [memoModalMemo, setMemoModalMemo] = useState("");
    const [memo_id, setMemo_id] = useState("");
    const [isMemoModalOpen, setisMemoModalOpen] = useState(false);
    const { TextArea } = Input;

    let dataArray = [];
    let Arr = [];

    const getTodo = () => {
        axios.post('http://localhost:3001/getTodo').then((res) => {
            dataArray = res.data;
            getTableData(dataArray);
        })
    }

    //달력 셀 출력
    const dateCellRender = (value) => {
        const stringValue = value.format("YYYY/MM/DD");
        const listData = todoData.filter(({date}) => date === stringValue);
        return (
            <ul className="events">
                {listData.map((item, i) => (
                    <li key={i}>
                        <Badge status={item.tag} key={i} text={item.todo} />
                    </li>
                ))}
            </ul>
        )
    }

    const getTableData = (dataArray) => {
        dataArray.boardInfo.map((data, i) => {
            if(dataArray.boardInfo[i].tag === "완료") {
                let dataValue = {
                    "key":(i+1).toString(),
                    "_id":dataArray.boardInfo[i]._id,
                    "name":dataArray.boardInfo[i].name,
                    "date":dataArray.boardInfo[i].date,
                    "time": dataArray.boardInfo[i].time,
                    "todo":dataArray.boardInfo[i].todo,
                    "memo":dataArray.boardInfo[i].memo,
                    "tag":["success"]
                };
                setTodoData(todoData => [...todoData, dataValue]);
            }
            if(dataArray.boardInfo[i].tag === "미완료") {
                let dataValue = {
                    "key":(i+1).toString(),
                    "_id":dataArray.boardInfo[i]._id,
                    "name":dataArray.boardInfo[i].name,
                    "date":dataArray.boardInfo[i].date,
                    "time": dataArray.boardInfo[i].time,
                    "todo":dataArray.boardInfo[i].todo,
                    "memo":dataArray.boardInfo[i].memo,
                    "tag":["error"]
                };
                setTodoData(todoData => [...todoData, dataValue]);
            }
            if(dataArray.boardInfo[i].tag === "진행중") {
                let dataValue = {
                    "key":(i+1).toString(),
                    "_id":dataArray.boardInfo[i]._id,
                    "name":dataArray.boardInfo[i].name,
                    "date":dataArray.boardInfo[i].date,
                    "time": dataArray.boardInfo[i].time,
                    "todo":dataArray.boardInfo[i].todo,
                    "memo":dataArray.boardInfo[i].memo,
                    "tag":["warning"]
                };
                setTodoData(todoData => [...todoData, dataValue]);
            }
        })
    }

    const onSelectDateCell = (newValue) => {
        //누른 셀의 날짜값을 YYYY/MM/DD로 변환하여 selectedValue state에 저장
        const dateData = moment(newValue._d).format('YYYY/MM/DD');
        setSelectedValue(dateData);
    }


    /** 일정 데이터 중 selectedValue와 같은 날짜만 todoList에 저장 */
    const getTodoList = (dataArray, selectedValue) => {
        /** 선택한 날짜의 할일만 필터링한 객체 */
        const TodoList = dataArray.filter(dataArray=>dataArray.date === selectedValue);
        /** 일정 개수만큼 반복, 객체 형식으로 배열에 추가 */
        TodoList.map((data, i) => {
            let value = {
                key: i+1,
                _id: data._id,
                todo: data.todo,
                memo: data.memo
            }
            /** 일정 리스트 배열 추가 */
            Arr.push(value)
        })
        setTodoList(Arr);
    }

    const showListModal = () => {
        setisListModalOpen(true);
    }

    const onListCancel = () => {
        setisListModalOpen(false);
    }


    const showWriteModal = () => {
        setisWriteModalOpen(true);
    }

    const onWriteStateChange = (e) => {
        setWriteValue(e.target.value);
    }

    const onWriteOk = () => {
        let body = {
          name : writeForm.getFieldValue(('name')),
          date : writeForm.getFieldValue(('date')),
          time : writeForm.getFieldValue(('time')),
          todo : writeForm.getFieldValue(('todo')),
          tag : writeForm.getFieldValue(('tag'))
      }
        // 게시판 작성 요청
        axios.post('http://localhost:3001/board', body).then((res) => {
          if(!res.data.success) {
              /** res 보고 예외처리 꼼꼼하게 */
              if(res.data.err.message) {
                  alert("에러 : " + res.data.err.message);
              } else {
                  alert("예외처리");
              }
          } else {
            setTodoData([]);
            dataArray = [];
            getTodo();
          }
        })
        setisWriteModalOpen(false);
    }

    const onWriteCancel = () => {
        setisWriteModalOpen(false);
    }

    /** 일정 리스트 중 하나 클릭하여 메모 모달 출력 */
    const enterMemoModal = (todoList) => {
        setMemoModalTitle(todoList.todoList.todo);
        setMemo_id(todoList.todoList._id);
        setMemoModalMemo(todoList.todoList.memo);
        setisListModalOpen(false);
        setisMemoModalOpen(true);
        
    }

    const onMemoOk = () => {
        let memoDetail = memoForm.getFieldValue(('memo'))
        let body = {
            _id : memo_id,
            memo : memoDetail
        }
        let memoAlert = "";
        if(memoDetail) {
            memoAlert = "메모를 작성하였습니다."
        } else {
            memoAlert = "메모를 지웠습니다."
        }
        axios.post('http://localhost:3001/memo', body).then((res) => {
            if(!res.data.success) {
                /** res 보고 예외처리 꼼꼼하게 */
                if(res.data.err.message) {
                    alert("에러 : " + res.data.err.message);
                } else {
                    alert("예외처리");
                }
            } else {
                alert(memoAlert);
                setisMemoModalOpen(false);
                setisListModalOpen(false);
            }
        })
    }

    const onMemoCancel = () => {
        setisMemoModalOpen(false);
        setisListModalOpen(true);
        setTodoData([]);
        dataArray = [];
        getTodo();
        getTodoList(todoData, selectedValue);
    }

    useEffect(() => {
        getTodo()
    },[]);

    useEffect(() => {
        writeForm.setFieldsValue({
            name: "",
            date: selectedValue,
            time: "",
            todo: "",
            tag: "진행중",
        });
        getTodoList(todoData, selectedValue);
    },[selectedValue])

    useEffect(() => {
        // 첫 번째와 두 번째 달력 렌더링은 작성 모달 출력 x
        if(mountCount != 2) {
            setMountCount(mountCount+1);
        } else if(mountCount == 2) {
            if(todoList[0]===undefined) {
                // 일정이 없다면 작성 모달 출력
                showWriteModal();
            }
            else {
                // 일정이 있다면 일정 리스트 모달 출력
                showListModal();
            }
        }
    },[todoList])

    useEffect(() => {
        memoForm.setFieldsValue({
            memo:memoModalMemo
        });
    },[memoModalMemo])

    return (
        <div>
            <div className="Header"><Header/></div>
            <div className="Nav" style={{float:"left"}}><Nav/></div>
            <div className="Content" style={{float:"left", width:"80%", paddingLeft:'5%', paddingRight:'5%'}}>
                <div className="Breadcrumb">
                    <Breadcrumb
                    style={{
                        margin: '20px 0 0 20px',
                    }}
                    >
                        <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
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

            <Modal title={selectedValue} open={isListModalOpen} onCancel={onListCancel}
                footer={[
                    <Button key="back" onClick={onListCancel}>
                        <UndoOutlined />취소
                    </Button>,
                    ]}
            >
                <div className="TodoList">
                <ul style={{listStyle: "none", paddingTop:"10px", paddingLeft:"0px"}}> 
                    {todoList.map((todoList, i) => (
                        <li key={i} ><Button type="link" key={i} onClick={() => enterMemoModal({todoList})} style={{color:'black'}}>{todoList.todo}</Button></li>
                    ))}
                    </ul>
                </div>
            </Modal>

            <Modal forceRender title={selectedValue + " 할 일 작성"} open={isWriteModalOpen} onCancel={onWriteCancel}
                footer={[
                    <Button key="back" onClick={onWriteCancel}>
                    <UndoOutlined/>취소
                    </Button>,
                    <Button key="submit" type="primary" onClick={onWriteOk}>
                    <CheckOutlined/>작성
                    </Button>
                ]}
            >
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
                            date : {selectedValue}
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
                            label="날짜"
                            name="date"
                            rules={[
                            {
                                message: 'Please input your password!',
                            },
                            ]}
                        >
                            <Input readOnly={true} />
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

            <Modal forceRender title="Memo" open={isMemoModalOpen} onCancel={onMemoCancel}
                footer={[
                    <Button key="back" onClick={onMemoCancel}>
                      <UndoOutlined/>취소
                    </Button>,
                    <Button key="submit" type="primary" onClick={onMemoOk}>
                      <CheckOutlined/>작성
                    </Button>
                  ]}
            >
                <div className="TodoMemo">
                    <div><p>{memoModalTitle}</p><hr/></div>
                    <div className="Form">
                    <Form form={memoForm} style={{marginTop:'5%'}}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                    autoComplete="off"
                    >
                        <Form.Item
                            label=""
                            name="memo"
                        >
                            <TextArea autoSize={{ minRows: 4, maxRows: 8}} />
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </Modal>
        </div>
    )
}

export default Calendar;