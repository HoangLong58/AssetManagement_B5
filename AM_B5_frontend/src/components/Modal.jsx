import styled from "styled-components";
import {CloseOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {useEffect, useRef, useState} from "react";
import "../css/main.css";
import {useNavigate} from "react-router-dom";
import LoginService from "../service/LoginService";
import axios from "axios";
import {AXIOS_API_URL} from "../constants/Axios";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;


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

const Button = styled.div`
    margin-top: 10px;
    margin-right: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
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

const H2 = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.8rem;
  color: var(--color-primary);
  border-bottom: 2px solid #333;
  width: 100%;
  height: 60px;
  margin: 0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #eff1f5;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px 20px 10px 90px;
`

const Input = styled.input`
    width: 220px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 40px 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`

const Label = styled.label`
display: flex;
width: 100%;
justify-content: space-between;
    font-size: 1.2rem;
    position: relative;
`

const Title = styled.div`
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Eye = styled.div`
    cursor: pointer;
    position: absolute;
    left: 333px;
    top: 13px;
    display: flex;
    z-index: 10;
`

const Error = styled.span`
    font-size: 1.1rem;
    color: red;
`

const Modal = ({showModal, setShowModal, type}) => {
    const [newPassword, setNewPassword] = useState("");
    const [isChangePasswordSuccess, setIsChangePasswordSuccess] = useState(false);
    const [error, setError] = useState();
    let navigate = useNavigate();

    const [isFirstLoginSuccess, setIsFirstLoginSuccess] = useState(false);
    const handleCloseFirstLogin = () => {
        setIsFirstLoginSuccess(false);
        setShowModal(prev => !prev);
    }

    const [firstLoginPasswordType, setFirstLoginPasswordType] = useState("password");
    const togglePasswordFirstLogin = () => {
        if (firstLoginPasswordType === "password") {
            setFirstLoginPasswordType("text")
            return;
        }
        setFirstLoginPasswordType("password")
    }

    const [errorFirst, setErrorFirst] = useState('');
    const userinfo = JSON.parse(localStorage.getItem("user_info"));
    const changePasswordFirstLogin = (username, newPassword) => {
        LoginService.changePasswordFirstLogin(username, newPassword)
            .then((res) => {
                const userinfo = JSON.parse(localStorage.getItem("user_info"));
                localStorage.removeItem("user_info");
                userinfo.state = "ACTIVE";
                localStorage.setItem("user_info", JSON.stringify(userinfo));
                setIsFirstLoginSuccess(true);
            })
            .catch((errors) => {
                if (errors) {
                    setErrorFirst(errors.response.data.message);
                }
            });
    };

    const handleFirstLogin = (username, newPassword) => {
        changePasswordFirstLogin(username, newPassword);
    };

    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }


    const handleLogout = () => {
        localStorage.removeItem("user_info");
        localStorage.removeItem("accessToken");
        navigate("../login", {replace: true});
    }

    const userInfo = JSON.parse(localStorage.getItem('user_info'));

    const [messageChangePass, setMessageChangePass] = useState('');
    const [staffCode, setStaffCode] = useState('');
    const [password, setPassword] = useState();
    const [newPass, setNewPass] = useState();

    const [oldPasswordType, setOldPasswordType] = useState("password");
    const togglePasswordOld = () => {
        if (oldPasswordType === "password") {
            setOldPasswordType("text")
            return;
        }
        setOldPasswordType("password")
    }

    const [newPasswordType, setNewPasswordType] = useState("password");
    const togglePasswordNew = () => {
        if (newPasswordType === "password") {
            setNewPasswordType("text")
            return;
        }
        setNewPasswordType("password")
    }

    let url = AXIOS_API_URL + "/users/api/password";
    const handleChangePassword = (e) => {
        axios
            .put(url, {staffCode: staffCode, password: password, newPassword: newPass}, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            })
            .then((response) => {
                setIsChangePasswordSuccess((prev) => !prev);
            })
            .catch((error) => {
                setMessageChangePass(error.response.data.message);
            });
    };

    const handleCloseSuccess = () => {
        setIsChangePasswordSuccess(false);
        setShowModal(prev => !prev);
        localStorage.removeItem("user_info");
        navigate("../login", {replace: true});
    }

    useEffect(() => {
        if (userInfo != null) {
            setStaffCode(JSON.parse(localStorage.getItem('user_info')).id);
        }
    }, [localStorage.getItem('user_info')])

    const isChangePasswordNotEmpty = () => {
        if (password && newPass) {
            return true;
        }
        return false;
    };

    if (type === 'changePassword') {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef}>
                        <ModalWrapper showModal={showModal}>
                            <H2>Change password</H2>
                            {isChangePasswordSuccess ? (
                                <ModalContent>
                                    <p>Your password has been changed successfully!</p>
                                    <Button>
                                        <ButtonContainer>
                                            <ButtonClick id="close_ChangePassword"
                                                         onClick={() => handleCloseSuccess()}>Close</ButtonClick>
                                        </ButtonContainer>
                                    </Button>
                                </ModalContent>
                            ) : (
                                <>
                                    <ModalContent>
                                        <Form>
                                            <Label>
                                                <Title>Old password</Title>
                                                <Input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    id="oldPassword"
                                                    name="password"
                                                    type={oldPasswordType}
                                                    className="borderDanger"
                                                />
                                                {
                                                    oldPasswordType === "password" ?
                                                        <Eye onClick={() => togglePasswordOld()}>
                                                            <VisibilityOutlined/>
                                                        </Eye>
                                                        :
                                                        <Eye onClick={() => togglePasswordOld()}>
                                                            <VisibilityOffOutlined/>
                                                        </Eye>
                                                }
                                            </Label>

                                            <Label>
                                                <Title>New password</Title>
                                                <Input
                                                    onChange={(e) => setNewPass(e.target.value)}
                                                    id="newPassword"
                                                    name="newPassword"
                                                    type={newPasswordType}
                                                    className="borderPrimary"
                                                />
                                                {
                                                    newPasswordType === "password" ?
                                                        <Eye onClick={() => togglePasswordNew()}>
                                                            <VisibilityOutlined/>
                                                        </Eye>
                                                        :
                                                        <Eye onClick={() => togglePasswordNew()}>
                                                            <VisibilityOffOutlined/>
                                                        </Eye>
                                                }
                                            </Label>
                                            <Error>{messageChangePass}</Error>
                                        </Form>
                                        <Button>
                                            <ButtonContainer>
                                                <button
                                                    id="saveBtn_ChangePassword"
                                                    type="button"
                                                    className={
                                                        'btn btn-login btn-danger' +
                                                        ' btn-lg ' +
                                                        (isChangePasswordNotEmpty() ? '' : 'disabled')
                                                    }
                                                    onClick={(e) => handleChangePassword(e)}
                                                    style={{fontSize: "1rem"}}
                                                >
                                                    Save
                                                </button>
                                            </ButtonContainer>
                                            <ButtonContainer>
                                                <ButtonClick id="cancel_ChangePassword"
                                                             onClick={() => setShowModal((prev) => !prev)}>
                                                    Cancel
                                                </ButtonClick>
                                            </ButtonContainer>
                                        </Button>
                                    </ModalContent>
                                    <CloseModalButton aria-label="Close modal"
                                                      onClick={() => setShowModal((prev) => !prev)}>
                                        <CloseOutlined/>
                                    </CloseModalButton>
                                </>
                            )}
                        </ModalWrapper>
                    </Background>
                ) : ""}
            </>
        );
    }
    if (type === "logout") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "350px"}}>
                            <H2>Are you sure?</H2>

                            <ModalContent>
                                <p>Do you want to log out?</p>
                                <Button style={{justifyContent: "center", margin: "10px 0px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnConfirmLogout"
                                            onClick={() => handleLogout()}
                                            className="active"
                                        >Log out</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelLogout"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

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

    if (type === "firstLogin") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef}>
                        <ModalWrapper showModal={showModal}>
                            <H2>Change password</H2>

                            {isFirstLoginSuccess ? (
                                <ModalContent>
                                    <p>Your password has been changed successfully!</p>
                                    <Button>
                                        <ButtonContainer>
                                            <ButtonClick onClick={() => handleCloseFirstLogin()}>Close</ButtonClick>
                                        </ButtonContainer>
                                    </Button>
                                </ModalContent>
                            ) : (
                                <>
                                    <p style={{padding: "30px 30px 0px 40px", color: "#333"}}
                                       className="text-break fs-6  m-3">This is the first time you logged in.
                                        <br/>
                                        You have to change your password to continue.</p>


                                    <ModalContent>
                                        <Form>
                                            <Label>
                                                <Title>New password</Title>
                                                <Input id="newPassword" type={firstLoginPasswordType}
                                                       className="borderPrimary"
                                                       onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                                {
                                                    firstLoginPasswordType === "password" ?
                                                        <Eye onClick={() => togglePasswordFirstLogin()}>
                                                            <VisibilityOutlined/>
                                                        </Eye>
                                                        :
                                                        <Eye onClick={() => togglePasswordFirstLogin()}>
                                                            <VisibilityOffOutlined/>
                                                        </Eye>
                                                }
                                            </Label>
                                            {errorFirst && <Error id="messageNewPassword">{errorFirst}</Error>}
                                        </Form>

                                        <Button>
                                            <ButtonContainer>
                                                <ButtonClick id="btnSaveNewPassword"
                                                             className="active"
                                                             onClick={() => handleFirstLogin(userinfo.username, newPassword)}
                                                >Save</ButtonClick>
                                            </ButtonContainer>
                                        </Button>
                                    </ModalContent>
                                </>
                            )}
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