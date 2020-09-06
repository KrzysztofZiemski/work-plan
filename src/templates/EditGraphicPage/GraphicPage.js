import React, { useState, useEffect, createContext, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { UserContext } from '../../Contexts';

import NavGraphic from './NavGraphic/NavGraphic';
import WorkPlace from './WorkPlace/WorkPlace';
import Employee from './Employee/Employee';
import DialogMessage from '../../components/DialogMessage';

import { updateWorkPlane, createOrGetWorkPlan } from '../../services/workPlanApi';
import { workPlaceNames, initFreeEmployee, getWorkplanToSend } from './handlers';
import useActiveEmployees from '../../hooks/useActiveEmployees';
import { useDateWeek } from '../../hooks/useDateWeek';

export const WorkPlanContext = createContext({
    setWorkplaceEmployee: null,
    removeEmployee: null,
    workPlan: null,
    submitWorkPlan: null
});

const useStyles = makeStyles(theme => ({
    root: {
        flexWrap: 'nowrap',
        fontSize: 10
    },
    grow: {
        flexGrow: 1
    },
    otherEmployees: {
        width: 240,
        minWidth: 240,
        height: '100%',
        position: 'sticky',
        top: 0,
        maxHeight: '80vh',
        overflow: 'auto'
    },
    otherWorkplace: {
        maxHeight: 300
    },
    shiftsContainer: {
        flexGrow: 1
    },
    shiftOther: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around'
    },
    shiftTitle: {
        backgroundColor: '#222d32',
        color: '#fff'
    },
    lines: {
        display: 'flex',
        flexDirection: 'column',

    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    lineTitle: {
        marginRight: 40,
    },
    workPlaceShift: {
        width: 250,
        height: 80,
        overflow: 'auto'
    },
    workPlace: {
        height: 300
    }
}))
//zmienic wszystkie listy pracownika na hooki i stworzyć hook dla nieaktywnych
const GraphicPage = (props) => {

    const [employees] = useActiveEmployees();
    const { loggedUser } = useContext(UserContext);
    // let [dateStart, setDateStart] = useState('');
    // let [dateEnd, setDateEnd] = useState('');
    let [freeEmployees, setFreeEmployees] = useState([]);
    let [workPlan, setWorkPlan] = useState(false);
    let [isSubmiting, setIsSubmiting] = useState(false);
    let [errorMessage, setErrorMessage] = useState({ message: [], isOpen: false });
    const [date, setDate] = useDateWeek();

    const classes = useStyles();

    useEffect(() => {
        if (!loggedUser) return;
        setIsSubmiting(true)
        createOrGetWorkPlan(date.start, date.end, loggedUser.id)
            .then(wrokPlanResponse => {
                setWorkPlan(wrokPlanResponse);
                setIsSubmiting(false);
                if (employees.fetched) initFreeEmployee(employees.list, wrokPlanResponse, setFreeEmployees)
            })
            .catch(err => {
                setErrorMessage({ message: [`Nie udało się pobrać planu pracy ${err}`], isOpen: true });
                setIsSubmiting(false);
            })

    }, [date, loggedUser, employees.fetched, employees.list]);

    const closeMessage = () => setErrorMessage({ message: '', isOpen: false });

    //przt upuszczaniu pracownika pobieramy parametry workplace i dodajemy obiekt pracownika w odpowiednim miejscu
    const setWorkplaceEmployee = ({ shift, line, workPlace }, employee) => {
        const copyWorkPlan = Object.assign({}, workPlan);
        if (workPlace === workPlaceNames.holidays) {
            copyWorkPlan.holidaysEmployees.push(employee);
        } else if (workPlace === workPlaceNames.absence) {
            copyWorkPlan.absenceEmployees.push(employee);
        } else if (workPlace === workPlaceNames.free) {
            //for duplicats
            const copyNoWorkplaneEmployee = freeEmployees.filter(activeEmployee => activeEmployee.id !== employee.id);
            copyNoWorkplaneEmployee.push(employee);
            setFreeEmployees(copyNoWorkplaneEmployee);
        } else if (workPlace === workPlaceNames.leader || workPlace === workPlaceNames.other || workPlace === workPlaceNames.supervision || workPlace === workPlaceNames.unskilled) {
            copyWorkPlan.workShifts[shift][workPlace].push(employee);
        }
        else {
            copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.push(employee);
        }
        setWorkPlan(copyWorkPlan);
    }
    //przy upuszczaniu usuwamy pracownika z jego aktualnej pozycji i zwracamy obiekt pracownika do późniejszego umieszczenia w nowym miejscu
    const removeEmployee = ({ shift, line, workPlace }, id) => {
        const copyWorkPlan = Object.assign({}, workPlan);
        //for noWorking
        if (workPlace === workPlaceNames.holidays) {
            const employeeIndex = copyWorkPlan.holidaysEmployees.findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.holidaysEmployees.splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        } else if (workPlace === workPlaceNames.absence) {
            const employeeIndex = copyWorkPlan.absenceEmployees.findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.absenceEmployees.splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        } else if (workPlace === workPlaceNames.free) {
            const copyNoWorkplaneEmployee = [...freeEmployees];
            const employeeIndex = copyNoWorkplaneEmployee.findIndex(employee => employee.id === id);
            const removerEmployee = copyNoWorkplaneEmployee.splice(employeeIndex, 1);

            setFreeEmployees(copyNoWorkplaneEmployee);
            return removerEmployee[0];
        }
        //for specific workers
        else if (workPlace === workPlaceNames.leader || workPlace === workPlaceNames.other || workPlace === workPlaceNames.supervision || workPlace === workPlaceNames.unskilled) {

            const employeeIndex = copyWorkPlan.workShifts[shift][workPlace].findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.workShifts[shift][workPlace].splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        }
        //for workplaces
        else {
            const employeeIndex = copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.findIndex(empoyee => empoyee.id === id);
            const removerEmployee = copyWorkPlan.workShifts[shift].lines[line].workplaces[workPlace].employeeListWorkplaces.splice(employeeIndex, 1);

            setWorkPlan(copyWorkPlan);
            return removerEmployee[0];
        }
    }

    //zapisujemy plan
    const submitWorkPlan = () => {
        const preparationWorkPlan = getWorkplanToSend(workPlan);
        setIsSubmiting(true);
        updateWorkPlane(1, preparationWorkPlan)
            .then(res => setIsSubmiting(false))
            .catch(err => {
                setIsSubmiting(false);
                alert(`nie udało się zapisać planu - ${err}`);
            })
    }

    return (
        <section className={props.className}>
            <DialogMessage open={errorMessage.isOpen} close={closeMessage} messages={errorMessage.message} />
            <DndProvider backend={Backend}>
                <section className={`${props.className} graphicPage`}>
                    <WorkPlanContext.Provider value={{ setWorkplaceEmployee, removeEmployee, workPlan, submitWorkPlan }}>
                        <NavGraphic className='GraphicNav' dateStart={date.start} dateEnd={date.end} setDate={setDate}></NavGraphic>

                        <Grid container className={classes.root} >
                            <Grid item className={classes.shiftsContainer} >
                                {workPlan ? workPlan.workShifts.map((shift, indexShift) => (
                                    <Grid item key={`shift${indexShift}`} >
                                        <Typography align='center' variant='button' >
                                            <Grid component='h2' className={classes.shiftTitle}>
                                                {`Zmiana ${shift.shiftNumber}`}
                                            </Grid>
                                        </Typography>
                                        <Grid className={classes.shiftOther} >
                                            <Grid className={classes.workPlaceShift}>
                                                <WorkPlace key={`supervision${indexShift}`} shift={indexShift} workPlace={workPlaceNames.supervision} title='Supervisior'>
                                                    {workPlan.workShifts[indexShift][workPlaceNames.supervision].map(employee => {
                                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.supervision} label={`${employee.name} ${employee.lastName}`}>
                                                        </Employee>
                                                    })}
                                                </WorkPlace>
                                            </Grid>
                                            <Grid className={classes.workPlaceShift}>
                                                <WorkPlace key={`unskilled${indexShift}`} shift={indexShift} workPlace={workPlaceNames.unskilled} title='Unskilled'>
                                                    {workPlan.workShifts[indexShift][workPlaceNames.unskilled].map(employee => {
                                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.unskilled} label={`${employee.name} ${employee.lastName}`}>

                                                        </Employee>
                                                    })}
                                                </WorkPlace>
                                            </Grid>
                                            <Grid className={classes.workPlaceShift}>
                                                <WorkPlace key={`leader${indexShift}`} shift={indexShift} workPlace={workPlaceNames.leader} title='Lider zmiany'>
                                                    {workPlan.workShifts[indexShift][workPlaceNames.leader].map(employee => {
                                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.leader} label={`${employee.name} ${employee.lastName}`}>
                                                        </Employee>
                                                    })}
                                                </WorkPlace>
                                            </Grid>
                                            <Grid className={classes.workPlaceShift}>
                                                <WorkPlace key={`other${indexShift}`} shift={indexShift} workPlace={workPlaceNames.other} title='Inni'>
                                                    {workPlan.workShifts[indexShift][workPlaceNames.other].map(employee => {
                                                        return <Employee key={`employee${employee.id}`} id={employee.id} shift={indexShift} workPlace={workPlaceNames.other} label={`${employee.name} ${employee.lastName}`}>
                                                        </Employee>
                                                    })}
                                                </WorkPlace>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.lines}>
                                            {workPlan.workShifts[indexShift].lines.map((line, indexLine) => (

                                                <Grid constainer={true} key={`line${indexLine}`} className={classes.line}>
                                                    <Grid item component='h3' className={classes.lineTitle}>{`Linia ${line.lineNumber}`}</Grid>

                                                    {workPlan.workShifts[indexShift].lines[indexLine].workplaces.map((workplace, indexWorkplace, workplacesArr) => {
                                                        return <Grid className={classes.workPlaceShift} key={`workplace${indexWorkplace}`}>
                                                            <WorkPlace className={classes.workPlace} shift={indexShift} line={indexLine} workPlace={indexWorkplace} title={workplace.nameWorkplace}>
                                                                {workPlan.workShifts[indexShift].lines[indexLine].workplaces[indexWorkplace].employeeListWorkplaces.map(employee => (
                                                                    <Employee key={`employee${employee.id}`} id={employee.id} line={indexLine} shift={indexShift} workPlace={indexWorkplace} label={`${employee.name} ${employee.lastName}`}>
                                                                    </Employee>
                                                                ))}

                                                            </WorkPlace>
                                                        </Grid>
                                                    })}

                                                </Grid>

                                            )
                                            )}
                                        </Grid>
                                    </Grid>
                                )) : null}
                            </Grid>
                            <Grid item className={classes.otherEmployees}>
                                <WorkPlace shift={null} line={null} workPlace={workPlaceNames.free} title='Nieprzydzieleni pracownicy'>
                                    {freeEmployees.map(employee => (
                                        <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={workPlaceNames.free}
                                            label={`${employee.name} ${employee.lastName}`} >
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    ))}

                                </WorkPlace>
                                <WorkPlace shift={null} line={null} workPlace={workPlaceNames.holidays} title='Urlopy'>
                                    {workPlan ? workPlan.holidaysEmployees.map(employee => (
                                        <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={workPlaceNames.holidays} label={`${employee.name} ${employee.lastName}`}>
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    )) : null}
                                </WorkPlace>
                                <WorkPlace shift={null} line={null} workPlace={workPlaceNames.absence} title='Niedostępni'>

                                    {workPlan ? workPlan.absenceEmployees.map(employee => (
                                        <Employee key={`employee${employee.id}`} id={employee.id} line={null} shift={null} workPlace={workPlaceNames.absence} label={`${employee.name} ${employee.lastName}`}>
                                            <span>{`${employee.name} ${employee.lastName}`}</span>
                                        </Employee>
                                    )) : null}
                                </WorkPlace>
                            </Grid>
                        </Grid>
                    </WorkPlanContext.Provider>

                </section >
            </DndProvider>
        </section>
    )
}

export default GraphicPage;
