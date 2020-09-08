import React, { useState, useEffect } from 'react';
import { Paper, Grid, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ButtonLoader from './../ButtonLoader';

const styles = makeStyles(({
    paper: {
        display: 'flex',
        minWidth: 380,
        borderRadius: 20,
        backgroundColor: 'rgba(60,141,188,.1)',
        boxShadow: 'inset 39px 0px 78px -28px rgba(60,141,188,0.74)'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 10
    },
    button: {
        marginRight: 15,
    },
    input: {
        border: '1px solid grey',
        margin: 1,
        padding: 4,
        paddingLeft: 16,
        borderRadius: 5,
        '&:hover': {
            border: '2px solid grey',
            margin: 0,
        },
        '&:focus': {
            border: '2px solid #3C8DBC',
            margin: 0,
        },

    },
}))

export const HeaderDetails = ({ content, className, onChange, isSubmiting, onRemove }) => {

    const [editable, setEditable] = useState(false);
    const [form, setForm] = useState({});

    const classes = styles();

    useEffect(() => {
        content.forEach(item => setForm(prevState => ({
            ...prevState,
            [item.name]: item.value
        })))
    }, [content]);

    if (!content) return null;
    const handleToggleEditable = () => setEditable(prevState => !prevState)
    const handleUpdate = () => {
        onChange(form);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Paper className={classes.paper}>
            <Grid className={className ? className : classes.root}>
                <Grid className={classes.dataContainer}>
                    <Table>
                        <TableBody>
                            {content.map(element => (
                                <TableRow key={element.name} className={classes.row}>
                                    <TableCell>{element.label}</TableCell >
                                    <TableCell name={element.name}>
                                        {editable ?
                                            <input
                                                type={element.type}
                                                className={classes.input}
                                                name={element.name}
                                                onChange={element.edit ? handleChange : null}
                                                value={form[element.name]}
                                                disabled={!element.edit}>
                                            </input> :
                                            element.value}
                                    </TableCell >
                                </TableRow >
                            ))}
                        </TableBody>
                    </Table >
                </Grid>
                <Grid className={classes.buttonsContainer}>
                    {
                        onRemove && editable ?
                            <ButtonLoader value={'USUŃ LINIE'} className={classes.button} fullWidth={false} onClick={onRemove} isSubmiting={isSubmiting} /> :
                            null
                    }
                    {
                        onChange ?
                            <ButtonLoader value={editable ? 'zapisz' : 'edytuj'} className={classes.button} fullWidth={false} onClick={editable ? handleUpdate : handleToggleEditable} isSubmiting={isSubmiting} /> :
                            null
                    }
                </Grid>
            </Grid >
        </Paper>
    )
};
