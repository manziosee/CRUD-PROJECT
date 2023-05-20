import React, { useEffect, useState } from "react";
import { getpatient } from "../services/ApiService";

export default function PatientList(){

const [patients, setPatients] = useState([])

useEffect(() => {
    let mount = true
    getpatient()
    .then(res => {console.log("res from api", res)
        setPatients(res)
        return() => mount = false
    })
}, [])
    
    return (
        <div>
        <h3>PATIENT LIST</h3>
        <table border={"2px"} cellPadding={"10px"}>
       
            <thead>
                <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Blood Group</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {patients.map(patient => {
                    return <tr key={patient.patient_id}> 
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>{patient.blood}</td>
                    <td><button>Edit</button> <button>Delete</button></td>
                </tr>
                    
                })}

            </tbody>
        </table>
        <button>Add New Patient</button>
        </div>
        )
}
