import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import CreateNewAssignmentMain from '../components/ManageAssignment/CreateNewAssignmentMain';
import Navbar from "../components/Navbar";

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 18rem auto;
`

const CreateNewAssignment = () => {
    return (
        <>
            <Navbar pageName="Manage Assignment " action="> Create New Assignment" dropDown={true}/>
            <Container>
                <Aside active="manageAssignment"/>
                <CreateNewAssignmentMain/>
            </Container>
        </>
    )
}

export default CreateNewAssignment;