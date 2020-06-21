import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../PrimaryButton';

//simple text form as a popup.
//the component always return button to open dialog form
//default value text button is 'DODAJ', to set other value set props butto='string'
//require OnSubmit - function
//require props fields as array with property name.
// other fields property:
//type - actually works for string, textarea,date
//label - string
//errorMessage - string, shows after validation(to validadion require pattern)
//pattern - string regexp to validate field
//example:
// fields: [
//     {
//         name: 'name',
//         type: 'text',
//         label: 'imie',
//         pattern: '.{3,10}',
//         errorMessage: 'Imię musi zawierać od 3 do 10 znaków'
//     },
//     {
//         name: 'lastName',
//         label: 'nazwisko',
//         type: 'text',
//         pattern: '.{3,10}',
//         errorMessage: 'Nazwisko musi zawierać od 3 do 10 znaków'
//     },
//     {
//         name: 'desc',
//         label: 'opis',
//         type: 'text',
//         errorMessage: ''
//     },
// ];
//button='dodaj osobę'
//onSubmit = ()=>console.log('wejszło)

const useStyles = makeStyles(() => ({
    formGroup: {
        margin: '10px 50px 40px',
        minWidth: 400,
    },
    fields: {
        margin: 10
    }
}))
export const AddFormDialog = ({ onSubmit, fields, button }) => {

    let [fieldsValue, setFieldsValue] = useState(null);
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
    const handleClose = () => {
        setOpen(false);
    };
    const validation = () => {
        let isOk = true;
        fields.forEach(objField => {
            if (!objField.pattern) return;
            const regExp = new RegExp(objField.pattern);

            if (regExp.test(fieldsValue[objField.name])) {
                if (!errors[objField.name]) return;
                return setErrors(prevProps => ({
                    ...prevProps,
                    [objField.name]: false
                }))
            };
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
        return fields.map(field => {
            const error = errors ? errors[field.name] : null;
            const errorMessage = errors && errors[field.name] ? field.errorMessage : null;
            const value = fieldsValue ? fieldsValue[field.name] : ' ';
            const type = field.type ? field.type : 'text';
            return (
                <TextField
                    type={type}
                    className={classes.fields}
                    helperText={errorMessage}
                    error={error}
                    label={type === 'date' ? ' ' : field.label}
                    name={field.name}
                    value={value}
                    onChange={handleChange}
                />
            )
        });
    };

    return (
        <>
            <PrimaryButton value={button ? button : 'DODAJ'} variant="outlined" color="primary" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
                <DialogTitle id="form-dialog-title">Dodaj Pracownika</DialogTitle>
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