import React from 'react';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import headerImg from '../../assets/header2.jpg';

const useStyles = makeStyles(({
    root: {
        flexGrow: 1
    },
    headerContainer: {
        position: 'relative',
        height: 400,
        overflow: 'hidden',
        "&:before": {
            position: "absolute",
            content: '""',
            width: '100%',
            height: '100%',
            zIndex: 2,
            backgroundColor: 'red',
            opacity: .3
        }
    },
    headerImg: {
        position: 'absolute',
        maxWidth: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 1
    },
    contain: {
        zIndex: 3
    }
}));
//demolink
//header painting
//contact button
//authors
//why crm is fancy
//demolink again
//information about price
//feauters

export const WelcomePage = ({ className }) => {
    const classes = useStyles()

    return (
        <Grid component='section' className={classes.root}>
            <header className={classes.headerContainer}>
                <img src={headerImg} alt='header' className={classes.headerImg} />
                <Grid className={classes.contain}>
                    lllllll
                </Grid>
            </header>
        </Grid>

    )
}