import styled from "styled-components";
import {CloseOutlined} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import "../../css/main.css";
import StringFormatter from "../../service/StringFormatter";
import axios from "axios";
import DateFormatterService from "../../service/DateFormatterService";
import {AXIOS_API_URL} from "../../constants/Axios";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    animation: fadeIn linear 0.1s;
`

const ModalWrapper = styled.div`
    width: 500px;
    height: auto;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: var(--color-white);
    color: var(--color-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    --growth-from: 0.7;
    --growth-to: 1;
    animation: growth linear 0.1s;
        border: 2px solid #333;
`

const ModalContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;


    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const ModalDisableContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0;
    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const CloseModalButton = styled.span`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`

const H2 = styled.h2`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.8rem;
    color: var(--color-primary);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 2px solid #333;
    width: 100%;
    height: 80px;
    margin: 0;
    background-color: #eff1f5;
`

const DetailTitle = styled.div`
`

const DetailTitleItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`
const DetailContent = styled.div`
margin-left: 50px;
`

const DetailContentItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`

const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 0 22px 22px 0;
`

const ButtonClick = styled.button`
    min-width: 80px;
    padding: 10px;
    border: 2px solid #868e95;
    background-color: #fff;
    color: #868e95;
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    &.active {
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary);
        color: #fff;
    }
 
`
const Button = styled.div`
    margin-top: 10px;
    margin-right: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
`


const Modal = ({showModal, setShowModal, type, user, setIsReload}) => {
    let staffCode = ''
    let fullName = ''
    let userName = ''
    let dob = ''
    let location = ''
    let joinedDate = new Date()
    let role = ''
    let gender = ''
    if (user) {
        staffCode = user.staffCode
        fullName = user.firstName + ' ' + user.lastName
        userName = user.username
        dob = user.birthDate
        location = user.locationCode
        joinedDate = user.joinedDate
        role = user.roleName
        gender = user.gender
    }

    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(
        (e) => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const handleDisableUser = () => {
        if (user) {
            let url = AXIOS_API_URL + "/admin/api/users/" + user.staffCode;
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            axios
                .delete(url, {
                    headers: {
                        'Authorization': `Bearer ${userInfo.token}`
                    }
                })
                .then((response) => {
                    setIsReload(prev => !prev)
                    setShowModal(false);

                    var savedUser = {}
                    savedUser = JSON.parse(localStorage.getItem('savedUser'));
                    if (savedUser) {
                        localStorage.removeItem('savedUser')
                    }

                })
        }
    }
    const [isFull, setIsFull] = useState(true);
    const [isFullUserName, setIsFullUserName] = useState(true);

    if (type === "detailUser") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} id='detailUser-wrapper'>
                            <H2>Detailed User Information</H2>
                            <ModalContent>
                                <DetailTitle>
                                    <DetailTitleItem>Staff Code</DetailTitleItem>
                                    <DetailTitleItem>Full Name</DetailTitleItem>
                                    <DetailTitleItem>Username</DetailTitleItem>
                                    <DetailTitleItem>Date of Birth</DetailTitleItem>
                                    <DetailTitleItem>Gender</DetailTitleItem>
                                    <DetailTitleItem>Joined Date</DetailTitleItem>
                                    <DetailTitleItem>Type</DetailTitleItem>
                                    <DetailTitleItem>Location</DetailTitleItem>
                                </DetailTitle>
                                <DetailContent>
                                    <DetailContentItem id="detailUser_staffCode">{staffCode}</DetailContentItem>
                                    <DetailContentItem id="detailUser_fullName"
                                                       onMouseEnter={() => setIsFull(false)}
                                                       onMouseLeave={() => setIsFull(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {fullName.length >= 20 ? (fullName.substring(0, 20) + '...') : fullName}
                                        {
                                            fullName.length >= 20 ?
                                                <div style={{
                                                    display: isFull ? "none" : "block"
                                                    ,
                                                    position: "absolute",
                                                    width: '15rem',
                                                    backgroundColor: '#f5f5f5'
                                                    ,
                                                    wordWrap: "break-word",
                                                    height: 'auto',
                                                    zIndex: "10"
                                                    ,
                                                    border: "1px solid #333",
                                                    paddingLeft: "20px",
                                                    borderRadius: "10px"
                                                }}>
                                                    {fullName}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem id="detailUser_userName"
                                                       onMouseEnter={() => setIsFullUserName(false)}
                                                       onMouseLeave={() => setIsFullUserName(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {userName.length >= 20 ? userName.substring(0, 20) + '...' : userName}
                                        {
                                            userName.length >= 20 ?
                                                <div style={{
                                                    display: isFullUserName ? "none" : "block"
                                                    ,
                                                    position: "absolute",
                                                    width: '15rem',
                                                    backgroundColor: '#f5f5f5'
                                                    ,
                                                    wordWrap: "break-word",
                                                    height: 'auto'
                                                    ,
                                                    border: "1px solid #333",
                                                    paddingLeft: "20px",
                                                    borderRadius: "10px"
                                                }}>
                                                    {userName}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_birthDate">{DateFormatterService.dateFormat(dob)}</DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_gender">{gender ? 'Male' : 'Female'}</DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_joinedDate">{DateFormatterService.dateFormat(joinedDate)}</DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_type">{StringFormatter.capitalizeFirstLetter(role)}</DetailContentItem>
                                    <DetailContentItem id="detailUser_location">{location}</DetailContentItem>

                                </DetailContent>
                            </ModalContent>
                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    if (type === "confirmDisableUser") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} id="back_ground_disable_user">
                        <ModalWrapper showModal={showModal} id="modal_wrapper">
                            <H2>Are you sure?</H2>

                            <ModalDisableContent id="modal_disable_content">
                                <p>Do you want to disable this user?</p>
                                <Button id="button">
                                    <ButtonContainer id="button_container_disable">
                                        <ButtonClick
                                            id="btn_disable"
                                            className="active"
                                            onClick={() => handleDisableUser()}
                                        >Disable</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer id="button_container_cancel">
                                        <ButtonClick
                                            id="btn_cancel"
                                            onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalDisableContent>

                            <CloseModalButton
                                id="close_modal_button"
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }
    if (type === "canNotDisableUser") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} id="background_can_not">
                        <ModalWrapper showModal={showModal} id="modalwrapper_can_not">
                            <H2>Can not disable user</H2>

                            <ModalDisableContent id="modal_disable_content_can_not">
                                <p>There are valid assignments belonging to this user.</p>
                                <p style={{margin: "10px 0 20px 0"}}>Please close all assignments before disabling
                                    user.</p>
                            </ModalDisableContent>

                            <CloseModalButton
                                id="close_modal_can_not"
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    } else {
        return (
            <></>
        );
    }
};

export default Modal;