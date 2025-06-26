// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './ReportsLayout.css'
// Function component for giving reviews
function ReportsLayout() {
    // State variables using useState hook
    const [showWarning, setShowWarning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
    });

    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const gethoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                console.log(data)
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        gethoctorsDetails();
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
    }, [])

    // Function to handle form input changes
    const handleChange = (e) => {
        // Update the form data based on user input
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    return (
        <div className='reviews' >
            <div className='reviewsSection'>
                <h2>Reports</h2>
                <table className='reviewTable'>
                    <thead>
                        <tr>
                            <th>
                                Serial Number
                            </th>
                            <th>
                                Doctor Name
                            </th>
                            <th>
                                Doctor Speciality
                            </th>
                            <th>
                                View Report
                            </th>
                            <th>
                                Download Report
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {doctors && doctors.map((doctor, index) => {
                            const handleDownload = () => {
                                const reportContent = `
                              Doctor Report
                              
                              Name: ${doctor.name}
                              Experience: ${doctor.experience}
                              Speciality: ${doctor.speciality}
                              Ratings: ${doctor.ratings}
                              `;
                              
                                const blob = new Blob([reportContent], { type: "text/plain" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `${doctor.name}_report.txt`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                              };
                            return (<tr>
                                <td>{index}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td><Popup
                                    style={{ backgroundColor: 'transparent', width: '25rem' }}
                                    trigger={
                                        <button>View Report</button>
                                    }
                                    modal
                                    open={showModal}
                                    onClose={() => {
                                        setShowModal(false);
                                        setFormData({
                                            name: '',
                                            review: '',
                                            rating: 0
                                        });
                                    }}
                                >
                                    {(close) => {
                                        return (
                                            <div className="doctorbg"  >
                                                <div>
                                                    <h4>Doctor Report</h4>
                                                    <h3>Doctor name: {doctor.name}</h3>
                                                    <p> <b>Experience:</b> {doctor.experience}</p>
                                                    <p><b>Speciality:</b> {doctor.speciality}</p>
                                                    <p><b>Ratings:</b> {doctor.ratings}</p>
                                                </div>
                                            </div>
                                        )
                                    }}
                                </Popup></td>
                                <td><button onClick={handleDownload} >Download Report</button></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReportsLayout;
