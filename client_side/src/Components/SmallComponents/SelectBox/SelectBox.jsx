import React, { useEffect, useState } from 'react';
import './SelectBox.css';

function SelectBox(props) {

    const [options, setOptions] = useState(["Select"]);


    useEffect(() => {
        //api/${props.id}
        fetch(`https://api-recipe-react-nodejs.herokuapp.com/api/select?type=${props.id}`).then(response => {
            if(response.status === 500) {
                alert("Error, Try again later");
                return;
            }
            else return response.json()
        }).then(data => {
                setOptions((oldArray) => [...oldArray, ...data.result])
            })

    }, []);

    return (
        <React.Fragment>
            <label htmlFor={props.id}>{props.label}</label>
            <select className="form-control" name={props.id} id={props.id} onChange={props.onChange} value={props.value}>
                {options !== [] ? options.map((option, key) =>
                    <option key={key} value={option}>{option}</option>
                ) : null}
            </select>
        </React.Fragment>
    );
}
export default SelectBox;