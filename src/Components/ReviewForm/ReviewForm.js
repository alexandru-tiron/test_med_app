// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import './ReviewForm.css'
// Function component for giving reviews
function GiveReviews() {
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
                <h2>Reviews</h2>
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
                                Provide Feedback
                            </th>
                            <th>
                                Review Given
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {doctors && doctors.map((doctor, index) => {
                            return (<tr>
                                <td>{index}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.speciality}</td>
                                <td><Popup
                                    style={{ backgroundColor: 'transparent', width: '25rem' }}
                                    trigger={
                                        <button disabled={!!doctor.review}>Click Here</button>
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
                                        const handleSubmit = (doctor) => {
                                            // Check if all required fields are filled before submission
                                            if (formData.name && formData.review) {
                                                setShowWarning(false);
                                            } else {
                                                setShowWarning(true);
                                                return;
                                            }
                                            setDoctors((prev => prev.map((doc => { return doc.name === doctor.name ? { ...doc, review: { ...formData } } : doc }))))
                                            setFormData({
                                                name: '',
                                                review: '',
                                                rating: 0
                                            });
                                            setShowModal(false)
                                            close();
                                        };
                                        return (
                                            <div className="doctorbg"  >
                                                <div>
                                                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(doctor); }}>
                                                        <h2>Give Your Review</h2>
                                                        {/* Display warning message if not all fields are filled */}
                                                        {showWarning && <p className="warning">Please fill out all fields.</p>}
                                                        <div>
                                                            <label htmlFor="name">Name:</label>
                                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="review">Review:</label>
                                                            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="rating">Rating:</label>
                                                            <select d="rating" name="rating" value={formData.rating} onChange={handleChange}>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                                <option value={4}>4</option>
                                                                <option value={5}>5</option>
                                                            </select>
                                                        </div>
                                                        {/* Submit button for form submission */}
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                        )
                                    }}
                                </Popup></td>
                                <td>{doctor.review?.review}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>





        </div>
    );
}

export default GiveReviews;
