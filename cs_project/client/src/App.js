import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './css/style.css';
import Login from './component/Login.js';
import Home from './component/Home.js';
import Join from './component/Join.js';
import Todo from './component/Todo.js';
import Calendar from "./component/Calendar/Calendar.js";
import Staff from "./component/Staff.js";
import Notice from "./component/Notice.js";
import WriteNotice from "./component/WriteNotice.js";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/writenotice" element={<WriteNotice />} />
      </Routes>
    </Router>
  );
}

export default App;
