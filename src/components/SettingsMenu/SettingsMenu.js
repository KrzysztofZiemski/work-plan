import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({

    grow: {
        flexGrow: 1,
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

}));

export const SettingsMenu = ({ children }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);


    const handleProfileMenuOpen = (event) => {
        if (!children) return;
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const showOptionsPanel = () => {
        return <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
        >
            <SettingsIcon />
        </IconButton>
    }
    const renderChildresn = () => {
        if (!children) return null;
        if (Array.isArray(children)) {
            return children.map(child => <MenuItem onClick={handleMenuClose}>{child}</MenuItem>)
        }
        return <MenuItem onClick={handleMenuClose}>{children}</MenuItem>
    }
    return (
        <div className={classes.grow}>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
                {showOptionsPanel()}
            </div>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {renderChildresn()}
            </Menu>
        </div>
    );
}
