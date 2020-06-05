import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const DialogMessage = ({ message, isAccept }) => {
    const [open, setOpen] = React.useState(true);


    const handleClick = (result) => {
        isAccept(result);
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClick}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClick(false)} color="primary">
                        Zrezygnuj
            </Button>
                    <Button onClick={() => handleClick(true)} color="primary" autoFocus>
                        Zaakceptuj
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}