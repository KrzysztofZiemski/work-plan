import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import { default as routes } from '../../routes';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 240,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        transition: '.5s'
    },
    rootHidden: ({
        width: 240,
        marginLeft: -240,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
        transition: '.5s'
    }),
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export const NavBarLeft = ({ isActive }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Jakiś tytuł
                 </ListSubheader>
            }
            className={isActive ? classes.root : classes.rootHidden}
        >
            <ListItem button component={Link} to={routes.root}>
                <ListItemText primary="Start" />
            </ListItem>

            <ListItem button onClick={handleClick} >
                <ListItemText primary="Plan pracy" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={Link} to={routes.workPlan}>
                        <ListItemText primary="Podgląd planu" />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={routes.workPlanEdit}>
                        <ListItemText primary="Edycja planu" />
                    </ListItem>
                </List>
            </Collapse>
        </List>
    );
}