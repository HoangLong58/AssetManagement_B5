import React from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import CreateNewAssetMain from "../components/ManageAsset/CreateNewAssetMain";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 18rem auto;
`

const CreateNewAsset = () => {
    return (
        <>
            <Navbar pageName="Manage Asset " action="> Create New Asset" dropDown={true}/>
            <Container>
                <Aside active="manageAsset"/>
                <CreateNewAssetMain/>
            </Container>
        </>
    )
}

export default CreateNewAsset;