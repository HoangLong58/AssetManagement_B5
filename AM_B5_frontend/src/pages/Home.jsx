import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Aside from "../components/Aside";
import Navbar from "../components/Navbar";
import HomeMain from "../components/Home/HomeMain";
import Modal from "../components/Modal";


const Container = styled.div`
    display: grid;
    width: 96%;
    margin: auto;
    gap: 1.8rem;
    grid-template-columns: 20rem auto;
`

const Home = () => {
    const userinfo = JSON.parse(localStorage.getItem('user_info'));

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [isUser, setIsUser] = useState(true);
    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
    }

    useEffect(() => {
        if (userinfo !== null) {
            if (userinfo.roles[0] === "ROLE_ADMIN") {
                setIsUser(false)
            }
            if (userinfo.state === 'INIT') {
                openModal({type: "firstLogin"});
            }
        }

    }, []);


    const [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
        if (window.localStorage.getItem('user_info') === null) {
            setIsLogin(false)
        }
    }, [])

    return (
        <>
            <Navbar pageName="Home" dropDown={true}/>
            <Container>
                <Aside active="home" isUser={isUser}/>
                <HomeMain/>
            </Container>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                type={typeModal}
            />
        </>
    )
}

export default Home;