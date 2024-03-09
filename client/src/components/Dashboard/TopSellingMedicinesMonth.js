import React, { Fragment, useEffect, useState } from "react";

let currMonth = 'none'
const TopSellingMedicines = () => {
    const [medicines, setMedicines] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(1); // Default month value
    const [selectedYear, setSelectedYear] = useState(2024); // Default year value

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
            const response = await fetch(`http://localhost:5000/topmedsByMonth?month=${selectedMonth}&year=${selectedYear}`);
            const jsonData = await response.json();
            setMedicines(jsonData);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    }

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getMedicines();
    }

    useEffect(() => {
        getMedicines();
    }, [selectedMonth, selectedYear]);

    return (
        <Fragment>
            <h1 id = "topsellingmedicinesmonthly">Top Selling Medicines (Monthly)</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="month">Select Month:</label>
                <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    {months.map(month => (
                        <option key={month.value} value={month.value}>{currMonth = month.label}</option>
                    ))}
                </select>
                <br />
                <label htmlFor="year">Select Year:</label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 4 }, (_, i) => (
                        <option key={2021 + i} value={2021 + i}>{2021 + i}</option>
                    ))}
                </select>
                <br />
            </form>
            <h2> Top Selling Medicines in {selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}/{selectedYear}</h2> 
            <table className="table table-bordered table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th>MEDICINE ID</th>
                        <th>MEDICINE NAME</th>
                        <th>QUANTITY BOUGHT</th>
                        <th>REVENUE (IN TAKA)</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(todo => (
                        <tr key={todo.MEDID}>
                            <td>{todo.MEDID}</td>
                            <td>{todo.NEM}</td>
                            <td>{todo.Q}</td>
                            <td className="bg-success" width={'25%'}>{todo.REVENUE}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default TopSellingMedicines;
