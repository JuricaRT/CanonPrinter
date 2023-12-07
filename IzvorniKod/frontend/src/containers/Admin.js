import React, {useEffect, useState} from 'react';
import { GlobalStyle } from '../elements/global';
import { connect } from 'react-redux'
import { get_students, get_admins, remove_admin, add_admin, delete_account } from '../actions/admin';
import * as Element from '../elements/admin';

const AdminPage = ({ students_global, admins_global, email, get_admins, get_students, add_admin, remove_admin, delete_account }) => {
    
    useEffect(() => {
        setStudents(students_global);   
        setAdmins(admins_global); 
    }, [students_global, admins_global])

    useEffect(() => {
        get_admins();
        get_students();  

    }, [get_admins, get_students]);

    const [admins, setAdmins] = useState([]);
    const [students, setStudents] = useState([]);

    const openCollapsible = id => {
        console.log(id);
        var content = document.getElementById(id);
        if (content.style.display === "flex") {
          content.style.display = "none";
        } else {
          content.style.display = "flex";
        }
    };

    return (
        <React.Fragment>
        <GlobalStyle />
        <Element.PageDiv>
            <Element.PermissionSeparator>
                <Element.ListDiv>
                <Element.ListSpan><b> Admins</b></Element.ListSpan>
                {
                    admins.map((item) => (
                    <div key={item['email']}>
                        <Element.CollapseButton onClick={() => openCollapsible(item['email'])}><b></b>{item['email']} 
                        {item['email'] === email ? " <- YOU" : ""}</Element.CollapseButton>
                        <Element.CollapsibleContent id={item['email']}>
                            <span><b>Username: </b>{item['username']}</span>
                            <span><b>First Name: </b> {item['first_name']}</span>
                            <span><b>Last Name: </b> {item['last_name']}</span>
                            <Element.ButtonPositioning>
                                {item['email'] === email ? <div></div> : <Element.AdminAction onClick={() => remove_admin(item['email'])}>Revoke Admin</Element.AdminAction>}
                            </Element.ButtonPositioning>
                        </Element.CollapsibleContent>
                    </div>
                    ))
                }
                </Element.ListDiv>
                <Element.HorizontalLine />
                <Element.ListDiv>
                <Element.ListSpan><b>Students</b></Element.ListSpan>
                {
                    students.map((item) => (
                    <div key={item['email']}>
                        <Element.CollapseButton onClick={() => openCollapsible(item['email'])}><b></b>{item['email']}</Element.CollapseButton>
                        <Element.CollapsibleContent id={item['email']}>
                            <span><b>Username: </b>{item['username']}</span>
                            <span><b>First Name: </b> {item['first_name']}</span>
                            <span><b>Last Name: </b> {item['last_name']}</span>
                            <Element.ButtonPositioning>
                                <Element.AdminAction onClick={() => delete_account(item['email'])}>Delete</Element.AdminAction>
                                <Element.AdminAction onClick={() => add_admin(item['email'])}>Grant Admin</Element.AdminAction>
                            </Element.ButtonPositioning>
                        </Element.CollapsibleContent>
                    </div>
                    ))
                }
                </Element.ListDiv>
            </Element.PermissionSeparator>
        </Element.PageDiv>
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    students_global: state.admin.students,
    admins_global: state.admin.admins,
    email: state.profile.email
})
  
export default connect(mapStateToProps, { get_admins, get_students, remove_admin, add_admin, delete_account })(AdminPage);