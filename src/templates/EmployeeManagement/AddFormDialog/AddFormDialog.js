import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../../../components/PrimaryButton';

const useStyles = makeStyles(() => ({
    inputs: {
        margin: 20,
        minWidth: 400
    }
}))

export const AddFormDialog = ({ onSubmit }) => {
    let [open, setOpen] = useState(false);
    let [name, setName] = useState('');
    let [lastName, setLastName] = useState('');
    let [errors, setErrors] = useState({
        name: false,
        lastName: false
    });
    let [description, setDescription] = useState('');
    const classes = useStyles();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        if (name.length < 3 || lastName.length < 3) {
            let errors = {}
            name.length < 3 ? errors = { ...errors, name: true } : errors = { ...errors, name: false };
            lastName.length < 3 ? errors = { ...errors, lastName: true } : errors = { ...errors, lastName: false };
            setErrors(errors)
            return;
        }
        const data = { name, lastName, description };
        setLastName('');
        setName('');
        onSubmit(data);
    }
    return (
        <>
            <PrimaryButton value='Dodaj Pracownika' variant="outlined" color="primary" onClick={handleClickOpen} />
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
            </Dialog>
        </>
    );
}