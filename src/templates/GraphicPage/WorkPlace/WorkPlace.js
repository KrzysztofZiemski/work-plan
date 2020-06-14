import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../../utils/ItemTypes';
import { WorkPlanContext } from '../GraphicPage';


const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 54,
        minWidth: 200,
        margin: '3px 20px',
        textAlign: 'center',
        overflow: 'auto',
        backgroundColor: '#aaa',
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    title: {
        backgroundColor: '#3c8dbc',
        padding: 4,
        marginTop: 0,
        width: '100%'
    }
}))
const WorkPlace = ({ line, shift, workPlace, children, title }) => {

    const { setWorkplaceEmployee, removeEmployee, dragable } = useContext(WorkPlanContext);

    const classes = useStyles()

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.EMPLOYEE,
        drop: (item, mointor) => {
            if (!dragable) return;
            const deletedItem = removeEmployee({ shift: item.shift, line: item.line, workPlace: item.workPlace }, item.id);
            setWorkplaceEmployee({ shift, line, workPlace }, deletedItem)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    })

    return (
        <List
            className={classes.card}
            ref={dragable ? drop : null}
            content
        >
            <Paper elevation={3} className={classes.title}>
                {title}
            </Paper >
            {children}
        </List  >
    )
}

export default WorkPlace;