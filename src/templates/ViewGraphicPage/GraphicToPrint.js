import React from 'react';
import { TableCell, TableRow, TableHead, Grid } from '@material-ui/core';

const styles = {
    container: {
        margin: 10
    },
    containerTables: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        margin: '15px'
    },

    table: {
        margin: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#85acbd',
        color: '#222D32',
        border: '2px solid #222D32',
        padding: 4
    },
    head: {
        fontSize: 13,
        borderRight: '1px solid grey',
        backgroundColor: '#222D32',
        color: '#f3f3f3',
        padding: 4
    },
    cell: {
        backgroundColor: 'rgba(197,248,255,.4)',
        fontSize: 12,
        padding: 4,
        width: 100
    },
    cellsOther: {
        backgroundColor: '#85acbd',
        fontSize: 12,
        padding: 3
    },
}
const renderWorkersCells = (workplacesArr) => workplacesArr.map(({ employeeListWorkplaces }) => (
    <TableCell style={styles.cell}>{employeeListWorkplaces.map(employee => ` ${employee.name} ${employee.lastName} `).toString()}</TableCell>
));

export class GraphicToPrint extends React.Component {
    renderTables(shift) {
        return (
            <Grid style={styles.containerTables} container>
                <Grid component='table'>
                    <TableHead >
                        <TableRow style={styles.title}>
                            <TableCell style={styles.title}>{`Zmiana ${shift.shiftNumber}`}</TableCell>
                            <TableCell style={styles.head}>Maszyna 1</TableCell>
                            <TableCell style={styles.head}>Maszyna 2</TableCell>
                            <TableCell style={styles.head}>Maszyna 3</TableCell>
                        </TableRow>
                    </TableHead >
                    <tbody>
                        <TableRow >
                            <TableCell style={styles.head}>{`Linia ${shift.lines[0].lineNumber}`}</TableCell>
                            {renderWorkersCells(shift.lines[0].workplaces)}
                            {/* <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliskam, Bernardetta Śliska</TableCell> */}
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>{`Linia ${shift.lines[1].lineNumber}`}</TableCell>
                            {renderWorkersCells(shift.lines[2].workplaces)}
                            {/* <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska , Bernardetta Śliska</TableCell> */}
                        </TableRow >
                        <TableRow >
                            <TableCell style={styles.head}>{`Linia ${shift.lines[2].lineNumber}`}</TableCell>
                            {renderWorkersCells(shift.lines[2].workplaces)}
                            {/* <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell>
                            <TableCell style={styles.cell}>Staś kowalski, Bernardetta Śliska</TableCell> */}
                        </TableRow >
                    </tbody>
                </Grid >
                <Grid component='table' >
                    <TableHead >
                        <TableRow >
                            <TableCell style={styles.cellsOther}>Lider Zmiany</TableCell>
                            <TableCell style={styles.cellsOther}>Supervision</TableCell>
                            <TableCell style={styles.cellsOther}>unskilledWorker</TableCell>
                            <TableCell style={styles.cellsOther}>Inni</TableCell>
                            <TableCell style={styles.cellsOther}>Informacje</TableCell>
                        </TableRow>
                    </TableHead >
                    <tbody>
                        <TableRow >
                            <TableCell style={styles.head}>{shift.shiftsLeader.map(employee => `${employee.name} ${employee.lastName}`)}</TableCell>
                            <TableCell style={styles.head}>{shift.supervision.map(employee => `${employee.name} ${employee.lastName}`)}</TableCell>
                            <TableCell style={styles.head}>{shift.unskilledWorker.map(employee => `${employee.name} ${employee.lastName}`)}</TableCell>
                            <TableCell style={styles.head}>{shift.other.map(employee => `${employee.name} ${employee.lastName}`)}</TableCell>
                            <TableCell style={styles.head}>{shift.comments}</TableCell>
                        </TableRow>
                    </tbody>
                </Grid>
            </Grid>
        )
    }

    render() {
        const shifts = this.props.data ? this.props.data.workShifts : null;

        return shifts ? (
            <Grid container justify='center' style={styles.container}>
                {this.renderTables(shifts[0])}
                {this.renderTables(shifts[1])}
                {this.renderTables(shifts[2])}
            </Grid>
        ) :
            null;
    }
}
