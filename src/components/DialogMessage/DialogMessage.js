import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        padding: '10px 50px'
    },
    message: {
        padding: '10px 50px',
        margin: '0 auto'
    }
}))

export const DialogMessage = ({ open, close, messages }) => {
    const classes = useStyles()
    return (
        <div>
            <Dialog
                open={open}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {
                    messages ? messages.map((text, index) => {
                        if (index === 0) return <DialogTitle key={`dialog${index}`} id="alert-dialog-title" className={classes.title}>{text}</DialogTitle>
                        return (<DialogContent key={`dialogContent${index}`} className={classes.message}>
                            <DialogContentText
                                id="alert-dialog-description">
                                {text}
                            </DialogContentText>
                        </DialogContent>
                        )
                    }) :
                        null
                }
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Ok
          </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}