import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import ManageAssignmentMain from "../components/ManageAssignment/ManageAssignmentMain";

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const ManageAssignment = () => {
    return (
        <>
            <Navbar pageName="Manage Assignment" dropDown={true}/>
            <Container>
                <Aside active="manageAssignment"/>
                <ManageAssignmentMain/>
            </Container>
        </>
    )
}

export default ManageAssignment;