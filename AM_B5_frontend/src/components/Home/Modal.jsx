import styled from "styled-components";
import {CloseOutlined} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import "../../css/main.css";
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
    width: 900px;
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;

    p {
        font-size: 1.2rem;
        margin: 20px 0px 0px 0px;
    }
`
const ModalAssignmentContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;

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
    justify-content: flex-start;
    padding-left: 75px;
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
display: block;
padding-bottom: 50px;
`

const DetailTitleItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`
const DetailContent = styled.div`
display: block;
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
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
`

const Modal = ({showModal, setShowModal, type, assignment, setIsReloadPage, showToastFromOut}) => {
    const [isFullAssetName, setIsFullAssetName] = useState(true);
    const [isFullSpecification, setIsFullSpecification] = useState(true);
    const [isFullNote, setIsFullNote] = useState(true);

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

    const handleRespondAccept = async () => {
        const res = await axios.put(`${AXIOS_API_URL}/users/api/assignments/state`,
            {
                assignedTo: assignment.assignedTo,
                assetCode: assignment.assetCode,
                assignedDate: assignment.assignedDate,
                state: "Accepted"
            },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
                }
            }).then((res) => {
            setIsReloadPage(prev => !prev);
            setShowModal(prev => !prev);
        });
    }

    const handleRespondDecline = async () => {
        const res = await axios.put(`${AXIOS_API_URL}/users/api/assignments/state`,
            {
                assignedTo: assignment.assignedTo,
                assetCode: assignment.assetCode,
                assignedDate: assignment.assignedDate,
                state: "Declined"
            },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
                }
            }).then((res) => {
            setIsReloadPage(prev => !prev);
            setShowModal(prev => !prev);
        });
    }

    const handleCreateReturningRequest = async () => {
        const res = await axios.post(`${AXIOS_API_URL}/users/api/requests`,
            {
                assignedTo: assignment.assignedTo,
                assetCode: assignment.assetCode,
                assignedDate: assignment.assignedDate
            },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
                }
            }).then((res) => {
            const dataToast = {message: "Create returning request successfully!", type: "success"};
            showToastFromOut(dataToast);
            setIsReloadPage(prev => !prev);
            setShowModal(prev => !prev);
        }).catch((err) => {
            const dataToast = {message: err.response.data.message, type: "danger"};
            showToastFromOut(dataToast);
        });
    }

    if (type === "detailAssignment") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} id="back_ground">
                        <ModalWrapper showModal={showModal} id="modal-assignment-wrapper">
                            <H2>Detailed Assignment Information</H2>
                            <ModalAssignmentContent id="modal-assignment-content">
                                <DetailTitle>
                                    <DetailTitleItem>Asset Code</DetailTitleItem>
                                    <DetailTitleItem>Asset Name</DetailTitleItem>
                                    <DetailTitleItem>Specification</DetailTitleItem>
                                    <DetailTitleItem>Assigned to</DetailTitleItem>
                                    <DetailTitleItem>Assigned by </DetailTitleItem>
                                    <DetailTitleItem>Assigned Date</DetailTitleItem>
                                    <DetailTitleItem>State</DetailTitleItem>
                                    <DetailTitleItem>Note</DetailTitleItem>
                                </DetailTitle>
                                <DetailContent id="detail-assignment-content">
                                    <DetailContentItem
                                        id={'code-' + assignment.assetCode}>{assignment.assetCode ? assignment.assetCode : 'empty'}</DetailContentItem>
                                    <DetailContentItem id={'name-' + assignment.assetName}
                                                       onMouseEnter={() => setIsFullAssetName(false)}
                                                       onMouseLeave={() => setIsFullAssetName(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {assignment.assetName.length >= 20 ? (assignment.assetName.substring(0, 20) + '...') : assignment.assetName}
                                        {
                                            assignment.assetName.length >= 20 ?
                                                <div style={{
                                                    display: isFullAssetName ? "none" : "block"
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
                                                    {assignment.assetName}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem id={'spec-' + assignment.specification}
                                                       onMouseEnter={() => setIsFullSpecification(false)}
                                                       onMouseLeave={() => setIsFullSpecification(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {assignment.assetSpecification.length >= 20 ? (assignment.assetSpecification.substring(0, 20) + '...') : assignment.assetSpecification}
                                        {
                                            assignment.assetSpecification.length >= 20 ?
                                                <div style={{
                                                    display: isFullSpecification ? "none" : "block"
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
                                                    {assignment.assetSpecification}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem
                                        id={'to-' + assignment.assignedTo}>{assignment.assignedTo ? assignment.assignedTo : 'empty'}</DetailContentItem>
                                    <DetailContentItem
                                        id={'by-' + assignment.assignedBy}>{assignment.assignedBy ? assignment.assignedBy : 'empty'}</DetailContentItem>
                                    <DetailContentItem
                                        id={'date-' + assignment.assignedDate}>{assignment.assignedDate ? DateFormatterService.dateFormat(assignment.assignedDate) : 'empty'}</DetailContentItem>
                                    <DetailContentItem
                                        id={'state-' + assignment.state}>{assignment.state ? assignment.state : 'empty'}</DetailContentItem>
                                    <DetailContentItem id={'note-' + assignment.note}
                                                       onMouseEnter={() => setIsFullNote(false)}
                                                       onMouseLeave={() => setIsFullNote(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {assignment.note.length >= 20 ? (assignment.note.substring(0, 20) + '...') : assignment.note}
                                        {
                                            assignment.note.length >= 20 ?
                                                <div style={{
                                                    display: isFullNote ? "none" : "block"
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
                                                    {assignment.note}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                </DetailContent>
                            </ModalAssignmentContent>
                            <CloseModalButton id="close_modal_button"
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
    if (type === "respondAccept") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "33%"}}>
                            <H2>Are you sure?</H2>

                            <ModalContent>
                                <p>Do you want to accept this assignment?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnConfirmRespondAccept"
                                            className="active"
                                            onClick={() => handleRespondAccept()}
                                        >Accept</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelRespondAccept"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmRespondAccept"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );
    }
    if (type === "respondDecline") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "33%"}}>
                            <H2>Are you sure?</H2>

                            <ModalContent>
                                <p>Do you want to decline this assignment?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnConfirmRespondDecline"
                                            className="active"
                                            onClick={() => handleRespondDecline()}
                                        >Decline</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelRespondDecline"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmRespondDecline"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );
    }
    if (type === "returningRequest") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "600px"}}>
                            <H2>Are you sure?</H2>

                            <ModalContent>
                                <p>Do you want to create a returning request for this <br/> asset?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnConfirmReturningRequest"
                                            className="active"
                                            onClick={() => handleCreateReturningRequest()}
                                        >Yes</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelReturningRequest"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >No</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmReturningRequest"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );
    } else {
        return (
            <></>
        );
    }
};

export default Modal;