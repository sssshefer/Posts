import React from 'react';
import classes from './MyInput.module.css';

//forwardRef is needed for sending ref to our modules
const MyInput = React.forwardRef((props,ref) => {
    return (
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;