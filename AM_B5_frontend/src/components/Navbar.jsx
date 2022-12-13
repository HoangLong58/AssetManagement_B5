import React, {useState} from "react";
import {ArrowDropDownOutlined} from '@mui/icons-material';
import styled from 'styled-components';
import Modal from './Modal';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: var(--color-primary);
    padding: 12px 0px;
`

const NavbarLeft = styled.h3`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-width: 200px;
    height: 50px;
    color: var(--color-white);
    font-size: 1.3rem;
    padding-left: 30px;
`

const NavbarRight = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 50px;
    color: var(--color-white);
    font-size: 1.2rem;
    position: relative;
    &::after {
        content: "";
        position: absolute;
        width: 200px;
        height: 10px;
        top: 50px;
        right: 30px;

    }
`

const Username = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const OptionList = styled.div`
    position: absolute;
    top: calc(100% + 7px);
    right: 30px;
    background-color: white;
    width: 200px;
    height: 120px;
    border-radius: 2px;
    box-shadow: 0 1px 3.125rem 0 rgba(0, 0, 0, 0.2);
    animation: fadeIn ease-in 0.2s;
    cursor: default;
    display: none;
    z-index: 10;
    ${NavbarRight}:hover &{
        display: block;
    }
    &::after {
        content: "";
        position: absolute;
        cursor: pointer;
        right: 15px;
        top: -30px;
        border-width: 16px 20px;
        border-style: solid;
        border-color: transparent transparent white transparent;
    }
`

const UlItem = styled.ul`
    padding-left: 0;
    list-style: none;
`;
const LiItem = styled.li`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    margin: 20px 0px;
    color: #333;
    padding-left: 20px;
    cursor: pointer;
    &:hover {
        background-color: var(--color-primary);
        color: white;
    }
`

const ItemInfo = styled.div`
    width: 100%;
    margin-right: 12px;
`;

const Img = styled.img`
    width: 3rem;
    height: 3rem;
    margin-right: 20px;
`;
const SelectIcon = styled.div`
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Name = styled.div`
    font-size: 1.2rem;
`;

const Navbar = (props) => {

    const handleClickChangePassword = () => {
        openModal({type: "changePassword"});
    }

    const handleClickLogout = () => {
        openModal({type: "logout"});
    }

    const userinfo = JSON.parse(localStorage.getItem('user_info'));

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
    }

    return (
        <Container>
            {
                props.pageName ?
                    <NavbarLeft
                        id="navbar_left">{props.action ? props.pageName + props.action : props.pageName}</NavbarLeft>
                    :
                    <NavbarLeft id="navbar_left">
                        <Img
                            src="https://itviec.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMXgzRXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--9747b4e82941b47df75157048a404fc195fd1a40/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oSnlaWE5wZW1WZmRHOWZabWwwV3dkcEFhb3ciLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--a364054a300021d6ece7f71365132a9777e89a21/logo.jpg"/>
                        Online Asset Management
                    </NavbarLeft>
            }
            {props.dropDown ? (
                <NavbarRight id="navbar_right">
                    <Username id="username_id">
                        <Name id="name_id">{userinfo ? (userinfo.username) : ('')}</Name>
                        <SelectIcon>
                            <ArrowDropDownOutlined/>
                        </SelectIcon>
                    </Username>
                    <OptionList>
                        <UlItem>
                            <LiItem id="btnChangePassword" onClick={() => handleClickChangePassword()}>
                                <ItemInfo>
                                    Change password
                                </ItemInfo>
                            </LiItem>
                            <LiItem id="btnLogout" onClick={() => handleClickLogout()}>
                                <ItemInfo>
                                    Logout
                                </ItemInfo>
                            </LiItem>
                        </UlItem>
                    </OptionList>
                </NavbarRight>
            ) : ('')}

            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                type={typeModal}
            />
        </Container>
    )
}

export default Navbar