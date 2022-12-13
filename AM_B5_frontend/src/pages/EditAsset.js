import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import EditAssetMain from '../components/ManageAsset/EditAssetMain';
import {useLocation} from 'react-router-dom';

const Container = styled.div`
display: grid;
width: 96%;
margin: auto;
gap: 1.8rem;
grid-template-columns: 18rem auto;
`
const EditAsset = () => {
    const location = useLocation();
    return (
        <>
            <Navbar pageName="Manage Asset " action="> Edit Asset" dropDown={true}/>
            <Container>
                <Aside active="manageAsset"/>
                <EditAssetMain data={location.state}/>
            </Container>
        </>
    )
}

export default EditAsset