import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


export const TabItem = ({ children, value, index, ...other }) => {

    return (
        <div
            role="tab"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}