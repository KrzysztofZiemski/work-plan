import { useState, useEffect } from 'react';
import { getEmployeesByActive } from '../services/employeesService';

const useActiveEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [fetched, setFetched] = useState(false);

    const getEmployees = () => getEmployeesByActive().then(employeesList => setEmployees(employeesList));

    useEffect(() => {
        getEmployees();
    }, []);

    return [{ list: employees, fetched }, getEmployees];
};

export default useActiveEmployees;