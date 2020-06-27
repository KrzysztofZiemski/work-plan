import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PrimaryButton from '../../components/PrimaryButton';
import LineService from '../../services/LineService';
import ProductService from '../../services/ProductService';
import { getAllEmployee } from '../../services/employeesRequest';
import ProductionReportService from '../../services/ProductionReportService';


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 'auto',
        padding: 20,
        borderBottom: '4px solid #222d32',
        maxHeight: '70vh',
        overflow: 'auto'
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 200,
    },
    formControl: {
        margin: 10,
        minWidth: 200,
    },
    textarea: {
        margin: 10,
    },
    quantityProducedField: {
        margin: 10,
    }
}));

const today = () => {
    const today = new Date();
    const month = today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    return `${today.getFullYear()}-${month}-${today.getDate()}T${hours}:${minutes}`;


}

export const AddReportForm = ({ setOpenMessage, setMessages }) => {

    let [formData, setFormData] = useState({
        productionStart: today(),
        productionEnd: today(),
        lineId: '',
        productionHours: 0,
        productionMinutes: 0,
        productId: '',
        series: '',
        speedMachinePerCycle: '',
        firstWorkplaceIdEmployee: '',
        secondWorkplaceIdEmployee: '',
        thirdWorkplaceIdEmployee: '',
        description: '',
        totalQuantityProduced: ''
    });
    let [errors, setErrors] = useState({
        productionStart: false,
        productionEnd: false,
        lineId: false,
        productionHours: true,
        productionMinutes: true,
        productId: false,
        series: false,
        speedMachinePerCycle: false,
        firstWorkplaceIdEmployee: false,
        secondWorkplaceIdEmployee: false,
        thirdWorkplaceIdEmployee: false,
        totalQuantityProduced: false
    });
    let patterns = {
        lineId: '.{1,20}',
        productId: '.{1,20}',
        series: '.{1,20}',
        speedMachinePerCycle: `^[1-9][0-9]*$`,
        firstWorkplaceIdEmployee: '.{1,20}',
        secondWorkplaceIdEmployee: '.{1,20}',
        thirdWorkplaceIdEmployee: '.{1,20}',
        totalQuantityProduced: '.{1,20}'
    }
    let [lines, setLines] = useState([]);
    let [products, setProducts] = useState([]);
    let [employees, setEmployees] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        (async () => {
            const linesPromise = LineService.getAllLines()
                .then(data => setLines(data))
            const productsPromise = ProductService.getAllProducts()
                .then(data => setProducts(data))
            const employeePromise = getAllEmployee()
                .then(data => setEmployees(data))
            Promise.all([linesPromise, productsPromise, employeePromise])
                .catch(err => {
                    setMessages(['Błąd łączności z serwerem', 'spróbuj odświerzyć stronę', `status ${err}`]);
                    setOpenMessage(true);
                })
        })()
    }, [setMessages, setOpenMessage])
    const handleSubmit = (e) => {
        e.preventDefault();
        const isOk = validation();
        if (!isOk) {
            setMessages(['musisz uzupełnić wszystkie wymagane pola']);
            setOpenMessage(true);
            return;
        }
        const data = { ...formData };
        data.productionStart = `${data.productionStart}:00.791Z`;
        data.productionEnd = `${data.productionEnd}:00.791Z`;
        ProductionReportService.save(data)
            .then(data => {
                setMessages(['Dodano raport']);
                setOpenMessage(true);
            })
            .catch(err => {
                setMessages(['Nie udało się zapisać raportu', 'wystąpił błąd łączności', `status ${err}`]);
                setOpenMessage(true);
            })
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prevState => ({ ...prevState, [name]: value }))
    };

    const validation = () => {
        let isOk = true;

        if (new Date(formData.productionStart).getTime() >= new Date(formData.productionEnd).getTime()) {
            if (isOk) isOk = false;
            setErrors(prevProps => ({
                ...prevProps,
                productionStart: true,
                productionEnd: true
            }))
        } else {
            setErrors(prevProps => ({
                ...prevProps,
                productionStart: false,
                productionEnd: false
            }))
        }
        if (formData.productionHours < 1 && formData.productionMinutes < 1) {
            if (isOk) isOk = false;
            setErrors(prevProps => ({
                ...prevProps,
                productionHours: true,
                productionMinutes: true
            }))
        } else {
            setErrors(prevProps => ({
                ...prevProps,
                productionHours: false,
                productionMinutes: false
            }))
        }

        for (let pattern in patterns) {
            const regExp = new RegExp(patterns[pattern]);
            if (regExp.test(formData[pattern])) {
                setErrors(prevProps => ({
                    ...prevProps,
                    [pattern]: false
                }))
            } else {
                setErrors(prevProps => ({
                    ...prevProps,
                    [pattern]: true
                }))
                if (isOk) isOk = false;
            }
        }
        return isOk;
    }
    const speedOptions = () => {
        let output = [];
        for (let i = 5; i < 70; i = i + 5) {
            output.push(<MenuItem key={`speed${i}`} value={i}>{i}</MenuItem>)
        }
        return output;
    }
    return (
        <Grid className={classes.container} container>
            <Grid component='form' onSubmit={handleSubmit} item>
                <Grid>
                    <TextField
                        name='productionStart'
                        id="productionStart"
                        label="Początek pracy"
                        type="datetime-local"
                        value={formData.productionStart}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        error={errors.productionStart}
                    />
                    <TextField
                        value={formData.productionEnd}
                        name='productionEnd'
                        id="productionEnd"
                        label="Koniec pracy"
                        type="datetime-local"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        error={errors.productionEnd}
                    />
                </Grid>
                <Grid>
                    <TextField
                        type='number'
                        name='productionHours'
                        value={formData.productionHours}
                        onChange={handleChange}
                        label='Czas w godzinach'
                        className={classes.textField}
                        error={errors.productionHours}
                    />
                    <TextField
                        type='number'
                        name='productionMinutes'
                        value={formData.productionMinutes}
                        onChange={handleChange}
                        label='Czas w minutach'
                        className={classes.textField}
                        error={errors.productionMinutes}
                    />
                </Grid>
                <Grid>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="lineId">Linia</InputLabel>
                        <Select
                            labelId="lineId"
                            id="lineSelect"
                            value={formData.line}
                            onChange={handleChange}
                            name='lineId'
                            label="Linia"
                            error={errors.lineId}
                        >
                            {lines.map(line => (
                                <MenuItem key={`line${line.id}`} value={line.id}>{line.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="speedMachinePerCycle">Szybkość</InputLabel>
                        <Select
                            labelId="speedMachinePerCycle"
                            id="speedMachinePerCycleSelect"
                            value={formData.speedMachinePerCycle}
                            onChange={handleChange}
                            name='speedMachinePerCycle'
                            label="Szybkość"
                            error={errors.speedMachinePerCycle}
                        >
                            {speedOptions()}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="productId">Produkt</InputLabel>
                        <Select
                            labelId="outlined"
                            id="productSelect"
                            value={formData.productId}
                            onChange={handleChange}
                            name='productId'
                            label="Produkt"
                            error={errors.productId}
                        >
                            {products.map(product => (
                                <MenuItem key={`product${product.id}`} value={product.id}>{product.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            variant='outlined'
                            type='text'
                            name='series'
                            value={formData.series}
                            onChange={handleChange}
                            label='Seria'
                            className={classes.textField}
                            error={errors.series}
                        />
                    </FormControl>
                </Grid>

                <Grid>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="firstWorkplaceIdEmployee">Pierwsze stanowisko</InputLabel>
                        <Select
                            labelId="firstWorkplaceIdEmployee"
                            id="firstWorkplaceIdEmployeeSelect"
                            value={formData.firstWorkplaceIdEmployee}
                            onChange={handleChange}
                            name='firstWorkplaceIdEmployee'
                            label="Pierwsze stanowisko"
                            error={errors.firstWorkplaceIdEmployee}
                        >
                            {employees.map(employee => (
                                <MenuItem key={`firstemployee${employee.id}`} value={employee.id}>{`${employee.name} ${employee.lastName}`}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="secondWorkplaceIdEmployee">Pierwsze stanowisko</InputLabel>
                        <Select
                            labelId="secondWorkplaceIdEmployee"
                            id="secondWorkplaceIdEmployeeSelect"
                            value={formData.secondWorkplaceIdEmployee}
                            onChange={handleChange}
                            name='secondWorkplaceIdEmployee'
                            label="Drugie stanowisko"
                            error={errors.secondWorkplaceIdEmployee}
                        >
                            {employees.map(employee => (
                                <MenuItem key={`secondemployee${employee.id}`} value={employee.id}>{`${employee.name} ${employee.lastName}`}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="thirdWorkplaceIdEmployee">Trzecie stanowisko</InputLabel>
                        <Select
                            error={errors.thirdWorkplaceIdEmployee}
                            labelId="thirdWorkplaceIdEmployee"
                            id="thirdWorkplaceIdEmployeeSelect"
                            value={formData.thirdWorkplaceIdEmployee}
                            onChange={handleChange}
                            name='thirdWorkplaceIdEmployee'
                            label="Trzecie stanowisko"
                        >
                            {employees.map(employee => (
                                <MenuItem key={`thirdemployee${employee.id}`} value={employee.id}>{`${employee.name} ${employee.lastName}`}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid>

                    <TextField
                        variant='outlined'
                        type='number'
                        name='totalQuantityProduced'
                        value={formData.totalQuantityProduced}
                        onChange={handleChange}
                        label='Ilość wyprodukowana'
                        className={classes.quantityProducedField}
                        error={errors.totalQuantityProduced}
                    />

                </Grid>
                <Grid>
                    <TextField
                        placeholder="Opis"
                        multiline={true}
                        id='description'
                        variant='outlined'
                        fullWidth
                        className={classes.textarea}
                        rows={5}
                        name='description'
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid justify='flex-end' container>
                    <PrimaryButton value='ZAPISZ' onClick={handleSubmit} />
                </Grid>
            </Grid>
        </Grid>
    );
};