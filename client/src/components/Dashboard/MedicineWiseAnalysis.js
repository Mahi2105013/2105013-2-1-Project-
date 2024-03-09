import React, { Fragment, useEffect, useState } from "react";

let currMonth = 'none'
const MedicineWiseAnalysis = () => {
    const [medicines, setMedicines] = useState([]);
    const [startDate, setstartDate] = useState('2024-01-01'); // Default month value
    const [endDate, setendDate] = useState('2024-02-29'); // Default year value

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];

    const getMedicines = async () => {
        try {
            const response = await fetch(`http://localhost:5000/medicinewiseanalysis?startDate=${startDate}&endDate=${endDate}`);
            const jsonData = await response.json();
            setMedicines(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.log(error.message)
        }
    }

    // const handleMonthChange = (e) => {
    //     setSelectedMonth(parseInt(e.target.value));
    // }

    // const handleYearChange = (e) => {
    //     setSelectedYear(parseInt(e.target.value));
    // }

    const handleStartDateChange = (e) => {
        setstartDate(e.target.value);
    }

    const handleEndDateChange = (e) => {
        setendDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getMedicines();
    }

    useEffect(() => {
        getMedicines();
    }, [startDate, endDate]);

    return (
        <Fragment>
            <h1 id = "MedicineWiseAnalysismonthly">Medicine-Wise Analysis</h1>
            <h2> [Quantities sold and revenue in the specified period] </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="month">Select Start Date:</label>
                {/* <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    {months.map(month => (
                        <option key={month.value} value={month.value}>{currMonth = month.label}</option>
                    ))}
                </select> */}
                <input type = "date" value={startDate} onChange={handleStartDateChange}> 
                </input>
                <br />
                <label htmlFor="year">Select End Date:</label>
                {/* <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 4 }, (_, i) => (
                        <option key={2021 + i} value={2021 + i}>{2021 + i}</option>
                    ))}
                </select> */}
                <input type = "date" value={endDate} onChange={handleEndDateChange}> 
                </input>
                <br />
            </form>
            {/* <h2> Top Selling Medicines in {selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}/{selectedYear}</h2>  */}
            <table className="table table-bordered table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th>MEDICINE ID</th>
                        {/* <th>MEDICINE NAME</th> */}
                        {/* <th>QUANTITY BOUGHT</th> */}
                        <th> MEDICINE </th>
                        <th> TOTAL QUANTITY SOLD</th>
                        <th>REVENUE (IN TAKA)</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(todo => (
                        <tr>
                            <td>{todo.MEDICINE_ID}</td>
                            <td>{todo.NEM}</td>
                            <td>{todo.DQ}</td>
                            <td className="bg-success">{todo.DR}</td>
                            
                            {/* <td className="bg-success" width={'25%'}>{todo.REVENUE}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default MedicineWiseAnalysis;
