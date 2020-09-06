import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabItem from './../TabItem';
import { Card } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        justifyContent: 'space-around',
        margin: 10,
        backgroundColor: '#f6f6f6',
    },
    tabs: {
        backgroundColor: '#E2E1E1',
        borderRadius: 5
    },
    tabsActive: {
        backgroundColor: '#f6f6f6',

    }
}));

//headers shuld be an array of strings
//components should be array of React.Components
export const TabBars = ({ headers, components, className }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card className={className ? className : classes.root} >
            <Tabs value={value} onChange={handleChange} centered className={classes.tabsContainer}>
                {Array.isArray(headers) && headers.map((header, index) => <Tab key={index} value={index} label={header} className={index === value ? classes.tabsActive : classes.tabs}></Tab>)}
            </Tabs>
            {components.map((component, index) => <TabItem key={index} value={value} index={index}>{component}</TabItem>)}
        </Card>
    );
}