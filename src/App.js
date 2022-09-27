import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './component/Login.js';
import Home from './component/Home.js';
import Join from './component/Join.js';
import Todo from './component/Todo.js';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
