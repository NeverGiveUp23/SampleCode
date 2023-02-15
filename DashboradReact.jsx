import { useState, useEffect } from "react"
import React from 'react'
import axios from 'axios';
import StudentService from "../services/StudentService";
import EditForm from "./EditForm";


const Dashboard = (props) => {
    const {students, onUpdate} = props
    const [updateId, setUpdateId] = useState()

    const handleDelete =(id) =>{
        StudentService.deleteStudent(id)
            .then(res=>{
                onUpdate()
            })
            .catch(err=>console.log(err))
    }

    const updatedStudent = ()=>{
        setUpdateId();
        onUpdate();
    }

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th> ID </th>
                    <th> Name</th>
                    <th> Email</th>
                    <th> Actions </th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map((student, i)=>(
                        <tr key={i}>
                            <td> {student.id} </td>
                            <td> {student.name} </td>
                            <td> {student.email} </td>
                            <td>
                                {
                                    updateId === student.id ?
                                        <EditForm id={student.id} onUpdate={updatedStudent}/> :
                                        <div className="row">
                                            <button className="btn btn-warning col-sm-2" onClick={(e)=>setUpdateId(student.id)} > Edit</button>
                                            <button className="btn btn-danger col-sm-2" onClick={(e)=>handleDelete(student.id)} > Delete</button>
                                        </div>
                                }

                            </td>

                        </tr>
                    ))
                }
                </tbody>
            </table>


        </div>
    )
}

export default Dashboard
