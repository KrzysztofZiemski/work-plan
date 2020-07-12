import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: 999,
        color: '#fff',
    },
    progressBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
}));

export const Loader = ({ open, size, backdor = true }) => {
    const classes = useStyles();

    return (
        <>
            {
                backdor ? <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" size={size ? size : 50} thickness={5} variant="indeterminate" />
                </Backdrop> :
                    <div className={classes.progressBar}>
                        <CircularProgress color="inherit" size={size ? size : 50} thickness={3} variant="indeterminate" />
                    </div>
            }
        </>
    );
}