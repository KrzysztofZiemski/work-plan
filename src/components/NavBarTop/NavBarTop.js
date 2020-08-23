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
import { UserContext } from '../../Contexts';
import routes from '../../utils/routes';
import Grid from '@material-ui/core/Grid';

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

    const { loggedUser, setActiveLeftMenu } = useContext(UserContext);

    console.log('loggedUser', loggedUser)
    const isMenuOpen = Boolean(anchorEl);

    const toggleLeftMenu = () => {
        setActiveLeftMenu(prevState => !prevState);
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
            <MenuItem component={Link} to={routes.settings} onClick={handleMenuClose}>Ustawienia</MenuItem>
            <MenuItem component={Link} onClick={handleMenuClose} as={Link} to={routes.logout}>Wyloguj</MenuItem>
        </Menu>
    );

    const showOptionsPanel = () => {
        if (!loggedUser) {
            return <Button component={Link} to={routes.login} className={classes.button} variant="contained" >
                Zaloguj
                    </Button>;
        }
        return <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
        >
            <span className={classes.nameAvatar}> {`${loggedUser.name} ${loggedUser.surname}`}</span>
            <AccountCircle />
        </IconButton>
    }
    console.log('dssd', loggedUser)
    return (
        <Grid component='nav'>
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
                        H E X T L
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {showOptionsPanel()}
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Grid>
    );
}
