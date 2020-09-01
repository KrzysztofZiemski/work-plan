import React, { useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import useRanking from '../../hooks/useRanking';
import routes from '../../utils/routes';
import { rankingTypes } from '../../utils/conts';
const headerProduct = [
    {
        name: 'miejsce',
        label: 'ranking generalny',
        download: true,
        print: true,
    },
    {
        name: 'pracownik',
        label: 'pracownik',
        download: true,
        print: true,
    },
    {
        name: 'percentage',
        label: 'procent',
        download: true,
        print: true,
    },
    {
        name: 'averagePerHour',
        label: 'wydajność',
        download: true,
        print: true,
    },
    {
        name: 'totalProduced',
        label: 'Wyprodukowano',
        download: true,
        print: true,
    },
];

const columns = [
    {
        name: 'place',
        label: 'miejsce',
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: 'employee',
        label: 'Pracownik',
        options: {
            filter: true,
            sort: true,
            customFilterListOptions: {
                render: v => v.map(l => l.employee.toUpperCase())
            },
            customBodyRender: ({ id, name, lastName }) => <Link key={id} to={`${routes.employeeDetails}/${id}`}>{`${name} ${lastName}`}</Link>
        },
    },
    {
        name: 'percentage',
        label: 'procent',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'averagePerHour',
        label: 'wydajność',
        options: {
            filter: true,
            sort: true
        }
    },
    {
        name: 'totalProduced',
        label: 'Wyprodukowano',
        options: {
            filter: true,
            sort: true
        }
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        width: 800
    },
}));



export const DashboardPage = () => {
    const options = {
        rowsPerPageOptions: [10, 20, 50],
        filter: true,
        responsive: 'standard',
        filterType: "dropdown",
        fixedSelectColumn: true,
        rowsSelected: [],
        onDownload: (buildHead, buildBody, columns, data) => {
            for (let i = 0; i < data.length; i++) {
                data[i].data[1] = `${data[i].data[1].name} ${data[i].data[1].lastName}`
            }
            return "\uFEFF" + buildHead(headerProduct) + buildBody(data);
        },
        selectableRows: 'none',
        onRowsSelect: false,
        downloadOptions: {
            filename: 'excel-format.csv',
            separator: ';',
            filterOptions: {
                useDisplayedColumnsOnly: true,
                useDisplayedRowsOnly: true,
            },

        }
    };
    const [ranking, getRanking, error] = useRanking();
    const classes = useStyles();

    useEffect(() => {
        getRanking(new Date(), rankingTypes.YEAR)
    }, [])

    const renderDataRanking = (arrRanking) => arrRanking.map(({ averagePerHour, percentage, totalProduced, employee }, index) => (
        [index + 1, employee, `${percentage}%`, averagePerHour, totalProduced]
    ));

    console.log('sss')

    let x = []
    if (ranking.year.generalRanking) x = renderDataRanking(ranking.year.generalRanking)

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