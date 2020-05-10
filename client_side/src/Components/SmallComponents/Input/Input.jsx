import React from 'react';
function Input(props) {
    return (
        <React.Fragment>
            <label htmlFor={props.id}>{props.label}</label>
            <input className="form-control" value={props.value} onChange={props.onChange} type="text" name={props.id} id={props.id} />
        </React.Fragment>
    );
}
export default Input;