import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import RequestForReturningMain from "../components/RequestForReturning/RequestForReturningMain";

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const RequestForReturning = () => {
    return (
        <>
            <Navbar pageName="Request for Returning" dropDown={true}/>
            <Container>
                <Aside active="requestForReturning"/>
                <RequestForReturningMain/>
            </Container>
        </>
    )
}

export default RequestForReturning;