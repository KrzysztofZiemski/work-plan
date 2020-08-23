import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import HeaderButton from '../HeaderButton';
import headerBackgroundMax from '../../../assets/header-max.jpg';
import headerBackgroundMin from '../../../assets/header-min.jpg';
import headerBackgroundMiddle from '../../../assets/header-middle.jpg';
import { AuthService } from '../../../services/AuthService';
import { UserContext } from '../../../Contexts';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '1%',
        [theme.breakpoints.up('xs')]: {
            backgroundImage: `url(${headerBackgroundMin})`,
        },
        [theme.breakpoints.up('sm')]: {
            backgroundImage: `url(${headerBackgroundMiddle})`,
        },
        [theme.breakpoints.up('md')]: {
            backgroundImage: `url(${headerBackgroundMax})`,
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: 0,
            backgroundColor: 'red',
            opacity: .2,
        },
    },
    title: {
        // mixBlendMode: 'difference',
        zIndex: 1,
        textShadow: '0px 0px 14px #CE5937',
        [theme.breakpoints.up('xs')]: {
            letterSpacing: 2,
            fontSize: '2em',
        },
        [theme.breakpoints.up('sm')]: {
            letterSpacing: 2,
            fontSize: '6em',
        },
    },
    paragraph: {
        zIndex: 1,
        marginBottom: '5%',
        marginTop: '1%',
        textShadow: '0px 0px 14px #CE5937',
        [theme.breakpoints.up('xs')]: {
            letterSpacing: 2,
            fontSize: '1.3em',
            textAlign: 'center'
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
        },
    },
}))

export const Header = () => {
    const classes = useStyles();
    const { setLoggedUser } = useContext(UserContext);

    const handleLogDemo = async () => {
        try {
            await AuthService.authentication('demouser', 'DemoUser1!');
            const user = await AuthService.getAuthUser();
            setLoggedUser(user);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <Grid component='section' className={classes.root}>
            <h1 className={classes.title}>HEXTL</h1>
            <p className={classes.paragraph}><strong>CRM</strong> - nowe narzedzia do Twojej pracy</p>
            <HeaderButton onClick={handleLogDemo}>SPRAWDŹ DEMO</HeaderButton>
        </Grid>
    );
};
