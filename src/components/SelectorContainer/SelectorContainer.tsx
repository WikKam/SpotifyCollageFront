import React, {useState} from 'react';
import styles from './SelectorContainer.module.css';
import { MenuItem, Modal, CircularProgress } from '@material-ui/core';
import {TypeSelector} from '../index';
import {Button} from '../index';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import fetchData from '../../api/index';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      textAlign: "center" as const,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        minWidth: 500,
        minHeight: 500,
        outline: 0,
        position: 'absolute',
        backgroundColor: "#4e4b4a",
        boxShadow: theme.shadows[5],
        display: 'block',
        margin: 'auto',
        padding: theme.spacing(2, 4, 3),
      },
      loader: {
          borderColor: '#1DB954',
          color: '#1DB954',
          minHeight: 200,
          minWidth: 200,
          marginTop: '25%'
      }
    }),
  );


const SelectorContainer = (props) => {
    const classes = useStyles();
    const imagePlaceholder = <CircularProgress className = {classes.loader} />
    const [isTimeDisabled, setIsTimeDisabled] = useState(true);
    const [isPlaylistDisabled, setIsPlaylistDisabled] = useState(true);
    const [type, setType] = useState(null);
    const [size, setSize] = useState(null);
    const [playlist, setPlaylist] = useState(null);
    const [time, setTime] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(imagePlaceholder);
    const handleOpen = () => {
        const url = createUrl();
        console.log(url);
        if(url == 'error'){
            alert('Please select all parameters and try again!');
            return;
        }
        setOpen(true);
        getImage(url).then(result => {
            if(result == 'error'){
                alert('Something went wrong. Refreshingn page...');
                window.location.reload();
                return;
            }
            if(result == 'unauthorised'){
                alert('Auth Token expired. Refreshingn page to acquire a new one...');
                window.location.reload();
                return;
              }
            console.log(result);
            let img = URL.createObjectURL(result);
            console.log(img);
            setImage(<img className = {styles.collage} alt = 'collage' src = {img}/>);
            setLoaded(true);
        })
    }

    const getImage = (url) => fetchData(url, props.token, true);


    const handleClose = () => {
        setOpen(false);
        setImage(imagePlaceholder);
        setLoaded(false);
    }
    const typeSelectorCallback = (event) => {
        setType(event.target.value);
        if(event.target.value === 'top-artists' || event.target.value === 'top-tracks'){
            setIsTimeDisabled(false);
            setIsPlaylistDisabled(true);
        }
        else if(event.target.value === 'playlists'){
            setIsTimeDisabled(true);
            setIsPlaylistDisabled(false);
        }
        else{
            setIsTimeDisabled(true);
            setIsPlaylistDisabled(true);
        }
    }

    const createUrl = () => {
        let base = '';
        if(type && size){
            base += '/user/' + type;
            if(type == 'recently-played'){
                base += '/images';
                base += '?size=' + size;
                return base;
            }
            if(type == 'playlists' && playlist){
                base += '/' + playlist + '/images';
                base += '?size=' + size;
                return base;
            }
            else if(time){
                base += '/images';
                base += '?time_range=' + time + '&size=' + size;
                return base;
            }
        }
        return 'error';

    }

    const selectorCallback = (event, func) =>{
        func(event.target.value);
    }
    return (
        <div>
        <div className = {styles.container}>
        <TypeSelector callback = {typeSelectorCallback} title = "Collage Type">
                <MenuItem value = {'recently-played'}>Recently Played Tracks (50)</MenuItem>
                <MenuItem value = {'top-artists'}>Top Artists</MenuItem>
                <MenuItem value = {'top-tracks'}>Top Tracks</MenuItem>
                <MenuItem value = {'playlists'}>Playlist</MenuItem>
        </TypeSelector>
        <TypeSelector callback = {(event) => selectorCallback(event, setSize)} title = "Size">
                <MenuItem value = {2}>2x2</MenuItem>
                <MenuItem value = {3}>3x3</MenuItem>
                <MenuItem value = {4}>4x4</MenuItem>
                <MenuItem value = {5}>5x5</MenuItem>
                <MenuItem value = {6}>6x6</MenuItem>
        </TypeSelector>
        <TypeSelector callback = {(event) => selectorCallback(event, setTime)} disabled = {isTimeDisabled} title = "Time Span">
                <MenuItem value = {'short_term'}>Short (~4 weeks)</MenuItem>
                <MenuItem value = {'medium_term'}>Medium (~6 months)</MenuItem>
                <MenuItem value = {'long_term'}>Long (several years)</MenuItem>
        </TypeSelector>
        <TypeSelector callback = {(event) => selectorCallback(event, setPlaylist)} disabled = {isPlaylistDisabled} title = "Playlist Name">
                {props.playlists&&props.playlists.map(playlist => 
                <MenuItem key = {playlist}
                value = {playlist}>
                    {playlist}
                </MenuItem>)}
        </TypeSelector>
        </div>
        <div className = {styles.buttonContainer}>
        <Button onClick = {handleOpen} button>Generate Collage</Button>
        <Modal
            open = {open}
            onClose = {handleClose}
            >
            <div style = {getModalStyle()} className = {classes.paper}>{image}
                    
            <div className = {styles.buttonContainer}>
                {loaded&&<Button onClick = {handleClose} button>Close</Button>}
            </div>
            </div>
        </Modal>
        </div>
        </div>
    )
}

export default SelectorContainer