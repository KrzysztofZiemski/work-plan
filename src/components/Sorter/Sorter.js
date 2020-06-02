import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import matchSorter from 'match-sorter';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import { SvgIcon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    sortIcon: {
        marginLeft: 20,
        cursor: 'pointer',
        transition: '.2s',
        "&:hover": {
            color: 'red'
        },
        "&:active": {
            transform: 'rotate(180deg)'
        }
    },
}))

export const Sorter = ({ list, onSearch, onSort, sortBy, filter }) => {
    const classes = useStyles();
    const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: ['name', 'lastName'] });
    const optionLabel = (option) => option.name && option.lastName ? `${option.name} ${option.lastName}` : null;

    const onChange = (e, value) => {
        onSearch(value);
    };
    const sort = () => {
        if (!onSort) return;
        const copy = [...list]
        if (sortBy) {
            //sort by properties, when first property is the most important
            const properties = sortBy.reverse();

            properties.forEach((property) => {
                copy.sort((a, b) => {
                    if (a[property] < b[property]) { return -1; }
                    if (a[property] > b[property]) { return 1; }
                    return 0;
                })
            })

        } else {
            copy.sort();
        }
        console.log(copy)
        onSort(copy);
    }
    return (
        <>
            <Grid
                container
                alignItems='center'
            >
                {onSearch ? <Grid item>
                    <Autocomplete
                        handleHomeEndKeys={true}
                        blurOnSelect={true}
                        disableCloseOnSelect={true}
                        freeSolo
                        disableClearable
                        options={list}
                        getOptionLabel={optionLabel}
                        style={{ width: 300 }}
                        filterOptions={filterOptions}
                        onChange={onChange}
                        renderInput={(params) => <TextField
                            {...params}
                            label={'szukaj'}
                            variant="outlined"
                            type='search'
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />}
                    />
                </Grid> :
                    null}
                {onSort ? <Grid item>
                    <SortByAlphaIcon className={classes.sortIcon} onClick={sort} />
                </Grid> :
                    null}
            </Grid>
        </>
    );
}