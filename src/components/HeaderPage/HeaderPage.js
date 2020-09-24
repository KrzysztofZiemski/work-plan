import { CardHeader } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    root: {
        textAlign: 'center',
        borderBottom: '1px solid black'
    }
}));
//title
export const HeaderPage = (props) => {
    const classes = useStyles();

    return (
        <CardHeader component='h1' {...props} className={classes.root} />
    );
};
