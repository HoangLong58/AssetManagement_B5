import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import ManageUserMain from "../components/ManageUser/ManageUserMain";

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const ManageUser = () => {
    return (
        <>
            <Navbar pageName="Manage User" dropDown={true}/>
            <Container>
                <Aside active="manageUser"/>
                <ManageUserMain/>
            </Container>
        </>
    )
}

export default ManageUser;