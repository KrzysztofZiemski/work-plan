import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles(({
    root: {
        display: 'flex',
        height: '100%'
    },
    about: {
        display: 'flex',
        minWidth: 380,
        borderRadius: 20,
        // backgroundColor: 'rgba(60,141,188,.1)',
        margin: '0px 40px 00px 0px',
        backgroundColor: 'rgba(60,141,188,.1)',
        boxShadow: 'inset 39px 0px 78px -28px rgba(60,141,188,0.74)'
    },
    about__titles: {
        padding: '0 40px 0 30px',
        position: 'relative',
        overflow: 'hidden',
        '& *': {
            margin: 20
        }
    },
    about__separator: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 2,
        height: '100%',
        backgroundColor: '#5485a2'
    },
    about__values: {
        padding: '0 40px 0 30px',
        '& *': {
            margin: 20
        },
        height: '100%'
    },
}))
//content=[{name:'',value:''},{name:'',value:''},...]

export const HeaderDetails = ({ content, className }) => {
    const classes = styles();
    if (!content) return null;
    const renderDetails = () => {
        const titles = [];
        const values = [];
        content.forEach((element, index) => {
            titles.push(<Typography key={`${element.name}${index}`} component={'p'}>{element.name}</Typography>)
            values.push(<Typography key={`${element.value}${index}`} component={element.type ? element.type : 'p'}>{element.value}</Typography>)
        })
        return (
            <Grid className={className}>
                <Grid className={classes.root}>
                    <Grid className={classes.about__titles}>
                        {titles}
                        <span className={classes.about__separator}></span>
                    </Grid>
                    <Grid className={classes.about__values}>
                        {values}
                    </Grid>
                </Grid>
            </Grid >
        )
    }

    return (
        <Paper className={classes.about}>
            {renderDetails()}
        </Paper>
    );
};
