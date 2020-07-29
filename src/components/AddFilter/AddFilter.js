import React, { useState } from 'react';
import { FormControl, InputLabel, Select, makeStyles, Grid, MenuItem } from '@material-ui/core';
import PrimaryButton from './../../components/PrimaryButton';
const useStyles = makeStyles(({
    root: {
        display: 'flex'
    },
    selectInput: {
        flexGrow: 1
    }
}))
//render function (element)=>element properties to rendec example: (element)=>`${element.name} ${element.lastName}`
export const AddFilter = ({ list, render }) => {

    const classes = useStyles();
    let [inputValue, setInputValue] = useState("");

    if (!list) return null
    console.log('inputValue', inputValue)


    const onChange = ({ target }) => setInputValue(target.value);


    const renderOptions = () => {
        if (!render) return list.map((el, index) => <MenuItem key={el} className={classes.options} name={index}>{el}</MenuItem >);
        return list.map((el, index) => <MenuItem key={`filterOptions${index}`} className={classes.options} value={el}>{`${render(el)}`}</MenuItem >)
        // <option key={`${element}${index}`} className={classes.options} value={element.id}>{`${element}`}</option>
    }
    return (
        <Grid className={classes.root}>
            <FormControl variant="outlined" className={classes.selectInput}>
                <InputLabel htmlFor="filter">Pracownicy</InputLabel>
                <Select
                    defaultValue=""
                    id='filter'
                    label='Pracownicy'
                    value={inputValue}
                    onChange={onChange}
                >
                    <option aria-label="None" name={-1} value="" />
                    {renderOptions()}
                </Select>
            </FormControl>
            <PrimaryButton>Dodaj filtr</PrimaryButton>
        </Grid >
    );
}

