import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { TableCell, TableContainer, TableRow, TableHead, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import DateTimePicker from './../../components/DateTimePicker';
import ButtonLoader from './../../components/ButtonLoader';

const styles = {
    tableContainer: {
        margin: '10px',
    },
    title: {
        fontSize: 26,
        margin: 5
    },
    head: {
        borderRight: '1px solid grey',
        backgroundColor: '#222D32',
        color: '#f3f3f3'
    },
    cell: {
        backgroundColor: 'rgba(197,248,255,.4)'
    }
}

class ComponentToPrint extends React.Component {



    render() {
        return (

            <Grid container justify='center' >
                <Grid component='table' style={styles.tableContainer}>
                    <caption style={styles.title}>Zmiana pierwsza</caption>
                    <TableHead >
                        <TableRow >
                            <TableCell style={styles.head}></TableCell>
                            <TableCell style={styles.head}>Maszyna 1</TableCell>
                            <TableCell style={styles.head}>Maszyna 2</TableCell>
                            <TableCell style={styles.head}>Maszyna 3</TableCell>
                        </TableRow>
                    </TableHead >
                    <tbody>
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                    </tbody>
                </Grid >
                <Grid component='table' style={styles.tableContainer}>
                    <caption style={styles.title}>Zmiana druga</caption>
                    <TableHead >
                        <TableRow >
                            <TableCell style={styles.head}></TableCell>
                            <TableCell style={styles.head}>Maszyna 1</TableCell>
                            <TableCell style={styles.head}>Maszyna 2</TableCell>
                            <TableCell style={styles.head}>Maszyna 3</TableCell>
                        </TableRow>
                    </TableHead >
                    <tbody>
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                    </tbody>
                </Grid >
                <Grid component='table' style={styles.tableContainer}>
                    <caption style={styles.title}>Zmiana trzecia</caption>
                    <TableHead >
                        <TableRow >
                            <TableCell style={styles.head}></TableCell>
                            <TableCell style={styles.head}>Maszyna 1</TableCell>
                            <TableCell style={styles.head}>Maszyna 2</TableCell>
                            <TableCell style={styles.head}>Maszyna 3</TableCell>
                        </TableRow>
                    </TableHead >
                    <tbody>
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>Linia 1</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                        </TableRow >
                    </tbody>
                </Grid >
            </Grid>
        );
    }
}

const useStyles = makeStyles(({
    dateContainer: {
        flexDirection: 'row'
    }
}))
export const ViewGrafikPage = () => {
    const componentRef = useRef();
    const classes = useStyles()
    return (


        <div>
            <Grid container className={classes.dateContainer}>
                <DateTimePicker name='wybierz datę' date={new Date()} className={classes.dateContainer} />
                <ButtonLoader value='Pokaż' />
            </Grid>
            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint ref={componentRef} />
        </div>

    );
};
