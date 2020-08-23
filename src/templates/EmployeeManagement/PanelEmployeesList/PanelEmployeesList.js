import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: '#222d32',
        color: '#fff',
        padding: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
}));

export const PanelEmployeesList = ({ value, options, setFilter }) => {

    const renderOptions = () => {
        if (!options) return null
        const output = [];
        for (let option in options) {
            output.push(<MenuItem value={options[option].value}>{options[option].name}</MenuItem>);
        };
        return output;
    }
    const classes = useStyles();
    const handleFiltrEmployees = (e) => setFilter(e.target.value);

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="activeLabel">Pokaż</InputLabel>
                <Select
                    labelId="employee-management-select-label"
                    id="employee-management-select"
                    value={value}
                    onChange={handleFiltrEmployees}
                >
                    {renderOptions()}
                </Select>
            </FormControl>
        </>
    );
};