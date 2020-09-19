import React from 'react';
import ListItemText from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../utils/ItemTypes';

const useStyles = makeStyles(() => ({
    root: {
        width: '90%',
        padding: 4,
        margin: 1,
        justifyContent: 'flex-start',
        cursor: 'grab',
        fontSize: 12,
        height: 20,
        textTransform: 'capitalize ',
        textAlign: 'center',
    },
    rootRow: {
        padding: 4,
        margin: 1,
        justifyContent: 'flex-start',
        cursor: 'grab',
        fontSize: 12,
        height: 20,
        textTransform: 'capitalize ',
        minWidth: 180,
        textAlign: 'center',
    },
    dragging: {
        opacity: '.2'
    }
}))

const Employee = ({ id, line, shift, workPlace, children, label, row }) => {

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
    const setClass = () => {
        let selectClasses = []
        if (isDragging) selectClasses.push(classes.dragging);
        if (row) {
            selectClasses.push(classes.rootRow);
        } else {
            selectClasses.push(classes.root);
        };
        return selectClasses.join(' ')
    }
    return (

        <ListItemText
            ref={drag}
            className={setClass()}
            icon={<FaceIcon />}
        >
            {label}
        </ListItemText >

    )
}

export default Employee;