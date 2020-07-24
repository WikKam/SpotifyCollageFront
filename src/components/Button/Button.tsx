import React from 'react';
import styles from './Button.module.css';


const AuthButton = (props) => {


    return(<a className = {styles.button} href = {props.href}>{props.children}</a>)

}

export default AuthButton;