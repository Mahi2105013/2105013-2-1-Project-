import React, { Fragment, useEffect, useState } from "react";

let currMonth = 'none';
let rank = 1;
const AdmissionsCountMonthly = () => {
    const [medicines, setMedicines] = useState([]);
    //const [selectedMonth, setSelectedMonth] = useState(1); // Default month value
    const [selectedYear, setSelectedYear] = useState(2024); // Default year value

    const getMedicines = async () => {
        try {
            const response = await fetch(`http://localhost:5000/topmedsyearly?year=${selectedYear}`);
            const jsonData = await response.json();
            setMedicines(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.log(error.message)
        }
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
    }, [selectedYear]);

    return (
        <Fragment>
            <h1 id = "topsellingmedicinesmonthly">TOP SELLING MEDICINES (YEARLY ANALYSIS)</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="year">Select Year:</label>
                <select id="year" value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 4 }, (_, i) => (
                        <option key={2021 + i} value={2021 + i}>{2021 + i}</option>
                    ))}
                </select>
                <br />
            </form>

            <h2> TOP SELLING MEDICINES in {selectedYear}</h2> 
            <table className="table table-bordered table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th>Medicine ID</th>
                        <th>Medicine Name</th>
                        <th>QUANTITY BOUGHT</th>
                        <th>REVENUE</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(todo => (
                        <tr>
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

export default AdmissionsCountMonthly;
