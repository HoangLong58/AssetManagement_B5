import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import "../../css/main.css";
import axios from "axios";
import {AXIOS_API_URL} from "../../constants/Axios";
import StringFormatter from "../../service/StringFormatter"


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -150px;
`

const Title = styled.div`
    display: flex;
    width: 100%;
    margin-left: 60%;
`

const H2 = styled.h2`
    color: var(--color-primary);
    margin-bottom: 25px;
`

const Form = styled.div`
    display: flex;
    flex-direction: row;
`

const FormTitle = styled.div`


`
const FormTitleItem = styled.div`
    min-width: 100px;
    height: 50px;
    font-size: 1.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

`
const FormContent = styled.div`

`
const FormContentItem = styled.div`
font-size: 1.2rem;
height: auto;

display: flex;
justify-content: flex-start;
align-items: baseline;
flex-direction: column;
`

const FormContentItemCheckbox = styled.div`
    display: flex;
    width: 220px;
    height: 40px;
    margin: 5px 0px;
    padding: 0px 0px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    font-size: 1.2rem;
`


const Button = styled.div`
    margin-top: 30px;
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
    border: 2px solid #c0c3c7;
    background-color: #fff;
    color: #c0c3c7;
    cursor: pointer;
    font-weight: 500;
    border-radius: 5px;
    &.active {
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary);
        color: #fff;
    }
