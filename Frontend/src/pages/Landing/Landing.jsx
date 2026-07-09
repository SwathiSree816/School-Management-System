import "./Landing.css";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { Link } from "react-router-dom";

function Landing() {

    return (

        <>

            <Navbar />

            <section className="hero">

                <div className="overlay">

                    <h1>
                        Welcome to School Management System
                    </h1>

                    <p>

                        A Complete School Administration Platform

                    </p>

                    <div className="buttons">

                        <Link
                            to="/admin-login"
                            className="btn"
                        >
                            Admin
                        </Link>

                        <Link
                            to="/teacher-login"
                            className="btn"
                        >
                            Teacher
                        </Link>

                        <Link
                            to="/student-login"
                            className="btn"
                        >
                            Student
                        </Link>

                        <Link
                            to="/parent-login"
                            className="btn"
                        >
                            Parent
                        </Link>

                    </div>

                </div>

            </section>

            <section className="features">

                <div className="card">

                    <h2>Admin</h2>

                    <p>

                        Manage Teachers, Students,
                        Parents, Attendance,
                        Notices and Announcements.

                    </p>

                </div>

                <div className="card">

                    <h2>Teacher</h2>

                    <p>

                        Mark Attendance,
                        View Announcements,
                        Manage Profile.

                    </p>

                </div>

                <div className="card">

                    <h2>Student</h2>

                    <p>

                        View Attendance,
                        Notices,
                        Announcements
                        and Profile.

                    </p>

                </div>

                <div className="card">

                    <h2>Parent</h2>

                    <p>

                        Track Student Progress,
                        Notices,
                        Announcements
                        and Profile.

                    </p>

                </div>

            </section>

            <Footer />

        </>

    );

}

export default Landing;