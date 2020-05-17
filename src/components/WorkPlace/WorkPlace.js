import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';
import { WorkPlanContext } from '../../templates/GraphicPage/GraphicPage';
import './WorkPlace.scss';

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 70,
        minWidth: 200,
        margin: '3px 20px',
        textAlign: 'center',
        overflow: 'auto'
    },
    title: {
        backgroundColor: '#3c8dbc',
        padding: 4,
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
        <Card
            className={classes.card}
            ref={dragable ? drop : null}
            content
        >
            <Paper elevation={3} className={classes.title}>
                {title}
            </Paper >
            {children}
        </Card >
    )
}

export default WorkPlace;