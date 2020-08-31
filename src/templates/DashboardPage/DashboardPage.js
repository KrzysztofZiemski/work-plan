import React, { useEffect, useRef } from 'react';
import MUIDataTable from 'mui-datatables';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import useRanking from '../../hooks/useRanking';
import routes from '../../utils/routes';

const headerProduct = [
    {
        name: 'miejsce',
        label: 'ranking generalny',
        download: true,
        print: true,
    },
    {
        name: 'pracownik',
        label: 'ranking pierwsze stanowisko',
        download: true,
        print: true,
    },
];

const columns = [
    // {
    //     name: 'id',
    //     label: 'id',
    //     options: {
    //         filter: false,
    //         sort: false,
    //         display: false,
    //         customBodyRender: () => <AccountBoxIcon />
    //     }
    // },
    {
        name: 'place',
        label: 'miejsce',
        options: {
            filter: true,
            sort: true,
            customFilterListOptions: {
                render: v => v.map(l => l.employee.toUpperCase())
            },
        },
    },
    {
        name: 'generalRanking',
        label: 'ranking generalny',
        options: {
            filter: true,
            sort: true,
            customFilterListOptions: {
                render: v => v.map(l => l.employee.toUpperCase())
            },
        },
    },
    {
        name: 'firstWorkplaceRanking',
        label: 'pierwsze stanowisko',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'secondWorkplaceRanking',
        label: 'drugie stanowisko',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'thirdWorkplaceRanking',
        label: 'trzecie stanowisko',
        options: {
            filter: true,
            sort: true
        }
    },
    // {
    //     name: 'settings',
    //     label: 'ustawienia',
    //     options: {
    //         filter: false,
    //         sort: false,
    //         print: false,
    //         download: false,
    //         expandableRowsHeader: true,
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             const id = tableMeta.rowData[0];
    //             return <Link to={`${routes.employeeDetails}/${id}`}><SettingsIcon color="primary" /></Link>
    //         }
    //     }
    // },
]

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400
    }
}));

// const getRankingListItem = ({ employee, ...ranking }) => ({ ...employee, ...ranking })
const getCell = (rankingTypeArr) => rankingTypeArr.map(({ employee, totalProduced }) => <Link to={`${routes.employeeDetails}/${employee.id}`}>{`${employee.name} ${employee.lastName}`}</Link>)

const convertDataTable = (ranking) => {
    const generalRanking = getCell(ranking.YEAR.generalRanking)
    const firstWorkplaceRanking = getCell(ranking.YEAR.firstWorkplaceRanking);
    const secondWorkplaceRanking = getCell(ranking.YEAR.secondWorkplaceRanking);
    const thirdWorkplaceRanking = getCell(ranking.YEAR.thirdWorkplaceRanking);

    const rows = []
    for (let i = 0; i < firstWorkplaceRanking.length; i++) {
        rows.push([i + 1, generalRanking[i], firstWorkplaceRanking[i], secondWorkplaceRanking[i], thirdWorkplaceRanking[i]]);
    }

    return rows
}
export const DashboardPage = () => {
    const options = {
        rowsPerPageOptions: [10, 20, 50],
        filter: true,
        responsive: 'standard',
        filterType: "dropdown",
        fixedSelectColumn: true,
        // onRowsDelete: handleRemoveProductsBtn,
        // isRowSelectable: (index) => list[index].isActive,
        rowsSelected: [],
        onDownload: (buildHead, buildBody, columns, data) => {
            return "\uFEFF" + buildHead(headerProduct) + buildBody(data);
        },
    
        downloadOptions: {
            filename: 'excel-format.csv',
            separator: ';',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
            },

        }
    };
    const [ranking, handler] = useRanking();
    const classes = useStyles()
    useEffect(() => {
        handler.get(new Date(), handler.types.YEAR)
    }, [])
    // const x = ranking.YEAR.generalRanking - map
    let x = []
    if (ranking.YEAR.generalRanking) x = convertDataTable(ranking)

    return (
        <div className={classes.root}>
            <h1>Ranking</h1>
            <MUIDataTable
                title={"Ranking generalny"}
                data={x}
                columns={columns}
                options={options}
            />
        </div>
    );
};