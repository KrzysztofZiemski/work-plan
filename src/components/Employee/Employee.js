import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/ItemTypes';
import './Employee.scss';

const useStyles = makeStyles(() => ({
    root: {
        width: '90%',
        padding: 10,
        margin: 5,
        justifyContent: 'flex-start',
        cursor: 'grab'
    },
    dragging: {
        opacity: '.2'
    }
}))

const Employee = ({ id, line, shift, workPlace, children, label }) => {

    const classes = useStyles()

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ItemTypes.EMPLOYEE,
            id, line, shift, workPlace
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <Chip
            ref={drag}
            className={isDragging ? `${classes.root} ${classes.dragging}` : classes.root}
            icon={<FaceIcon />} label={label}
        />
    )
}

export default Employee;