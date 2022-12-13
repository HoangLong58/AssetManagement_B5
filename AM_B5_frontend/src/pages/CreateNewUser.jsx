import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import CreateNewUserMain from "../components/ManageUser/CreateNewUserMain";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 18rem auto;
`

const CreateNewUser = () => {
    return (
        <>
            <Navbar pageName="Manage User " action="> Create New User" dropDown={true}/>
            <Container>
                <Aside active="manageUser"/>
                <CreateNewUserMain/>
            </Container>
        </>
    )
}

export default CreateNewUser;