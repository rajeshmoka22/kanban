import './App.css';
import Kanban from './Kanban';

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          {/* <i className="fab fa-centos fa-2x"></i> */}
          <i className="fas fa-cube fa-2x"></i>
          &ensp;
          <span className="name">Kanban Board</span>
          <span className="instruction">Drag and drop the cards to change their state</span>
        </div>
      </div>
      <Kanban />
    </div>
  );
}

export default App;
