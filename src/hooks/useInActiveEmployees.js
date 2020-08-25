import { useState } from 'react';
import { getEmployeesByActive } from '../services/employeesService';

const useInActiveEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [fetched, setFetched] = useState(false);

    const getEmployees = () => {
        getEmployeesByActive(false)
            .then(employeesList => {
                setEmployees(employeesList);
                setFetched(true);
            });
    }

    return [{ list: employees, fetched }, getEmployees];
};

export default useInActiveEmployees;