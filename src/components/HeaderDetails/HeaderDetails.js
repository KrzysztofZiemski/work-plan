import React, { useState, useEffect } from 'react';
import { Paper, Grid, Table, TableRow, TableCell, TableBody, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ButtonLoader from './../ButtonLoader';
import { YES, NO } from '../../utils/conts';

const styles = makeStyles(({
    paper: {
        display: 'flex',
        minWidth: 380,
        borderRadius: 3,
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
        width: '100%',
        textAlign: 'center'
    },
}))

export const HeaderDetails = ({ content, className, onChange, isSubmiting, onRemove }) => {

    const [editable, setEditable] = useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const classes = styles();

    useEffect(() => {
        content.forEach(item => {
            setForm(prevState => ({
                ...prevState,
                [item.name]: item.value
            }));
            setErrors(prevState => ({
                ...prevState,
                [item.name]: false
            }));
        });
    }, [content]);

    if (!content) return null;
    const validateFields = () => {
        let isOk = true;
        content.forEach(fieldData => {
            if (!fieldData.pattern) return;
            const regExp = new RegExp(fieldData.pattern);
            const result = regExp.test(form[fieldData.name]);
            if (!result) {
                setErrors(prevState => ({
                    ...prevState,
                    [fieldData.name]: true
                }));
                return isOk = false;
            }
            if (form[fieldData.name]) setErrors(prevState => ({
                ...prevState,
                [fieldData.name]: false
            }));
        });
        return isOk;
    }

    const handleToggleEditable = () => setEditable(prevState => !prevState)
    const handleUpdate = () => {
        const isOk = validateFields();

        if (!isOk) return;
        onChange(form);
        setEditable(false);
    };


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    //TODO option select
    return (
        <Paper className={classes.paper}>
            <Grid className={className ? className : classes.root}>
                <Grid className={classes.dataContainer}>
                    <Table>
                        <TableBody>
                            {content.map(({ name, label, type, edit, options, value, errorMessage }) => (
                                <TableRow key={name} className={classes.row}>
                                    <TableCell>{label}</TableCell >
                                    <TableCell name={name}>
                                        {editable ?
                                            <TextField
                                                type={type}
                                                className={classes.input}
                                                name={name}
                                                onChange={edit ? handleChange : null}
                                                value={form[name]}
                                                disabled={!edit}
                                                select={type === 'select'}
                                                error={errors[name]}
                                                helperText={errors[name] && errorMessage ? errorMessage : null}
                                            >
                                                {type === 'select' &&
                                                    options.map(({ label, value }) => <MenuItem key={value} className={classes.input} value={value}>{label}</MenuItem >)
                                                }
                                            </TextField > :
                                            typeof value !== 'boolean' ? value :
                                                value ? YES : NO
                                        }
                                    </TableCell >
                                </TableRow >
                            ))}
                        </TableBody>
                    </Table >
                </Grid>
                <Grid className={classes.buttonsContainer}>
                    {
                        onRemove && editable ?
                            <ButtonLoader value={'USUŃ'} className={classes.button} fullWidth={false} onClick={onRemove} isSubmiting={isSubmiting} /> :
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

