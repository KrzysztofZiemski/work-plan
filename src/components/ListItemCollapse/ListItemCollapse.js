import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
    subList: ({
        paddingLeft: 30,
    })
}));

export const ListItemCollapse = ({ children, label }) => {
    let [open, setOpen] = useState()
    const classes = useStyles();
    const handleOpen = (selectedList) => {
        setOpen(!open)
    };
    return (
        <>
            <ListItem button onClick={handleOpen} >
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding className={classes.subList}>
                    {children}
                </List>
            </Collapse>
        </>
    )
}