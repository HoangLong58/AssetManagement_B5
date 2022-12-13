import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import ManageAssetMain from "../components/ManageAsset/ManageAssetMain";

const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const ManageAsset = () => {
    return (
        <>
            <Navbar pageName="Manage Asset" dropDown={true}/>
            <Container>
                <Aside active="manageAsset"/>
                <ManageAssetMain/>
            </Container>
        </>
    )
}

export default ManageAsset;