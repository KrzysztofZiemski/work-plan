import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryButton from '../../../components/PrimaryButton';

const useStyles = makeStyles(() => ({
    title: {
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '',

    },
    input: {
        margin: 5
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        margin: '5%',
        fontSize: '1.2em',
        '&>*': {
            margin: 20
        }
    },
    button: {
        alignSelf: 'flex-end'
    },
}))

export const ContactForm = ({ setClose, open }) => {
    const classes = useStyles();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);


    const handleSendMessage = (e) => {
        e.preventDefault();
        const isError = validate();
        if (isError) return;
        setIsSubmited(true);
    };

    const validate = () => {
        let error = false;
        const regExpMail = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}');

        if (form.firstName) {
            setErrors(state => ({ ...state, firstName: false }));
        } else {
            setErrors(state => ({ ...state, firstName: true }));
            error = true
        };
        if (form.description) {
            setErrors(state => ({ ...state, description: false }));
        } else {
            setErrors(state => ({ ...state, description: true }));
            error = true
        };
        if (regExpMail.test(form.mail)) {
            setErrors(state => ({ ...state, mail: false }));
        } else {
            setErrors(state => ({ ...state, mail: true }));
            error = true
        };

        return error;
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }))
    };


    return (
        <div>
            <Dialog onClose={setClose} open={open} fullWidth>
                {isSubmited ?
                    <div className={classes.message}>
                        <p>Dziekujemy za wiadomość</p>
                        <p>Skontaktujemy się tak szybko jak to możliwe</p>
                        <PrimaryButton onClick={setClose} className={classes.button}>zamknij</PrimaryButton>
                    </div>
                    :
                    <>
                        <DialogTitle className={classes.title}>Napisz do nas!</DialogTitle>
                        <FormGroup className={classes.form}>
                            <TextField
                                multiline
                                label="Imie"
                                variant="outlined"
                                className={classes.input}
                                name='firstName'
                                onChange={handleChange}
                                value={form['firstName']}
                                error={errors['firstName']}
                                helperText={errors['firstName'] ? 'podaj imie osoby, z którą możemy się kontaktować' : ''} />
                            <TextField
                                multiline
                                label="Adres e-mail"
                                variant="outlined"
                                className={classes.input}
                                name='mail'
                                onChange={handleChange}
                                value={form['mail']}
                                error={errors['mail']}
                                helperText={errors['mail'] ? 'podaj adres mailowy do kontaktu z Tobą' : ''} />
                            <TextField
                                multiline
                                rows={8}
                                label="Opis"
                                variant="outlined"
                                className={classes.input}
                                name='description'
                                type='textarea'
                                onChange={handleChange}
                                value={form['description']}
                                error={errors['description']}
                                helperText={errors['description'] ? 'napisz coś do nas' : ''} />
                            <PrimaryButton onClick={handleSendMessage} >wyślij</PrimaryButton>
                        </FormGroup>
                    </>
                }
            </Dialog>
        </div>
    );
};
