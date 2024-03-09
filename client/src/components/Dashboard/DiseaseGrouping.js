import React, { Fragment, useEffect, useState } from "react";

let currMonth = 'none'
const DiseaseGrouping = () => {
    const [medicines, setMedicines] = useState([]);
    const [startDate, setstartDate] = useState('2024-01-01'); // Default month value
    const [endDate, setendDate] = useState('2024-12-31');

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
            const response = await fetch(`http://localhost:5000/diseasegrouping?startDate=${startDate}&endDate=${endDate}`);
            const jsonData = await response.json();
            setMedicines(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.log(error.message)
        }
    }

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
            <h1 id = "EveryDayBillingmonthly">Hospitalization Period Grouping based on Disease</h1>
            <h4>[Statistics of how many days patients were hospitalized for specific diseases]</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="month">Select Start Date:</label>
                <input type = "date" value={startDate} onChange={handleStartDateChange}> 
                </input>
                <br />
                <label htmlFor="month">Select End Date:</label>
                <input type = "date" value={endDate} onChange={handleEndDateChange}> 
                </input>
                <br />
            </form>
            
            <center><table className="table table-bordered text-center table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th  style={{width: '20%'}}> DISEASE NAME</th>
                        <th  style={{width: '20%'}}> NUMBER OF ADMITTED PATIENTS </th>
                        <th  style={{width: '20%'}}> MAX NUMBER OF DAYS HOSPITALISED </th>
                        <th  style={{width: '20%'}}> MIN NUMBER OF DAYS HOSPITALISED </th>
                        <th  style={{width: '20%'}}>AVERAGE NUMBER OF DAYS HOSPITALISED</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(todo => (
                        <tr>
                            <td>{todo.D}</td>
                            <td>{todo.PATIENTS_WITH_THAT_DISEASE}</td>
                            <td>{todo.MAX_DAYS_ADMITTED}</td>
                            <td>{todo.MIN_DAYS_ADMITTED}</td>
                            <td>{todo.AVG_DAYS_ADMITTED}</td>
                        </tr>
                    ))}
                </tbody>
            </table> </center>
        </Fragment>
    );
}


export default DiseaseGrouping;
