import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Report from '../components/ManageAsset/Report';
import Navbar from "../components/Navbar";

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const ReportPage = () => {
    return (
        <>
            <Navbar pageName="Asset Report" dropDown={true}/>
            <Container>
                <Aside active="report"/>
                <Report/>
            </Container>
        </>
    )
}

export default ReportPage