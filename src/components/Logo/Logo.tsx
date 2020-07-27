import React from 'react';
import styles from './Logo.module.css';

const Logo = (props) => {

    return (
    <div className = {styles.title}>
        <img alt = 'spotify-logo' className = {styles.logo} src={props.src}/>
        <h1>{props.children}</h1>
    </div>)
}

export default Logo