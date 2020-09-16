import React, { useState, createContext } from 'react';

export const UserContext = createContext({
    loggedUser: null,
    setLoggedUser: null,
    activeLeftMenu: false,
    setActiveLeftMenu: null,
});
export const RoleContext = createContext({
    roleList: null,
    setRoleList: null
});
export const UsersContext = createContext({
    usersList: null,
    setUsersList: null
});
export const EmployeesContext = createContext({
    employeesList: [],
    setEmployeesList: '',
    inActiveEmployeesList: [],
    setInActiveEmployeesList: ''
});
export const LinesContext = createContext({
    linesList: [],
    setLinesList: '',
});
export const ProductsContext = createContext({
    productsList: [],
    setProductsList: '',
});

const Contexts = ({ children }) => {
    let [activeLeftMenu, setActiveLeftMenu] = useState(false);
    let [employeesList, setEmployeesList] = useState([]);
    let [loggedUser, setLoggedUser] = useState(null);
    let [inActiveEmployeesList, setInActiveEmployeesList] = useState([]);
    let [usersList, setUsersList] = useState([]);
    let [roleList, setRoleList] = useState([]);
    let [linesList, setLinesList] = useState([]);
    let [productsList, setProductsList] = useState([]);

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser, activeLeftMenu, setActiveLeftMenu }}>
            <RoleContext.Provider value={{ roleList, setRoleList }}>
                <EmployeesContext.Provider value={{ employeesList, setEmployeesList, inActiveEmployeesList, setInActiveEmployeesList }}>
                    <LinesContext.Provider value={{ linesList, setLinesList }}>
                        <UsersContext.Provider value={{ usersList, setUsersList }}>
                            <ProductsContext.Provider value={{ productsList, setProductsList }}>
                                {children}
                            </ProductsContext.Provider>
                        </UsersContext.Provider>
                    </LinesContext.Provider>
                </EmployeesContext.Provider>
            </RoleContext.Provider>
        </UserContext.Provider >
    )

};

export default Contexts;