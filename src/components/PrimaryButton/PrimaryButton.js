import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export function PrimaryButton({ value, onClick, size, className }) {
    const classes = useStyles();

    return (
        <>
            <Button variant="contained" size={size ? size : "large"} color="primary" className={className ? className : classes.margin} onClick={onClick}>
                {value}
            </Button>
        </>
    );
}