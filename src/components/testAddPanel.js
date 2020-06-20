import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
// import PrimaryButton from '../../../components/PrimaryButton';

const useStyles = makeStyles(() => ({
    inputs: {
        margin: 20,
        minWidth: 400
    }
}))


export const AddFormDialogTest = ({ onSubmit, fields, button }) => {

    let [fieldsValue, setFieldsValue] = useState(null);
    let [open, setOpen] = useState(false);
    let [errors, setErrors] = useState();
    let [description, setDescription] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const fieldsState = {};
        fields.forEach(field => {
            fieldsState[field.name] = ''
        })
        setFieldsValue(fieldsState);
    }, [])

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
    const handleSubmit = () => {

    }
    const renderFields = () => {
        if (!fields) return;
        return fields.map(field => {
            //TODO handle errors
            return (
                // <TextField label={field.name} value={fields[field.name] ? fields[field.name] : ''} error={false} />
                <TextField label={field.name} name={field.name} value={fieldsValue ? fieldsValue[field.name] : ''} onChange={handleChange} />
            )
        })
    }
    return (
        <>
            <div>{renderFields()}</div>
            {/* <PrimaryButton value='Dodaj Pracownika' variant="outlined" color="primary" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick >
                <DialogTitle id="form-dialog-title">Dodaj Pracownika</DialogTitle>
                <DialogContent>
                    <FormGroup action="">
                        <TextField id="employeeName" label="Imię" className={classes.inputs} value={name} onChange={(e) => setName(e.target.value)} helperText="Pole obowiązkowe" error={errors.name} />
                        <TextField id="employeeLastName" label="Nazwisko" className={classes.inputs} value={lastName} onChange={(e) => setLastName(e.target.value)} helperText="Pole obowiązkowe" error={errors.lastName} />
                        <TextField id="employeeDescription" label="Opis" className={classes.inputs} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <PrimaryButton value='Anuluj' onClick={handleClose} color="primary" />
                    <PrimaryButton value='Dodaj' onClick={handleSubmit} color="primary" />
                </DialogActions>
            </Dialog> */}
        </>
    );
}