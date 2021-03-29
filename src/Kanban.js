import React, {useEffect, useState, useRef} from 'react';
import {data} from './data.js';

function Kanban() {
  const [kanbanData, setKanbanData] = useState(data);
  const statusRef = useRef(null);
  const indexRef = useRef(null);
  const classNames = {
    'Design': 'blue',
    'Improvement': 'violet',
    'User Interface': 'orange',
    'Review': 'blue',
    'Performance': 'violet',
    'Database': 'violet',
    'SEO': 'orange'
  }

  useEffect(() => {
    console.log(kanbanData);
  })
  const handleGroupDragEnter = (e) => {
    if(e.currentTarget.className === "group") e.currentTarget.style.border = '2px dashed #2a60e4';
  }

  const handleGroupDragLeave = (e) => {
    console.log(e.currentTarget.className);
    if(e.currentTarget.className === "group") e.currentTarget.style.border = '';
  }

  const onDragStart = (e, status, index) => {
    e.currentTarget.style.opacity = '0.5';
    statusRef.current = status;
    indexRef.current = index;
  }

  const handleGroupDragOver = (e) => {
    e.preventDefault();
    if(e.currentTarget.className === "group") e.currentTarget.style.border = '2px dashed #2a60e4';
  }

  const handleGroupDrop = (e, status) => {
    const kanbanClone = JSON.parse(JSON.stringify(kanbanData));
    if(status && indexRef.current>=0 && statusRef.current) {
      const droppedCard = kanbanClone[statusRef.current].splice(indexRef.current, 1);
      kanbanClone[status].push(droppedCard[0]);
      setKanbanData(JSON.parse(JSON.stringify(kanbanClone)));
    }
    indexRef.current = '';
    statusRef.current = '';
    resetborder();
  }

  const resetborder = () => {
    const groups = document.querySelectorAll('.group');
    groups.forEach(group => {
      group.style.border = '';
    })
  }

  const onDragEnd = (e) => {
    e.currentTarget.style.opacity = "";
  }

  const getClassName = (tag) => {
    return classNames[tag];
  }

  return  (
    <div className="kanbanGroups">
      {
        Object.keys(kanbanData).map(status => (
          <div className="groupContainer" key={status}>
            <div className='groupName'>{status}</div>
            <div
              className="group"
              name={status}
              onDragEnter={(e) => handleGroupDragEnter(e)}
              onDragLeave={(e) => handleGroupDragLeave(e)}
              onDragOver={(e) => handleGroupDragOver(e)}
              onDrop={(e) => handleGroupDrop(e, status)}
            >
              {kanbanData[status].map((item, index) => (
                <div
                  className="card"
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, status, index)}
                  onDragEnd={(e) => onDragEnd(e, status)}
                  key={`${status}_${item.name}_${index}`}
                >
                  <div className="tagContainer">
                    <div className={`tag ${getClassName(item.tag)}`}>{item.tag}</div>
                  </div>
                  <div className="taskName">{item.name}</div>
                  <div className="taskDescription">{item.description}</div>
                  <div className="cardFooter">
                    <i className="fas fa-paperclip"></i>
                    <i className="far fa-comment-dots"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Kanban;