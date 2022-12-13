import styled from "styled-components";
import {useCallback, useEffect, useRef} from "react";
import "../../css/main.css";
import ReturningRequestResponseService from "../../service/ReturningRequestResponseService";
import {CloseOutlined} from "@mui/icons-material";
import RequestReturningService from "../../service/RequestReturningService";


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

const Modal = ({showModal, setShowModal, type, requestPayload, setIsReloadPage, returningId, showToastFromOut}) => {
    function handleCompleteREquest() {
        ReturningRequestResponseService.completeRequest(requestPayload)
            .then(res => {
                setShowModal(false);
                const dataToast = {message: "Success updated !", type: "success"};
                showToastFromOut(dataToast);
                setIsReloadPage(prev => !prev);
            })
            .catch(errors => {
            })
    }

    function handleRequestReturning() {
        RequestReturningService.cancelRequestReturning(returningId)
            .then(res => {
                if (res.status === 200) {
                    const dataToast = {message: "Cancel request returning successfully!", type: "success"};
                    showToastFromOut(dataToast);
                    setShowModal(false);
                    setIsReloadPage(prev => !prev);
                }
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

    if (type === "confirmComplete") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "33%"}}>
                            <H2>Are you sure?</H2>

                            <ModalContentDelete>
                                <p>Do you want to make this returning request as 'Completed'?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnCompleteRequest"
                                            className="active"
                                            onClick={() => handleCompleteREquest()}
                                        >Yes</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="btnCancelRequest"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >No</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContentDelete>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmLogout"
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
    if (type === "cancelRequestReturning") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "33%"}}>
                            <H2>Are you sure?</H2>

                            <ModalContentDelete>
                                <p>Do you want to cancel this returning request?</p>
                                <Button style={{margin: "20px 10px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnYesCancelReturn"
                                            className="active"
                                            onClick={() => handleRequestReturning()}
                                        >Yes</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="btnNoCancelReturn"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >No</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContentDelete>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmCancelRequest"
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
}


export default Modal;