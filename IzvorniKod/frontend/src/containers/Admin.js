import React, {useEffect, useState} from 'react';
import { GlobalStyle } from '../elements/global';
import { connect } from 'react-redux'
import { get_students, get_admins, remove_admin, add_admin, delete_account } from '../actions/admin';

const AdminPage = ({ students_global, admins_global, email, get_admins, get_students }) => {
    
    useEffect(() => {
        get_admins();
        get_students();  
        setStudents(students_global);   
        setAdmins(admins_global); 
    }, [students_global]);

    const [admins, setAdmins] = useState([]);
    const [students, setStudents] = useState([]);

    return (
        <React.Fragment>
        <GlobalStyle />
        <div>
            <div>
                <h1>Admin Panel</h1>
                <span><b>Students</b></span>
                {
                    students.map((item) => (
                    <div key={item['email']}>
                        <span><b>Mail:</b>{item['email']}</span>
                        <span><b>Username:</b>{item['username']}</span>
                        <span><b>First Name:</b>{item['first_name']}</span>
                        <span><b>Last Name:</b>{item['last_name']}</span>
                        <button onClick={() => delete_account(item['email'])}>Delete</button>
                        <button onClick={() => add_admin(item['email'])}>Grant Admin</button>
                    </div>
                    ))
                }
                <hr style={{color: "black"}, {width: "99%"}}></hr>
                <span><b> Admins</b></span>
                {
                    admins.map((item) => (
                    <div key={item['email']}>
                        <span><b>Mail:</b>{item['email']}</span>
                        <span><b>Username:</b>{item['username']}</span>
                        <span><b>First Name:</b> {item['first_name']}</span>
                        <span><b>Last Name:</b> {item['last_name']}</span>
                        {item['email'] === email ? <div></div> : <button onClick={() => remove_admin(item['email'])}>Revoke Admin</button>}
                    </div>
                    ))
                }
            </div>
        </div>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    students_global: state.admin.students,
    admins_global: state.admin.admins,
    email: state.profile.email
})
  
export default connect(mapStateToProps, { get_admins, get_students, remove_admin, add_admin, delete_account })(AdminPage);