import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../utils/ItemTypes';
import { WorkPlanContext } from '../GraphicPage';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 200,
    },
    card: {
        width: '100%',
        margin: 0,
        textAlign: 'center',
        overflow: 'auto',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 57,
        minWidth: 100,
        backgroundColor: '#ebecf0',
        borderBottom: '5px solid #999',
        borderLeft: '2px solid #999',
        borderRight: '2px solid #999',
    },
    cardRow: {
        display: 'flex',
        flexWrap: 'wrap',
        minHeight: 57,
        margin: 0,
        overflow: 'auto',
        backgroundColor: '#ebecf0',
        paddingTop: 0,
        minWidth: 100,
        alignItems: 'center',
        padding: 4
    },
    title: {
        backgroundColor: '#6376AE',
        padding: 2,
        marginTop: 0,
        width: '100%',
        fontSize: 12,
        textAlign: 'center',
    },
    isOver: {
        backgroundColor: 'black'
    }
}))
const WorkPlace = ({ line, shift, workPlace, children, title, className, row, color }) => {

    const { setWorkplaceEmployee, removeEmployee } = useContext(WorkPlanContext);

    const classes = useStyles()

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.EMPLOYEE,
        drop: (item, mointor) => {
            const deletedItem = removeEmployee({ shift: item.shift, line: item.line, workPlace: item.workPlace }, item.id);
            setWorkplaceEmployee({ shift, line, workPlace }, deletedItem)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    })

    return (
        <Grid className={className || classes.root}>
            <Paper className={classes.title}>
                {title}
            </Paper >
            <List
                className={row ? classes.cardRow : classes.card}
                style={{ backgroundColor: color }}
                ref={drop}
                content
            >
                {children}
            </List  >
        </Grid>
    )
}

export default WorkPlace;