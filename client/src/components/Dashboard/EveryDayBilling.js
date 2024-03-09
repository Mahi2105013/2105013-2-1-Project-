import React, { Fragment, useEffect, useState } from "react";

let currMonth = 'none'
const EveryDayBilling = () => {
    const [medicines, setMedicines] = useState([]);
    const [medicinewiseanalysis, setmedicinewiseanalysis] = useState([]);
    const [testwiseanalysis, settestwiseanalysis] = useState([]);
    const [bed, setbed] = useState([]);
    const [bedcount, setbedcount] = useState(0);
    const [GivenDate, setGivenDate] = useState('2024-01-03'); // Default month value

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
            const response = await fetch(`http://localhost:5000/everydayrevenue?GivenDate=${GivenDate}`);
            const jsonData = await response.json();
            setMedicines(jsonData);
            console.log(jsonData);

            const response2 = await fetch(`http://localhost:5000/medicinewiseanalysisday?GivenDate=${GivenDate}`)
            const jsonData2 = await response2.json();
            setmedicinewiseanalysis(jsonData2);
            console.log(jsonData2);

            //testwiseanalysisday
            const response3 = await fetch(`http://localhost:5000/testwiseanalysisday?GivenDate=${GivenDate}`)
            const jsonData3 = await response3.json();
            settestwiseanalysis(jsonData3);
            console.log(jsonData3);

            const response4 = await fetch(`http://localhost:5000/bedstakenoccday?GivenDate=${GivenDate}`)
            const jsonData4 = await response4.json();
            setbed(jsonData4);
            console.log(jsonData4);
            console.log("Here you go! " + jsonData4.length)
            setbedcount(jsonData4.length)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleStartDateChange = (e) => {
        setGivenDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getMedicines();
    }

    useEffect(() => {
        getMedicines();
    }, [GivenDate]);

    return (
        <Fragment>
            <div className="text-center">
            <h1 id = "EveryDayBillingmonthly">Day End Revenue</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="month">Select Date:</label>
                {/* <select id="month" value={selectedMonth} onChange={handleMonthChange}>
                    {months.map(month => (
                        <option key={month.value} value={month.value}>{currMonth = month.label}</option>
                    ))}
                </select> */}
                <input type = "date" value={GivenDate} onChange={handleStartDateChange}> 
                </input>
                <br />
            </form>
            {/* <h2> Top Selling Medicines in {selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}/{selectedYear}</h2>  */}
            <table className="table table-bordered table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th> REVENUE FROM MEDICINES</th>
                        <th> REVENUE FROM TESTS </th>
                        <th> REVENUE FROM BED ALLOCATION </th>
                        <th>TOTAL REVENUE ON {GivenDate}</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map(todo => (
                        <tr>
                            <td>{todo.MED}</td>
                            <td>{todo.T}</td>
                            <td>{todo.B}</td>
                            <td className="bg-success">{todo.EV}</td>
                            
                            {/* <td className="bg-success" width={'25%'}>{todo.REVENUE}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            





            <h1 id = "MedicineWiseAnalysismonthly">Medicine-Wise Analysis</h1>
            <h2> [Quantities sold and revenue on {GivenDate}] </h2>
            <table className="table table-bordered table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th>MEDICINE ID</th>
                        <th> MEDICINE </th>
                        <th> TOTAL QUANTITY SOLD</th>
                        <th>TOTAL REVENUE IN TAKA</th>
                    </tr>
                </thead>
                <tbody>
                    {medicinewiseanalysis.map(todo => (
                        <tr>
                            <td>{todo.MEDICINE_ID}</td>
                            <td>{todo.MEDICINE_NAME}</td>
                            <td>{todo.QUANTITIES_SOLD}</td>
                            <td className="bg-success">{todo.TOTAL_REV}</td>       
                        </tr>
                    ))}
                </tbody>
            </table>






            <h1 id = "MedicineWiseAnalysismonthly">Test-Wise Analysis on {GivenDate}</h1>
            <table className="table table-bordered table-dark table-striped table-sm">
                <thead>
                    <tr>
                        <th>TEST ID</th>
                        <th> TEST NAME </th>
                        <th style={{width: '25%'}}> TOTAL NUMBER OF TIMES TEST WAS TAKEN</th>
                        <th>TOTAL REVENUE IN TAKA</th>
                    </tr>
                </thead>
                <tbody>
                    {testwiseanalysis.map(todo => (
                        <tr>
                            <td>{todo.TEST_ID}</td>
                            <td>{todo.TYPE}</td>
                            <td>{todo.DQ}</td>
                            <td className="bg-success">{todo.DR}</td>
                        </tr>
                    ))}
                </tbody>
            </table>






    <center><h1 class = "mt-5" id="list"> LIST OF OCCUPIED BEDS AND HOSPITALISED PATIENTS on {GivenDate} </h1></center>
    
    <h2>Number of beds occupied: {bedcount}</h2>
    <table class="table table-bordered table-dark table-striped table-sm table-responsive">
    <thead>
      <tr>
      <th>BED TAKEN ID</th>
      <th>ADMISSION ID</th>
        <th>PATIENT NAME</th>
        <th> DISEASE </th>
        <th> BED ID </th>
        <th>BED NUMBER</th>
        <th>ROOM NAME</th>
        <th>ROOM TYPE</th>
        <th>START DATE</th>
        <th style={{width: '5%'}}>COST PER NIGHT</th>
        <th style={{width: '10%'}}>NUMBER OF NIGHTS STAYED TILL {GivenDate}</th>
      </tr>
    </thead>

    <tbody>
    {bed.map(todo => (
        <tr key = {todo.BED_TAKEN_ID}>
            <td>
                 {todo.BED_TAKEN_ID}
            </td> 
            <td> {todo.ADMISSION_ID} </td>
            <td> {todo.PATIENT_NAME}  </td>
            <td> {todo.DISEASE}  </td>
            <td> {todo.BED_ID}  </td>
            <td> {todo.BED_NUMBER}  </td>
            <td> {todo.ROOM_NAME}  </td>
            <td> {todo.ROOM_TYPE}  </td>
            <td> {todo.S} </td> 
            <td> {todo.COST_PER_NIGHT} </td> 
            <td> {todo.NUMBER_OF_NIGHTS_STAYED} </td>
        </tr>
    ))}
    </tbody>
    </table>
            </div>
        </Fragment>
    );
}

export default EveryDayBilling;
