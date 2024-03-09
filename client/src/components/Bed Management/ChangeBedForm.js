import React, { useState } from "react";

const ChangeBedForm = () => {
    const [bedtakenid, setBedTakenId] = useState("");
    const [newBedId, setNewBedId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response3 = await fetch(`http://localhost:5000/allocateverifier?newBedId=${newBedId}`);
            const jsonData3 = await response3.json();

            if(jsonData3.length > 0)
            {
                alert('Invalid! Bed is already occupied!')
                return;
            }

            if(newBedId > 107 || newBedId < 1)
            {
                alert('Invalid! No such bed with provided id exists')
                return;
            }

            const response4 = await fetch(`http://localhost:5000/bedtakenoccupiedbeds?bedtakenid=${bedtakenid}`);
            const jsonData4 = await response4.json();   
            
            if(jsonData4.length == 0)
            {
                alert('Invalid! Please provide a correct bed_taken_id')
                return;
            }

            // PUT request to update END_DATE of current BED_TAKEN_ID
            const response1 = await fetch(`http://localhost:5000/changebed/${bedtakenid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                //body: JSON.stringify({ newBedId })
            });
            if (!response1.ok) {
                throw new Error("Failed to update current bed");
            }

            // POST request to insert new row into BED_TAKEN
            const response2 = await fetch("http://localhost:5000/bedtaken", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bedId: newBedId, bedtakenid: bedtakenid })
            });
            if (!response2.ok) {
                throw new Error("Failed to assign new bed");
            }

            console.log("Bed changed successfully!");
            window.location = "/bedstaken";
        } catch (error) {
            console.error("Failed to change bed:", error);
        }
    };

    return (
        <div className="text-center">
            <h1>Change Bed for Patient</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Current Bed Taken ID:
                    <input
                        type="text"
                        value={bedtakenid}
                        onChange={(e) => setBedTakenId(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Enter New Bed ID (changed bed):
                    <input
                        type="text"
                        value={newBedId}
                        onChange={(e) => setNewBedId(e.target.value)}
                    />
                </label>
                <br />
                
                [Find unoccupied/available beds-
                <a href="http://localhost:3000/beds">
                 here]
                </a>
                <br/>
                <button type="submit">Change Bed</button>
            </form>
        </div>
    );
};

export default ChangeBedForm;
