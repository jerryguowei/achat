
import React from 'react';
import './index.css';

interface HeaderProps {
  handleSubmit: Function,
  handleChange: Function
}
const RequestHeader = (props: HeaderProps) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.handleChange(event.target.value);
  }

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    var code = event.key;
    if (code === "Enter") {
      event.preventDefault();
      props.handleSubmit();
    }
  }

  return (<div className="request-header">
    <div className="header">New Friends</div>
    <div className="input-area">
      <input type="text"
        className="search-input"
        placeholder="Search Friends"
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
    </div>
  </div>)
}


export default RequestHeader;
