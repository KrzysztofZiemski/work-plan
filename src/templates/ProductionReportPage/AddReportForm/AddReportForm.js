import React, { useEffect, useState, useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import ButtonLoader from '../../../components/ButtonLoader';
import LineService from '../../../services/LineService';
import { getProductsByActive } from '../../../services/ProductService';
import { getEmployeesByActive } from '../../../services/employeesService';
import ProductionReportService from '../../../services/ProductionReportService';
import { UserContext, EmployeesContext, LinesContext } from '../../../App'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: 'auto',
        padding: 20,
        overflow: 'auto'
    },
    textField: {
        margin: 10,
        width: 220,
    },
    autoComplete: {
        margin: 20
    },
    formControl: {
        marginRight: 10,
        marginLeft: 10,
        minWidth: 200,
    },
    textarea: {
        margin: '60px 10px 10px 10px',
    },
    quantityProducedField: {
        margin: 10,
    },
    subTitlesForm: {
        margin: 15,
        padding: 5
    }
}));

const today = () => {
    const today = new Date();
    const month = today.getMonth() < 9 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    return `${today.getFullYear()}-${month}-${day}T${hours}:${minutes}`;


}
const errorsMessage = {
    employeesSame: 'wybrałeś tych samych pracowników',
    empty: 'wartość nie może być pusta',
    workTime: 'wskaż czas pracy',
    wrongDates: 'czas końca pracy musi być późniejszy niż początku',
}
export const AddReportForm = ({ setOpenMessage, setMessages, setLoader }) => {
    const blankForm = {
        productionStart: today(),
        productionEnd: today(),
        lineId: '',
        productionHours: 0,
        productionMinutes: 0,
        productId: '',
        series: '',
        speedMachinePerMinute: '',
        firstWorkplaceIdEmployee: '',
        secondWorkplaceIdEmployee: '',
        thirdWorkplaceIdEmployee: '',
        description: '',
        totalQuantityProduced: ''
    }
    const blankErrors = {
        productionStart: false,
        productionEnd: false,
        lineId: false,
        productionHours: false,
        productionMinutes: false,
        productId: false,
        series: false,
        speedMachinePerMinute: false,
        firstWorkplaceIdEmployee: false,
        secondWorkplaceIdEmployee: false,
        thirdWorkplaceIdEmployee: false,
        totalQuantityProduced: false
    }
    //series: '.{3,20}|^$',
    let patterns = {
        lineId: '.{1,20}',
        productId: '.{1,20}',
        series: '.{3,20}',
        speedMachinePerMinute: `^[1-9][0-9]*$`,
        totalQuantityProduced: '(.{1,20})'
    }
    const blankErrorLabels = {
        productionStart: '',
        productionEnd: '',
        lineId: '',
        productionHours: '',
        productionMinutes: '',
        productId: '',
        series: '',
        speedMachinePerMinute: '',
        firstWorkplaceIdEmployee: '',
        secondWorkplaceIdEmployee: '',
        thirdWorkplaceIdEmployee: '',
        totalQuantityProduced: ''
    }
    const classes = useStyles();

    const { loggedUser } = useContext(UserContext);
    const { employeesList, setEmployeesList } = useContext(EmployeesContext);
    const { linesList, setLinesList } = useContext(LinesContext);

    let [formData, setFormData] = useState(blankForm);
    let [errors, setErrors] = useState(blankErrors);
    let [errorLabels, setErrorLabels] = useState(blankErrorLabels);
    let [products, setProducts] = useState([]);
    let [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        (async () => {
            const linesPromise = LineService.getAllLines()
                .then(data => setLinesList(data));
            const productsPromise = getProductsByActive()
                .then(data => setProducts(data));
            const employeePromise = getEmployeesByActive()
                .then(data => setEmployeesList(data.sort((a, b) => (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0)));
            Promise.all([linesPromise, productsPromise, employeePromise])
                .catch(err => {
                    setMessages(['Błąd łączności z serwerem', 'spróbuj odświerzyć stronę', `status ${err}`]);
                    setOpenMessage(true);
                })
        })();
    }, [setMessages, setOpenMessage, setEmployeesList])

    const handleSubmit = (e) => {
        e.preventDefault();
        const isOk = validation();
        if (!isOk) return;
        const data = { ...formData };
        data.productionStart = data.productionStart.replace('T', '-');
        data.productionEnd = data.productionEnd.replace('T', '-');

        data.firstWorkplaceIdEmployee = data.firstWorkplaceIdEmployee.id;
        data.secondWorkplaceIdEmployee = data.secondWorkplaceIdEmployee.id;
        data.thirdWorkplaceIdEmployee = data.thirdWorkplaceIdEmployee.id;
        if (!data.series) delete data.series;
        setIsSubmitting(true);
        ProductionReportService.save(data, loggedUser.id)
            .then(data => {
                setIsSubmitting(false);
                setMessages(['Dodano raport']);
                setOpenMessage(true);
                setFormData(blankForm);
            })
            .catch(err => {
                setIsSubmitting(false);
                setMessages(['Nie udało się zapisać raportu', 'wystąpił błąd łączności', `status ${err}`]);
                setOpenMessage(true);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prevState => ({ ...prevState, [name]: value }))
    };
    const handleChangeAutoCompleteFields = (name, newValue) => {

        setFormData(prevState => ({ ...prevState, [name]: newValue }))
    };

    const validation = () => {
        let isOk = true;
        if (new Date(formData.productionStart).getTime() >= new Date(formData.productionEnd).getTime()) {
            if (isOk) isOk = false;
            setErrors(prevProps => ({
                ...prevProps,
                productionStart: true,
                productionEnd: true
            }));
            setErrorLabels(prevProps => ({
                ...prevProps,
                productionStart: errorsMessage.wrongDates,
                productionEnd: errorsMessage.wrongDates
            }));
        } else {
            setErrors(prevProps => ({
                ...prevProps,
                productionStart: false,
                productionEnd: false
            }));
            setErrorLabels(prevProps => ({
                ...prevProps,
                productionStart: '',
                productionEnd: ''
            }));
        }
        if (formData.productionHours < 1 && formData.productionMinutes < 1) {
            if (isOk) isOk = false;
            setErrors(prevProps => ({
                ...prevProps,
                productionHours: true,
                productionMinutes: true
            }));
            setErrorLabels(prevProps => ({
                ...prevProps,
                productionHours: errorsMessage.workTime,
                productionMinutes: errorsMessage.workTime
            }));
        } else {
            setErrors(prevProps => ({
                ...prevProps,
                productionHours: false,
                productionMinutes: false
            }));
            setErrorLabels(prevProps => ({
                ...prevProps,
                productionHours: '',
                productionMinutes: ''
            }));
        }
        for (let pattern in patterns) {
            const regExp = new RegExp(patterns[pattern]);
            if (regExp.test(formData[pattern])) {
                setErrors(prevProps => ({
                    ...prevProps,
                    [pattern]: false
                }));
                setErrorLabels(prevProps => ({
                    ...prevProps,
                    [pattern]: ''
                }));
            } else {
                setErrors(prevProps => ({
                    ...prevProps,
                    [pattern]: true
                }));
                setErrorLabels(prevProps => ({
                    ...prevProps,
                    [pattern]: errorsMessage.empty
                }));
                if (isOk) isOk = false;
            }
        }
        const workplacesObj = {
            firstWorkplaceIdEmployee: formData.firstWorkplaceIdEmployee,
            secondWorkplaceIdEmployee: formData.secondWorkplaceIdEmployee,
            thirdWorkplaceIdEmployee: formData.thirdWorkplaceIdEmployee
        }

        for (let workplace in workplacesObj) {
            if (workplacesObj[workplace] === '') {
                setErrors(prevProps => ({
                    ...prevProps,
                    [workplace]: true,
                }));
                setErrorLabels(prevProps => ({
                    ...prevProps,
                    [workplace]: errorsMessage.empty,
                }))
                if (isOk) isOk = false;
            } else {
                setErrors(prevProps => ({
                    ...prevProps,
                    [workplace]: false,
                }));
                setErrorLabels(prevProps => ({
                    ...prevProps,
                    [workplace]: '',
                }));

                for (let workplaceSame in workplacesObj) {
                    if (workplaceSame !== workplace) {
                        if (workplacesObj[workplace] === workplacesObj[workplaceSame]) {
                            setErrors(prevProps => ({
                                ...prevProps,
                                [workplace]: true,
                            }));
                            setErrorLabels(prevProps => ({
                                ...prevProps,
                                [workplace]: errorsMessage.employeesSame,
                            }))
                            if (isOk) isOk = false;
                        }
                    };

                }
            }
        }
        return isOk;
    }
    const speedOptions = () => {
        let output = [];
        for (let i = 5; i <= 50; i = i + 5) {
            output.push(<MenuItem key={`speed${i}`} value={i}>{i}</MenuItem>)
        }
        return output;
    }
    return (
        <Grid className={classes.container} container>
            <Grid component='form' onSubmit={handleSubmit} item>
                <h2 className={classes.subTitlesForm}>Czas pracy</h2>
                <Grid>
                    <TextField
                        name='productionStart'
                        id="productionStart"
                        label="Początek pracy"
                        type="datetime-local"
                        variant='outlined'
                        value={formData.productionStart}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        error={errors.productionStart}
                        helperText={errorLabels.productionStart}
                    />
                    <TextField
                        value={formData.productionEnd}
                        name='productionEnd'
                        id="productionEnd"
                        label="Koniec pracy"
                        type="datetime-local"
                        variant='outlined'
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        error={errors.productionEnd}
                        helperText={errorLabels.productionEnd}
                    />
                </Grid>
                <Grid>
                    <TextField
                        type='number'
                        name='productionHours'
                        value={formData.productionHours}
                        onChange={handleChange}
                        label='Czas w godzinach'
                        variant='outlined'
                        className={classes.textField}
                        error={errors.productionHours}
                        helperText={errorLabels.productionHours}
                    />

                    <TextField
                        type='number'
                        name='productionMinutes'
                        value={formData.productionMinutes}
                        onChange={handleChange}
                        label='Czas w minutach'
                        variant='outlined'
                        className={classes.textField}
                        error={errors.productionMinutes}
                        helperText={errorLabels.productionMinutes}
                    />
                </Grid>
                <h2 className={classes.subTitlesForm}>Parametry</h2>
                <Grid>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="lineId">Linia</InputLabel>
                        <Select
                            labelId="lineId"
                            id="lineSelect"
                            value={formData.lineId}
                            onChange={handleChange}
                            name='lineId'
                            label="Linia"
                            error={errors.lineId}
                        >
                            {linesList.map(line => (
                                <MenuItem key={`line${line.id}`} value={line.id}>{line.name}</MenuItem>
                            ))}
                        </Select>
                        {errors.lineId ? <FormHelperText error>{errorLabels.lineId}</FormHelperText> : null}
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="speedMachinePerMinute">Szybkość</InputLabel>
                        <Select
                            labelId="speedMachinePerMinute"
                            id="speedMachinePerMinuteSelect"
                            value={formData.speedMachinePerMinute}
                            onChange={handleChange}
                            name='speedMachinePerMinute'
                            label="Szybkość"
                            error={errors.speedMachinePerMinute}
                        >
                            {speedOptions()}

                        </Select>
                        {errors.speedMachinePerMinute ? <FormHelperText error>{errorLabels.speedMachinePerMinute}</FormHelperText> : null}
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
                        {errors.productId ? <FormHelperText error>{errorLabels.productId}</FormHelperText> : null}
                    </FormControl>
                    <FormControl variant="outlined"
                        className={classes.formControl}
                    >
                        <TextField
                            variant='outlined'
                            type='text'
                            name='series'
                            value={formData.series}
                            onChange={handleChange}
                            label='Seria'
                            error={errors.series}
                            helperText={errorLabels.series}
                        />
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
                        helperText={errorLabels.totalQuantityProduced}
                    />

                </Grid>
                <h2 className={classes.subTitlesForm}>Pracownicy</h2>
                <Grid container>
                    <Grid className={classes.autoComplete}>
                        <Autocomplete
                            value={formData.firstWorkplaceIdEmployee}
                            onChange={(e, newValue) => handleChangeAutoCompleteFields('firstWorkplaceIdEmployee', newValue)}
                            name='firstWorkplaceIdEmployee'
                            options={employeesList}
                            getOptionLabel={(option) => option ? `${option.lastName} ${option.name}` : ''}
                            style={{ width: 250 }}
                            renderInput={(params) => {
                                return <TextField
                                    error={errors.firstWorkplaceIdEmployee}
                                    {...params}
                                    name='firstWorkplaceIdEmployee'
                                    label="Pierwsze stanowisko"
                                    variant="outlined"
                                />
                            }}
                        />
                        {errors.firstWorkplaceIdEmployee ? <FormHelperText error>{errorLabels.firstWorkplaceIdEmployee}</FormHelperText> : null}
                    </Grid >
                    <Grid className={classes.autoComplete}>
                        <Autocomplete
                            value={formData.secondWorkplaceIdEmployee}
                            error={errors.secondWorkplaceIdEmployee}
                            onChange={(e, newValue) => handleChangeAutoCompleteFields('secondWorkplaceIdEmployee', newValue)}
                            name='secondWorkplaceIdEmployee'
                            options={employeesList}
                            getOptionLabel={(option) => option ? `${option.lastName} ${option.name}` : ''}
                            style={{ width: 250 }}
                            renderInput={(params) => {
                                return <TextField
                                    error={errors.secondWorkplaceIdEmployee}
                                    {...params}
                                    name='secondWorkplaceIdEmployee'
                                    label="Drugie stanowisko"
                                    variant="outlined"
                                />
                            }}
                        />
                        {errors.secondWorkplaceIdEmployee ? <FormHelperText error>{errorLabels.secondWorkplaceIdEmployee}</FormHelperText> : null}
                    </Grid>
                    <Grid className={classes.autoComplete}>
                        <Autocomplete
                            value={formData.thirdWorkplaceIdEmployee}
                            onChange={(e, newValue) => handleChangeAutoCompleteFields('thirdWorkplaceIdEmployee', newValue)}
                            name='thirdWorkplaceIdEmployee'
                            options={employeesList}
                            getOptionLabel={(option) => option ? `${option.lastName} ${option.name}` : ''}
                            style={{ width: 250 }}
                            renderInput={(params) => {
                                return <TextField
                                    error={errors.thirdWorkplaceIdEmployee}
                                    {...params}
                                    name='thirdWorkplaceIdEmployee'
                                    label="Trzecie stanowisko"
                                    variant="outlined"
                                />
                            }}
                        />
                        {errors.thirdWorkplaceIdEmployee ? <FormHelperText error>{errorLabels.thirdWorkplaceIdEmployee}</FormHelperText> : null}
                    </Grid>
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

                    <ButtonLoader isSubmitting={isSubmitting} value='ZAPISZ' onClick={handleSubmit} />
                </Grid>
            </Grid>
        </Grid >
    );
};
