import styled from "styled-components";
import {CloseOutlined} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import "../../css/main.css";
import assignmentService from "../../service/AssignmentService";
import {AXIOS_API_URL} from "../../constants/Axios";
import axios from "axios";


const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;

    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    animation: fadeIn linear 0.1s;
`

const ModalWrapper = styled.div`
    width: 33%;
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
const ModalWrapperDateChange = styled.div`
    width: auto;
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
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;


    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`

const ModalContentDateChange = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;


    p {
        font-size: 1.2rem;
        margin: 20px 20px 0px 20px;
    }
`
const ModalContentDelete = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    line-height: 1.8;
    color: #141414;
    padding-left: 50px;
    p {
        font-size: 1.2rem;
        margin-bottom: 10px;
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
    margin-bottom: 0.8rem;
    color: var(--color-primary);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 2px solid #333;
    width: 100%;
    height: 80px;
    padding-left: 50px;
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
const ButtonContainer = styled.div`
    position: relative;
    float: right;
    margin: 0 22px 22px 0;
`

const Modal = ({showModal, setShowModal, type, assignment, setIsReloadPage, showToastFromOut}) => {
    const [isFull, setIsFull] = useState(true);
    const [isFullSpecification, setIsFullSpecification] = useState(true);
    const [isFullAssetName, setIsFullAssetName] = useState(true);

    function handleDeleteAssignment() {
        assignmentService.deleteAssignment(assignment.assignedTo, assignment.assetCode, assignment.assignedDate)
            .then(res => {
                setShowModal(false);

                var savedAssignment = {}
                savedAssignment = JSON.parse(localStorage.getItem('savedAssignment'));
                if (savedAssignment) {
                    localStorage.removeItem('savedAssignment')
                }

                const dataToast = {message: "Deleted assignment successfully!", type: "success"};
                showToastFromOut(dataToast);
                setIsReloadPage(prev => !prev);
            })
            .catch(errors => {
            })
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

    const handleCreateReturningRequestAdmin = async () => {
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
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal}>
                            <H2>Detailed Assignment Information</H2>
                            <ModalContent>
                                <DetailTitle>
                                    <DetailTitleItem>Asset Code</DetailTitleItem>
                                    <DetailTitleItem>Asset Name</DetailTitleItem>
                                    <DetailTitleItem>Specification</DetailTitleItem>
                                    <DetailTitleItem>Assigned to</DetailTitleItem>
                                    <DetailTitleItem>Assigned by</DetailTitleItem>
                                    <DetailTitleItem>Assigned Date</DetailTitleItem>
                                    <DetailTitleItem>State</DetailTitleItem>
                                    <DetailTitleItem>Note</DetailTitleItem>
                                </DetailTitle>
                                <DetailContent>
                                    <DetailContentItem
                                        id="detailUser_assetCode">{assignment ? assignment.assetCode : ""}</DetailContentItem>
                                    {/* <DetailContentItem id="detailUser_assetName">{assignment ? assignment.assetName : ""}</DetailContentItem> */}
                                    <DetailContentItem id="detailUser_assetName"
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
                                    <DetailContentItem id="detailUser_specification"
                                                       onMouseEnter={() => setIsFullSpecification(false)}
                                                       onMouseLeave={() => setIsFullSpecification(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {assignment.specification.length >= 20 ? (assignment.specification.substring(0, 20) + '...') : assignment.specification}
                                        {
                                            assignment.specification.length >= 20 ?
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
                                                    {assignment.specification}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_assignedTo">{assignment ? assignment.assignedTo : ""}</DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_assignedBy">{assignment ? assignment.assignedBy : ""}</DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_assignedDate">{assignment ? assignment.assignedDate : ""}</DetailContentItem>
                                    <DetailContentItem
                                        id="detailUser_state">{assignment ? assignment.state : ""}</DetailContentItem>
                                    <DetailContentItem id="detailUser_note"
                                                       onMouseEnter={() => setIsFull(false)}
                                                       onMouseLeave={() => setIsFull(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {assignment.note.length >= 20 ? (assignment.note.substring(0, 20) + '...') : assignment.note}
                                        {
                                            assignment.note.length >= 20 ?
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
                                                    {assignment.note}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
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
    } else if (type === "assignedDateChanged") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapperDateChange showModal={showModal}>
                            <H2>Assigned Date Changed</H2>
                            <ModalContentDateChange>

                                <DetailContentItem id="detail-assigned-date-changed">Assigned Date has been changed due
                                    to the change of user's joinedDate or asset's installedDate</DetailContentItem>

                            </ModalContentDateChange>
                            <CloseModalButton
                                aria-label="Close modal"
                                onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapperDateChange>
                    </Background>
                ) : ""}
            </>
        );
    } else if (type === "confirmDeleteAssignment") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "33%"}}>
                            <H2>Are you sure?</H2>

                            <ModalContentDelete>
                                <p>Do you want to delete this assignment?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnDeleteAssignment"
                                            className="active"
                                            onClick={() => handleDeleteAssignment()}
                                        >Delete</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelDeleteAssignment"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContentDelete>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmDeleteAssignment"
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
    if (type === "returningRequestAdmin") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "600px"}}>
                            <H2>Are you sure?</H2>

                            <ModalContent style={{flexDirection: "column"}}>
                                <p>Do you want to create a returning request for this <br/> asset?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnConfirmReturningRequestAdmin"
                                            className="active"
                                            onClick={() => handleCreateReturningRequestAdmin()}
                                        >Yes</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelReturningRequestAdmin"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >No</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmReturningRequestAdmin"
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