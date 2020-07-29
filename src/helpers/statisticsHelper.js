// export const getEmployeesReports = (reportsArr) => {
//     const empoyees = [];
//     reportsArr.forEach(report => {
//         empoyees.push(report.firstWorkplace, report.secondWorkplace, report.thirdWorkplace);
//     });
//     const output = []
//     empoyees.forEach(employee => {
//         let duplicate = false;
//         output.forEach(element => { if (employee.id === element.id) duplicate = true });
//         if (!duplicate) output.push(employee);
//     });
//     return output.sort((a, b) => {
//         if (a.lastName < b.lastName) {
//             return -1;
//         };
//         if (b.lastName > a.lastName) {
//             return 1;
//         };
//         return 0;
//     });
// };

// export const getSeriesReports = (reportsArr) => {
//     const series = reportsArr.map(report => report.series);
//     const output = []
//     series.forEach(seriesOne => {
//         let duplicate = false;
//         output.forEach(seriesTwo => { if (seriesOne === seriesTwo) duplicate = true });
//         if (!duplicate) output.push(seriesOne);
//     });
//     return output;
// }

export const getProductsReport = (reportsArr) => {
    const products = reportsArr.map(report => report.product);
    const output = [];
    products.forEach(productOne => {
        let duplicate = false;
        output.forEach(productTwo => { if (productOne.id === productTwo.id) duplicate = true });
        if (!duplicate) output.push(productOne);
    });
    return output;
}