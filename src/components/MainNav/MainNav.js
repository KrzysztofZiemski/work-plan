import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    tabs: {
        flexGrow: 1,
    },
    logoutButton: {
        marginRight: 20
    }
}));

export const MainNav = ({ onClick }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Grid
                    container
                    alignItems="center"
                >
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={onClick}>
                        <MenuIcon />
                    </IconButton>

                    <Tabs className={classes.tabs} value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab to='/' component={Link} label="Start" />
                        <Tab to='/graphic' component={Link} label="Grafik">
                        </Tab>
                        <Tab to='/cos' label="Urlopy" component={Link} />
                    </Tabs>
                    <Button className={classes.logoutButton} to='logout' color="inherit" component={Link}>Wyloguj</Button>
                </Grid>
            </AppBar>

        </div >
    );
}