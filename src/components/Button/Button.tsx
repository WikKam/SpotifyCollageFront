import React from 'react';
import styles from './Button.module.css';


const AuthButton = (props) => {


    return(<div>{props.link &&
        <a
         onClick = {props.onClick}
        className = {styles.button} 
        href = {props.href}>{props.children}
        </a>}
        {props.button && 
            <button
             onClick = {props.onClick}
            className = {styles.button} 
            >{props.children}
            </button>}
            </div>
        )

}

export default AuthButton;