`


const InputText = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
    &:disabled {
        background-color: #eff1f5;
    }

`
const InputDate = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &::placeholder {
        letter-spacing: 2px;

        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`
const InputRadio = styled.input`
accent-color: red;
padding: 0px 10px;
`

const InputRadioSpan = styled.span`
    font-size: 1.1rem;
    padding: 0px 10px;
`

const Select = styled.select`
min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    border: 1px solid #333;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    } 
`

const Option = styled.option``

const Label = styled.label`
display: flex;
height: 100%;
justify-content: center;
align-items: center;
`

const Error = styled.span`
    margin-left: 20px;
    font-size: 1.1rem;
    color: red;
`

const EditUserMain = (props) => {
    const navigate = useNavigate();
    const [staffCode, setStaffCode] = useState(props.data.staffCode);
    const [firstName, setFirstName] = useState(props.data.firstName);
    const [lastName, setLastName] = useState(props.data.lastName);
    const [birthDate, setBirthDate] = useState(props.data.birthDate.split('T')[0]);
    const [joinedDate, setJoinedDate] = useState(props.data.joinedDate.split('T')[0]);
    const [locationNameAdmin, setLocationNameAdmin] = useState("");
    const [gender, setGender] = useState(props.data.gender);
    const [roleName, setRoleName] = useState(props.data.roleName);
    const [isChangeForm, setIsChangeForm] = useState(false);

    const [roles, setRoles] = useState([]);

    const [emptyError, setEmptyError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [joinedDateSaturdaySundayError, setJoinedDateSaturdaySundayError] = useState(false);
    const [joinedDateSoonError, setJoinedDateSoonError] = useState(false);

    useEffect(() => {
        const getLocationNameAdmin = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('user_info'));
                const staffCode = userInfo.id;
                const getLocationAdmin = await axios.get(`${AXIOS_API_URL}/admin/api/users/location/${staffCode}`
                    , {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}});
                setLocationNameAdmin(getLocationAdmin.data.name);
            } catch (err) {
            }
        }
        const getRoles = async () => {
            try {
                const getRoleFromDatabase = await axios.get(`${AXIOS_API_URL}/admin/api/roles`,
                    {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}})
                    .then((getRoleFromDatabase) => {
                        setRoles(getRoleFromDatabase.data);
                    })
            } catch (err) {
            }
        }
        getLocationNameAdmin();
        getRoles();
    }, [])

    useEffect(() => {
        if (!firstName || !lastName || !birthDate || !joinedDate || gender === null || !roleName) {
            setEmptyError(true);
            return;
        } else {
            setEmptyError(false);
        }
        if (getAge(birthDate) < 18) {
            setBirthDateError(true);
            return;
        } else {
            setBirthDateError(false);
        }
        if (getDay(joinedDate) == 6 || getDay(joinedDate) == 0) {
            setJoinedDateSaturdaySundayError(true);
            return;
        } else {
            setJoinedDateSaturdaySundayError(false);
        }
        if (joinedDate <= birthDate) {
            setJoinedDateSoonError(true);
            return;
        } else {
            setJoinedDateSoonError(false);
        }
    }, [isChangeForm])

    useEffect(() => {
        if (getAge(birthDate) < 18) {
            setBirthDateError(true);
            return;
        } else {
            setBirthDateError(false);
        }
    }, [isChangeForm, birthDate])

    useEffect(() => {
        if (getDay(joinedDate) == 6 || getDay(joinedDate) == 0) {
            setJoinedDateSaturdaySundayError(true);
            setJoinedDateSoonError(false);
            return;
        } else {
            setJoinedDateSaturdaySundayError(false);
        }
        if (birthDate > joinedDate) {
            setJoinedDateSoonError(true);
            setJoinedDateSaturdaySundayError(false);
            return;
        } else {
            setJoinedDateSoonError(false);
        }
    }, [isChangeForm, joinedDate])

    const handleChangeBirthDate = (e) => {
        setBirthDate(e.target.value);
    }

    const handleChangeJoinedDate = (e) => {
        setJoinedDate(e.target.value);
    }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getDay(dateString) {
        var joinedDate = new Date(dateString);
        var date = joinedDate.getDay();
        return date;
    }

    const handleEditUser = () => {
        if (!firstName || !lastName || !birthDate || !joinedDate || gender === null || !roleName) {
            setEmptyError(true);
            return;
        }
        if (getAge(birthDate) < 18) {
            setBirthDateError(true);
            return;
        }
        if (getDay(joinedDate) == 6 || getDay(joinedDate) == 0) {
            setJoinedDateSaturdaySundayError(true);
            return;
        }
        if (joinedDate <= birthDate) {
            setJoinedDateSoonError(true);
            return;
        }

        const createUserRes = axios.put(`${AXIOS_API_URL}/admin/api/users/${staffCode}`, {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            joinedDate: joinedDate,
            locationName: locationNameAdmin,
            gender: gender,
            roleName: roleName
        }, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}})
            .then((res) => {
                navigate("/manage-user");
                localStorage.setItem('savedUser', JSON.stringify(res.data));
            })
    }

    return (
        <Container>
            <Title>
                <H2>Edit User</H2>
            </Title>

            <Form onChange={() => setIsChangeForm(prev => !prev)}>
                <FormTitle>
                    <FormTitleItem>First Name</FormTitleItem>
                    <FormTitleItem>Last Name</FormTitleItem>
                    <FormTitleItem>Date of Birth</FormTitleItem>
                    <FormTitleItem>Gender</FormTitleItem>
                    <FormTitleItem>Joined Date</FormTitleItem>
                    <FormTitleItem>Type</FormTitleItem>
                </FormTitle>
                <FormContent>
                    <FormContentItem>
                        <InputText id='editUser_firstName' type="text" value={firstName} disabled
                                   className='borderPrimary'></InputText>
                    </FormContentItem>
                    <FormContentItem>
                        <InputText id='editUser_lastName' type="text" value={lastName} disabled
                                   className='borderPrimary'></InputText>
                    </FormContentItem>
                    <FormContentItem>
                        <InputDate type="date"
                                   id='editUser_birthDate'
                                   value={birthDate}
                                   className={birthDateError ? "borderDanger" : "borderPrimary"}
                                   onChange={(e) => {
                                       handleChangeBirthDate(e)
                                   }}
                        ></InputDate>
                        {birthDateError && <Error>User is under 18. Please select a different date</Error>}
                    </FormContentItem>
                    <FormContentItemCheckbox id="gender">
                        {
                            props.data.gender == true ?
                                <>
                                    <Label id='editUser_genderFemale'>
                                        <InputRadio type="radio" name="genderUser" value={false} onChange={(e) => {
                                            setGender(e.target.value)
                                        }}/>
                                        <InputRadioSpan>Female</InputRadioSpan>
                                    </Label>
                                    <Label id='editUser_genderMale'>
                                        <InputRadio type="radio" name="genderUser" defaultChecked value={true}
                                                    onChange={(e) => {
                                                        setGender(e.target.value)
                                                    }}/>
                                        <InputRadioSpan>Male</InputRadioSpan>
                                    </Label>

                                </>
                                :
                                <>
                                    <Label id='editUser_genderFemale1'>
                                        <InputRadio type="radio" name="genderUser" defaultChecked value={false}
                                                    onChange={(e) => {
                                                        setGender(e.target.value)
                                                    }}/>
                                        <InputRadioSpan>Female</InputRadioSpan>
                                    </Label>
                                    <Label id='editUser_genderMale1'>
                                        <InputRadio type="radio" name="genderUser" value={true} onChange={(e) => {
                                            setGender(e.target.value)
                                        }}/>
                                        <InputRadioSpan>Male</InputRadioSpan>
                                    </Label>

                                </>
                        }
                    </FormContentItemCheckbox>
                    <FormContentItem>
                        <InputDate type="date"
                                   id='editUser_joinedDate'
                                   value={joinedDate}
                                   onChange={(e) => {
                                       handleChangeJoinedDate(e)
                                   }}
                                   className={joinedDateSaturdaySundayError || joinedDateSoonError ? "borderDanger" : "borderPrimary"}
                        ></InputDate>
                        {joinedDateSaturdaySundayError &&
                            <Error>Joined date is Saturday or Sunday.<br/> Please select a different date</Error>}
                        {joinedDateSoonError &&
                            <Error>Joined date is not later than Date of Birth.<br/> Please select a different
                                date</Error>}
                    </FormContentItem>
                    <FormContentItem>
                        <Select name="roleName" id='editUser_roleNameSelect' onChange={(e) => {
                            setRoleName(e.target.value)
                        }}>
                            {
                                roles.length > 0 ?
                                    roles.map((role) => {
                                        if (role.name === props.data.roleName) {
                                            return (
                                                <Option value={role.name}
                                                        selected>{StringFormatter.capitalizeFirstLetter(role.name)}</Option>
                                            );
                                        }
                                        return (
                                            <Option
                                                value={role.name}>{StringFormatter.capitalizeFirstLetter(role.name)}</Option>
                                        );
                                    })
                                    : null
                            }
                        </Select>
                    </FormContentItem>

                    <Button>
                        <ButtonContainer>
                            <button
                                id="editUser_Save"
                                type="button"
                                className={
                                    'btn btn-login btn-danger' +
                                    ' btn-lg ' +
                                    (birthDateError || joinedDateSaturdaySundayError || joinedDateSoonError || emptyError ? 'disabled' : '')
                                }
                                onClick={() => {
                                    handleEditUser()
                                }}
                                style={{fontSize: "1rem"}}
                            >
                                Save
                            </button>

                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonClick
                                id='editUser_Cancel'
                                onClick={() => navigate("/manage-user")}
                            >Cancel</ButtonClick>
                        </ButtonContainer>
                    </Button>
                </FormContent>
            </Form>
        </Container>
    )
}

export default EditUserMain