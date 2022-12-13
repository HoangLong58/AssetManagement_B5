import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import {useLocation} from 'react-router-dom';
import EditAssignmentMain from '../components/ManageAssignment/EditAssignmentMain';


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const EditAssignment = () => {
    const location = useLocation();
    return (
        <>
            <Navbar pageName="Manage Assignment " action="> Edit Assignment" dropDown={true}/>
            <Container>
                <Aside active="manageAssignment"/>
                <EditAssignmentMain data={location.state}/>
            </Container>
        </>
    )
}

export default EditAssignment;