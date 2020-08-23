import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button: {
        padding: '13px 26px',
        borderWidth: 3,
        boxShadow: '0px 0px 0px 3px white, 0px 0px 0px 5px #303f9f',
        '&:hover': {
            borderWidth: 3,
            boxShadow: '0px 0px 0px 5px  white',
        },
        margin: 8,
        [theme.breakpoints.up('xs')]: {
            letterSpacing: 2,
            fontSize: '.9em',
            padding: '6px 13px',
        },
        [theme.breakpoints.up('sm')]: {
            letterSpacing: 2,
            fontSize: '1.5em',
            padding: '13px 26px',
        },
    }
}))
export const HeaderButton = ({ value, onClick, className, children }) => {
    const classes = useStyles();

    return (
        <Button color="primary" variant='contained' onClick={onClick} className={classes.button} >
            {children ? children : value}
        </Button >
    );
};
