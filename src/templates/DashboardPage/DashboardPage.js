
import React from 'react';
import hammer from '../../assets/hammer.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
    root: {
        flexGrow: 1
    },
    header: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '12em',
        fontFamily: '"Roboto Mono", "monospace"',
        textAlign: 'center',
        zIndex: 1,
        textTransform: 'uppercase',
        letterSpacing: '15px',
        color: '#3g3g3g',
        textShadow: '4px 5px 0px white',
    },
    container: {
        position: 'relative',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    img: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        maxWidth: '100%',
    }
}));

export const DashboardPage = ({ ...props }) => {
    const classes = useStyles()
    return (
        <section className={classes.root} {...props}>
            <div className={classes.container}>
                <h1 className={classes.header}>W budowie ...</h1>
                <div className={classes.img}>
                    <img src={hammer} alt='in building' />
                </div>
            </div>

        </section>
    );
};

