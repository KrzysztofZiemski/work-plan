import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
//test loggedUser

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#3c8dbc'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    nameAvatar: {
        fontSize: 13,
        paddingRight: 8
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    button: {
        background: '#fff',
    }

}));

export const NavBarTop = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { loggedUser, setActiveLeftMenu, activeLeftMenu } = useContext(UserContext);

    const isMenuOpen = Boolean(anchorEl);

    const toggleLeftMenu = () => {
        if (activeLeftMenu) return setActiveLeftMenu(false);
        setActiveLeftMenu(true);
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to='/settings' onClick={handleMenuClose}>Ustawienia</MenuItem>
            <MenuItem component={Link} to='logout' onClick={handleMenuClose}>Wyloguj</MenuItem>
        </Menu>
    );



    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    {loggedUser ?
                        <IconButton
                            onClick={toggleLeftMenu}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton> :
                        null}
                    <Typography className={classes.title} variant="h6" noWrap>
                        Nazwa firmy
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {/* <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton> */}
                        {/* <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        {loggedUser ?
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"

                            >
                                <span className={classes.nameAvatar}> {`${loggedUser.name} ${loggedUser.surname}`}</span>
                                <AccountCircle />
                            </IconButton> : <Button component={Link} to='/login' className={classes.button} variant="contained" >
                                Zaloguj
                            </Button>

                        }
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
