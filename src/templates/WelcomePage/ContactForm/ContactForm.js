import React, { useState } from 'react';
import { Dialog, DialogTitle, TextField, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ButtonLoader from '../../../components/ButtonLoader';
import DialogMessage from '../../../components/DialogMessage';
import { sendMessage } from '../../../services/contactApi';

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
        alignSelf: 'flex-end',
    },
    buttonSend: {
        margin: 5
    }
}))

export const ContactForm = ({ setClose, open }) => {
    const classes = useStyles();
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);
    const [isSubmitting, setSubmiting] = useState(false);
    const [isOpenErrorMessage, setIsOpenErrorMessage] = useState(false);
    const errorSubmitMessage = ['Wystapił problem w wysłaniu wiadomości'];

    const handleCloseMessage = () => setIsOpenErrorMessage(false)
    const handleSendMessage = (e) => {
        e.preventDefault();
        const isError = validate();
        if (isError) return;
        const { firstName, message, title, mail } = form;
        setSubmiting(true)
        sendMessage(firstName, mail, title, message)
            .then(resp => {
                setIsSubmited(true);
                setSubmiting(false);
            })
            .catch(resp => {
                setSubmiting(false);
                setIsOpenErrorMessage(true);
            })
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
        if (form.message) {
            setErrors(state => ({ ...state, message: false }));
        } else {
            setErrors(state => ({ ...state, message: true }));
            error = true
        };
        if (form.title) {
            setErrors(state => ({ ...state, title: false }));
        } else {
            setErrors(state => ({ ...state, title: true }));
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
            <DialogMessage open={isOpenErrorMessage} close={handleCloseMessage} messages={errorSubmitMessage}></DialogMessage>
            <Dialog onClose={setClose} open={open} fullWidth>
                {isSubmited ?
                    <div className={classes.message}>
                        <p>Dziekujemy za wiadomość.</p>
                        <p>Skontaktujemy się tak szybko jak to możliwe.</p>
                        <ButtonLoader onClick={setClose} className={classes.button}>zamknij</ButtonLoader>
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
                                label="Tytuł wiadomości"
                                variant="outlined"
                                className={classes.input}
                                name='title'
                                onChange={handleChange}
                                value={form['title']}
                                error={errors['title']}
                                helperText={errors['title'] ? 'wpisz tytuł wysyłanej wiadomości' : ''} />
                            <TextField
                                multiline
                                rows={8}
                                label="Opis"
                                variant="outlined"
                                className={classes.input}
                                name='message'
                                type='textarea'
                                onChange={handleChange}
                                value={form['message']}
                                error={errors['message']}
                                helperText={errors['message'] ? 'napisz coś do nas' : ''} />
                            <ButtonLoader isSubmitting={isSubmitting} className={classes.buttonSend} onClick={handleSendMessage} value='wyślij' fullWidth={false} />
                        </FormGroup>
                    </>
                }
            </Dialog>
        </div>
    );
};
