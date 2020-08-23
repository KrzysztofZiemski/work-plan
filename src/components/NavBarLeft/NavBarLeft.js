import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemCollapse from '../../components/ListItemCollapse';
import { Link } from 'react-router-dom';
import { default as routes } from '../../utils/routes';
import { UserContext } from '../../Contexts';

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
    disable: {
        backgroundColor: '#aaa',
        '&:hover': {
            backgroundColor: '#aaa',
        }
    }
}));

export const NavBarLeft = ({ isActive }) => {
    const classes = useStyles();
    const { activeLeftMenu } = useContext(UserContext)
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
                className={activeLeftMenu ? classes.root : classes.rootHidden}
            >
                <ListItem button component={Link} to={routes.root} selected={selected === 0 ? true : false} onClick={() => setSelected(0)}>
                    <ListItemText primary="Start" />
                </ListItem>

                <ListItemCollapse label="Plan pracy" in={true}>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to={routes.workPlan} selected={selected === 1 ? true : false} onClick={() => setSelected(1)} >
                            <ListItemText primary="Podgląd planu" />
                        </ListItem>
                        <ListItem button component={Link} to={routes.workPlanEdit} selected={selected === 2 ? true : false} onClick={() => setSelected(2)} >
                            <ListItemText primary="Edycja planu" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItemCollapse label='Raporty' disableStrictModeCompat={true}>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={routes.productionReport} selected={selected === 3 ? true : false} onClick={() => setSelected(3)}>
                            <ListItemText primary="Dodaj raport produkcji" />
                        </ListItem>
                        <ListItem button className={classes.subListItem} component={Link} to={routes.productionReportList} selected={selected === 4 ? true : false} onClick={() => setSelected(4)}>
                            <ListItemText primary="Raporty" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItem button to={routes.root} className={classes.disable}>
                    <ListItemText primary="Statystyki" />
                </ListItem>
                {/* <ListItemCollapse label='Statystyki' disableStrictModeCompat={true}>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 5 ? true : false} onClick={() => setSelected(5)}>
                            <ListItemText primary="Pracownicy" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 6 ? true : false} onClick={() => setSelected(6)}>
                            <ListItemText primary="Linie" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={'/'} selected={selected === 7 ? true : false} onClick={() => setSelected(7)}>
                            <ListItemText primary="Wpisy" />
                        </ListItem>
                    </List>
                </ListItemCollapse> */}
                <ListItemCollapse label='Zarządzanie' disableStrictModeCompat={true}>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={routes.employeeManagement} selected={selected === 8 ? true : false} onClick={() => setSelected(8)}>
                            <ListItemText primary="Pracownicy" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={routes.productManagement} selected={selected === 9 ? true : false} onClick={() => setSelected(9)}>
                            <ListItemText primary="Produkty" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={routes.lineManagement} selected={selected === 10 ? true : false} onClick={() => setSelected(10)}>
                            <ListItemText primary="Linie" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
                <ListItemCollapse label='Administracja' disableStrictModeCompat={true}>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={Link} to={routes.userManagement} selected={selected === 11 ? true : false} onClick={() => setSelected(11)}>
                            <ListItemText primary="Użytkownicy" />
                        </ListItem>
                    </List>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.subListItem} component={'a'} target="_blank" href={routes.swagger} selected={selected === 12 ? true : false} onClick={() => setSelected(12)}>
                            <ListItemText primary="Swagger" />
                        </ListItem>
                    </List>
                </ListItemCollapse>
            </List>
        </>
    );
}