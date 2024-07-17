import React, { useState } from "react";

const DischargeForm = () => {
    const [bedtakenid, setbedtakenid] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // is bed taken id that of a hospitalised patient?
            const response2 = await fetch(`http://localhost:5000/dischargeverifier?bedtakenid=${bedtakenid}`);
            const jsonData2 = await response2.json();

            if(jsonData2.length == 0)
            {
                alert('Invalid admission id! No such patient is currently hospitalised')
                return;
            }

            const response = await fetch(`http://localhost:5000/bedstakendischarge/${bedtakenid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) {
                console.log("Patient discharged successfully!");
            } else {
                console.error("Failed to discharge patient!");
            }

            window.location = "/bedstaken";
        } catch (error) {
            console.error("Failed to discharge patient!", error);
        }
    };

    return (
        <div className="text-center">
            <h1>Discharge Patient</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Admission ID:
                    <input
                        type="text"
                        value={bedtakenid}
                        onChange={(e) => setbedtakenid(e.target.value)}
                    />
                </label> <br />
                <div style={{fontSize: '24px'}}> <button type="submit">Submit</button> </div>
            </form>
        </div>
    );
};

export default DischargeForm;
