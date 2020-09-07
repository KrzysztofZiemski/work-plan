import React, { useState, useEffect } from 'react';
import { Paper, Typography, Grid, TextField, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ButtonLoader from './../ButtonLoader';
// const styles = makeStyles(({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%'
//     },
//     dataContainer: {
//         display: 'flex',
//         flexGrow: 1,
//         height: '100%',
//     },
//     about: {
//         display: 'flex',
//         minWidth: 380,
//         borderRadius: 20,
//         margin: '0px 40px 00px 0px',
//         backgroundColor: 'rgba(60,141,188,.1)',
//         boxShadow: 'inset 39px 0px 78px -28px rgba(60,141,188,0.74)'
//     },
//     about__titles: {
//         padding: '0 40px 0 30px',
//         minWidth: 170,
//         position: 'relative',
//         overflow: 'hidden',
//         '& *': {
//             margin: 20
//         }
//     },
//     about__separator: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         width: 2,
//         height: '100%',
//         backgroundColor: '#5485a2'
//     },
//     about__values: {
//         height: '100%',
//         flexGrow: 1,
//         padding: '0 0px 0 0px',
//         '& *': {
//             margin: 20
//         },
//     },
//     button: {
//         height: 40,
//         marginBottom: 5,
//         marginRight: 17,
//         alignSelf: 'flex-end'
//     },
//     inputField: {
//         width: 'auto'
//     }
// }))

// export const HeaderDetails = ({ content, className }) => {

//     const [editable, setEditable] = useState(false);

//     const classes = styles();
//     console.log()
//     if (!content) return null;
//     const renderDetails = () => {
//         const titles = [];
//         const values = [];
//         content.forEach((element, index) => {
//             titles.push(<Typography key={`${element.name}${index}`} component={'p'}>{element.name}</Typography>)
//             if (editable) {
//                 console.log('weszłooooo')
//                 values.push(<TextField className={classes.inputField} key={`${element.value}${index}`} component={element.type ? element.type : 'p'}>{element.value}</TextField>)
//             } else {
//                 values.push(<Typography key={`${element.value}${index}`} component={element.type ? element.type : 'p'}>{element.value}</Typography>)
//             }

//         })

//         const handleSetEditable = () => setEditable(true)

//         return (
//             <Grid className={className ? className : classes.root}>
//                 <Grid className={classes.dataContainer}>
//                     <Grid className={classes.about__titles}>
//                         {titles}
//                         <span className={classes.about__separator}></span>
//                     </Grid>
//                     <Grid className={classes.about__values}>
//                         {values}
//                     </Grid>

//                 </Grid>
//                 <ButtonLoader value='edytuj' className={classes.button} fullWidth={false} onClick={handleSetEditable} />
//             </Grid >
//         )
//     }

//     return (
//         <Paper className={classes.about}>
//             {renderDetails()}
//         </Paper>
//     );
// };


const styles = makeStyles(({
    paper: {
        display: 'flex',
        minWidth: 380,
        borderRadius: 20,
        backgroundColor: 'rgba(60,141,188,.1)',
        boxShadow: 'inset 39px 0px 78px -28px rgba(60,141,188,0.74)'
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    dataContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    button: {
        height: 40,
        marginBottom: 5,
        marginRight: 17,
        alignSelf: 'flex-end'
    },
    input: {
        backgroundColor: 'inherit',
        border: '1px solid grey',
        margin: 1,
        padding: 4,
        paddingLeft: 16,
        borderRadius: 5,
        '&:hover': {
            border: '2px solid grey',
            margin: 0,
        },
        '&:focus': {
            border: '2px solid #3C8DBC',
            margin: 0,
        },

    }
}))

export const HeaderDetails = ({ content, className, onSubmit, isSubmiting }) => {

    const [editable, setEditable] = useState(false);
    const [form, setForm] = useState({});

    const classes = styles();

    useEffect(() => {
        content.forEach(item => setForm(prevState => ({
            ...prevState,
            [item.name]: item.value
        })))
    }, [content]);

    if (!content) return null;
    const handleToggleEditable = () => setEditable(prevState => !prevState)
    const handleUpdate = () => {
        onSubmit(form);
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Paper className={classes.paper}>
            <Grid className={className ? className : classes.root}>
                <Grid className={classes.dataContainer}>
                    <Table>
                        <TableBody>
                            {content.map(element => {
                                console.log(element)
                                return (
                                    <TableRow key={element.name} className={classes.row}>
                                        <TableCell>{element.label}</TableCell >
                                        <TableCell name={element.name}>
                                            {editable ? <input className={classes.input} name={element.name} onChange={handleChange} value={form[element.name]}></input> : element.value}
                                        </TableCell >
                                    </TableRow >
                                )
                            })}
                        </TableBody>
                    </Table >
                </Grid>
                <ButtonLoader value={editable ? 'zapisz' : 'edytuj'} className={classes.button} fullWidth={false} onClick={editable ? handleUpdate : handleToggleEditable} isSubmiting={isSubmiting} />
            </Grid >
        </Paper>
    )
};
