import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import Sidebar from "./components/SideBar";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full  flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
