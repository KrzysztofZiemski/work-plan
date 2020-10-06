import React, { useMemo } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPeriodsList } from '../../../helpers/dateHelper';
import { rankingTypes } from '../../../utils/conts';

const getName = (periodName) => {
    switch (periodName) {
        case rankingTypes.YEAR:
            return 'tydzień'
        case rankingTypes.HALF_YEAR:
            return 'półrocze'
        case rankingTypes.QUARTER:
            return 'kwartał'
        case rankingTypes.MONTH:
            return 'miesiąc'
        case rankingTypes.WEEK:
            return 'tydzień'
        default:
            return 'okres'
    }
}

const useStyles = makeStyles(({
    select: {
        textAlign: 'center',
        padding: 0,
        '&:focus': {
            backgroundColor: 'red'
        }
    },
}))

export const SelectPeriodList = ({ periodType, onChange, numberWeek, ...props }) => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles()
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => onChange(event.target.value);
    ///todo
    const menuList = useMemo(() => {
        return getPeriodsList(periodType).map(({ start, number }) => (
            <MenuItem key={number} value={number}>{`${getName(periodType)} ${number}`} </MenuItem>
        ))
    }, [periodType])

    return (
        <Select
            {...props}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={numberWeek}
            onChange={handleChange}
            className={classes.select}
        >
            {menuList}
        </Select >
    );
};