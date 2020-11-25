import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(({
    root: {
        width: '100%',
        padding: '2px',
        backgroundColor: 'rgba(10,10,10,.5)',
        borderRadius: 5,
        boxShadow: "0px 2px 5px 0px grey"
    },
}))



export const LineDecoration = () => {
    const classes = styles()
    return (
        <div className={classes.root}>
        </div>
    );
};
