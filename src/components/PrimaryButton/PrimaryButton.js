import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export function PrimaryButton({ value, onClick }) {
    const classes = useStyles();

    return (
        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={onClick}>
            {value}
        </Button>
    );
}