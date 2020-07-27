import React, {useState} from "react";
import styles from "./TypeSelector.module.css";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, ThemeProvider} from '@material-ui/core';

 export const inputTheme = createMuiTheme({
    overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          color: "orange",
          fontFamily: 'GothamMedium',
          "&$focused": { // increase the specificity for the pseudo class
            color: "#1DB954"
          }
        }
      }
    }
  });

const TypeSelector = (props) =>{

    const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    select: {
        '&:before': {
            borderColor: '#1DB954',
        },
        '&:after': {
            borderColor: '#1DB954',
        },
        color: 'white', 
        fontFamily: 'GothamMedium',

    },
    icon: {
        fill: props.disabled ? 'gray' : 'white',
    },
    label: {
        color: props.disabled ? 'gray' : 'white',
        fontFamily: 'GothamMedium',
        '&:active':{
            color: '#1DB954'
        },
        '&:before' : {
            color: '#1DB954',
        },
        '&:after' : {
            color: '#1DB954',
        },
    },
    menu: {
        "& ul": {
            backgroundColor: "#4e4b4a",
        },
        "& li":{
            color: 'white',
            textAlign: 'left',
            fontFamily: 'GothamMedium',
        },

        "& li:disabled": {
            color: 'gray'
        },
    }
  }));
  
    const classes = useStyles();
    const [type, setType] = useState('');

    const typeHandler = (event) => {
        if(props.callback){
            props.callback(event);
        }
        setType(event.target.value);
    }

    return(
    <div className = {styles.container}>
        <FormControl className = {classes.formControl}>
            <ThemeProvider theme = {inputTheme}>
    <InputLabel className = {classes.label} id = {`${props.type}-select-label`}>{props.title}</InputLabel>
            </ThemeProvider>
            <Select
            className = {classes.select}
            labelId = {`${props.type}-select-label`}
            id = {`${props.type}-select`}
            value = {type}
            onChange = {typeHandler}
            MenuProps = {{
                classes: {
                    paper: classes.menu
                }
            }}
            inputProps = {{
                classes: {
                    icon: classes.icon,
                }
            }}
            disabled = {props.disabled}
            >
                {props.children}
            </Select>
        </FormControl>
    </div>)

}

export default TypeSelector;