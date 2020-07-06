import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const DialogMessage = ({ open, close, messages }) => {

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
                        if (index === 0) return <DialogTitle key={`dialog${index}`} id="alert-dialog-title">{text}</DialogTitle>
                        return (<DialogContent key={`dialogContent${index}`}>
                            <DialogContentText id="alert-dialog-description">
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