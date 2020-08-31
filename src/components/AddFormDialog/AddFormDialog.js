import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../PrimaryButton';

const useStyles = makeStyles(() => ({
    formGroup: {
        margin: '10px 50px 40px',
        minWidth: 400,
    },
    fields: {
        margin: 10
    }
}))
export const AddFormDialog = ({ onSubmit, fields, button, title }) => {

    let [fieldsValue, setFieldsValue] = useState({});
    let [errors, setErrors] = useState();
    let [open, setOpen] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const fieldsState = {};
        const errorFieldState = {};

        fields.forEach(field => {
            errorFieldState[field.name] = false;
            fieldsState[field.name] = '';
        });
        setFieldsValue(fieldsState);
        setErrors(errorFieldState);
    }, [fields]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        e.preventDefault();
        setFieldsValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleChangeSelect = (name, value) => {
        setFieldsValue(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleClose = () => {
        setOpen(false);
    };
    const validation = () => {
        let isOk = true;
        fields.forEach(objField => {
            if (!objField.pattern && !objField.same) return
            const regExp = new RegExp(objField.pattern);
            if (objField.pattern && regExp.test(fieldsValue[objField.name])) {
                if (!errors[objField.name]) return;
                return setErrors(prevProps => ({
                    ...prevProps,
                    [objField.name]: false
                }))
            };
            if (objField.same && fieldsValue[objField.same] === fieldsValue[objField.name]) {
                if (!errors[objField.name]) return;
                return setErrors(prevProps => ({
                    ...prevProps,
                    [objField.name]: false
                }))
            }
            setErrors(prevProps => ({
                ...prevProps,
                [objField.name]: true
            }));
            if (isOk) isOk = false;
        })
        return isOk;
    }

    const handleSubmit = () => {
        if (!validation()) return;
        onSubmit(fieldsValue);
        handleClose();
    }

    const renderFields = () => {
        if (!fields) return;
        return fields.map((field, index) => {
            const error = errors ? errors[field.name] : null;
            const errorMessage = errors && errors[field.name] ? field.errorMessage : null;
            const value = fieldsValue ? fieldsValue[field.name] : ' ';
            const type = field.type ? field.type : 'text';
            if (type === 'select') {
                return (

                    <FormControl key={`${field.name}-${index}`} className={classes.fields}>
                        <InputLabel id={`${field.label}-${index}`} error={errors && errors[field.name]}> {field.label}</InputLabel>
                        <Select
                            label={field.label}
                            value={value}
                            onChange={(e) => handleChangeSelect(field.name, e.target.value)}
                            error={errors && errors[field.name]}
                        >
                            {field.options.map(option => (
                                <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                            ))}

                        </Select>
                        {errors && errors[field.name] ? <FormHelperText error={errors[field.name]}>{field.errorMessage}</FormHelperText> : null}
                    </FormControl>
                )
            }
            return (
                <TextField
                    key={`${field.name}-${index}`}
                    type={type}
                    className={classes.fields}
                    helperText={errorMessage}
                    error={error}
                    label={type === 'date' ? ' ' : field.label}
                    name={field.name}
                    value={fieldsValue ? fieldsValue[field.name] : ''}
                    onChange={handleChange}
                />
            )
        });
    };

    return (
        <>
            <PrimaryButton value={button ? button : 'DODAJ'} variant="outlined" color="primary" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">{title ? title : 'DODAJ'}</DialogTitle>
                <DialogContent className={classes.formGroup}>
                    <FormGroup action="">
                        {renderFields()}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton value='Anuluj' onClick={handleClose} color="primary" />
                    <PrimaryButton value='Dodaj' onClick={handleSubmit} color="primary" />
                </DialogActions>
            </Dialog>
        </>
    );
}