import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemCollapse from '../../components/ListItemCollapse';
import { Link } from 'react-router-dom';
import { default as routes } from '../../routes';

const useStyles = makeStyles(() => ({
    root: {
        width: 240,
        maxWidth: 360,
        transition: '.5s',
        height: '100vh',
        backgroundColor: '#222d32',
        color: '#fff',
        position: 'sticky',
        top: 0,
        overflow: 'auto'
    },
    rootHidden: ({
        width: 240,
        marginLeft: -240,
        maxWidth: 360,
        transition: '.5s',
        height: '100%',
        flexGrow: 1,
        backgroundColor: '#222d32',
        position: 'sticky',
        top: 0,
        overflow: 'auto'
    }),
    subheader: ({
        color: '#fff',
        height: 100,
        textAlign: 'center',
        fontSize: 20
    }),
}));

export const NavBarLeft = ({ isActive }) => {
    const classes = useStyles();

    let [selected, setSelected] = useState(null);

    return (
        <>
            <List
                component="nav"
                varian='primary'
                subheader={
                    <ListSubheader component="div" className={classes.subheader}>
                        Menu
                    </ListSubheader>
                }
                className={isActive ? classes.root : classes.rootHidden}
            >
                <ListItem button component={Link} to={routes.root} selected={selected === 0 ? true : false} onClick={() => setSelected(0)}>
                    <ListItemText primary="Start" />
                </ListItem>

                <ListItemCollapse label="Plan pracy">
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to={routes.workPlan} selected={selected === 1 ? true : false} onClick={() => setSelected(1)}>
                            <ListItemText primary="Podgląd planu" />
                        </ListItem>
                        <ListItem button component={Link} to={routes.workPlanEdit} selected={selected === 2 ? true : false} onClick={() => setSelected(2)}>
                            <ListItemText primary="Edycja planu" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItemCollapse label='Produktywność'>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 3 ? true : false} onClick={() => setSelected(3)}>
                            <ListItemText primary="Dodaj" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItemCollapse label='Statystyki'>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 4 ? true : false} onClick={() => setSelected(4)}>
                            <ListItemText primary="Pracownicy" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 5 ? true : false} onClick={() => setSelected(5)}>
                            <ListItemText primary="Linie" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 6 ? true : false} onClick={() => setSelected(6)}>
                            <ListItemText primary="Wpisy" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItemCollapse label='Zarządzanie'>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 7 ? true : false} onClick={() => setSelected(7)}>
                            <ListItemText primary="Pracownicy" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 8 ? true : false} onClick={() => setSelected(8)}>
                            <ListItemText primary="Produkty" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItemCollapse label='Administracja'>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 9 ? true : false} onClick={() => setSelected(9)}>
                            <ListItemText primary="Użytkownik" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 10 ? true : false} onClick={() => setSelected(10)}>
                            <ListItemText primary="Ustawienia" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 11 ? true : false} onClick={() => setSelected(11)}>
                            <ListItemText primary="Swagger" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
            </List>
        </>
    );
}