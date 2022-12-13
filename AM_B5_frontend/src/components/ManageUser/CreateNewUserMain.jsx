import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../../css/main.css"
import {AXIOS_API_URL} from "../../constants/Axios";
import StringFormatter from '../../service/StringFormatter';

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
    font-size: 1.3rem;
`

const Form = styled.form`
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
    min-width: 300px;
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
    padding: 0px 10px;
    accent-color: red;
    
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

const CreateNewUserMain = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [locationName, setLocationName] = useState("");
    const [gender, setGender] = useState(false);
    const [roleName, setRoleName] = useState("STAFF");

    const [roles, setRoles] = useState([]);
    const [locations, setLocations] = useState([]);

    const [isSelectTypeAdmin, setIsSelectTypeAdmin] = useState(false);
    const [locationNameSelect, setLocationNameSelect] = useState("HO CHI MINH");
    const [isChangeForm, setIsChangeForm] = useState(false);

    const [emptyError, setEmptyError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [joinedDateSaturdaySundayError, setJoinedDateSaturdaySundayError] = useState(false);
    const [joinedDateSoonError, setJoinedDateSoonError] = useState(false);

    useEffect(() => {
        const getLocationNameAdmin = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('user_info'));
                const staffCode = userInfo.id;
                const getLocationAdminAdmin = await axios.get(`${AXIOS_API_URL}/admin/api/users/location/${staffCode}`
                    , {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}});
                setLocationName(getLocationAdminAdmin.data.name);
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
        const getLocations = async () => {
            try {
                const getLocationsFromDatabase = await axios.get(`${AXIOS_API_URL}/admin/api/locations`,
                    {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}})
                    .then((getLocationsFromDatabase) => {
                        setLocations(getLocationsFromDatabase.data);
                    })
            } catch (err) {
            }
        }
        getLocationNameAdmin();
        getRoles();
        getLocations();
    }, [])

    useEffect(() => {
        if (firstName === "" || lastName === "" || birthDate === "" || joinedDate === "" || locationNameSelect === "" || gender === "" || roleName === "") {
            setEmptyError(true);
            return;
        } else {
            setEmptyError(false);
        }
        setBirthDateError(false);
        setJoinedDateSoonError(false);
        setJoinedDateSaturdaySundayError(false);
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
        if (joinedDate != "" && birthDate > joinedDate) {
            setJoinedDateSoonError(true);
            setJoinedDateSaturdaySundayError(false);
            return;
        } else {
            setJoinedDateSoonError(false);
        }
    }, [isChangeForm, joinedDate])

    function getDay(dateString) {
        var joinedDate = new Date(dateString);
        var date = joinedDate.getDay();
        return date;
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

    const handleChangeFirstName = (e) => {
        const resultFirstName = e.target.value.replace(/[^a-z ]/gi, '');
        setFirstName(resultFirstName);
    }

    const handleChangeLastName = (e) => {
        const resultLastName = e.target.value.replace(/[^a-z ]/gi, '');
        setLastName(resultLastName);
    }

    const handleChangeBirthDate = (e) => {
        setBirthDate(e.target.value);
    }

    const handleChangeJoinedDate = (e) => {
        setJoinedDate(e.target.value);
    }

    const handleChangeType = (e) => {
        setRoleName(e.target.value);
        if (e.target.value === "ADMIN") {
            setIsSelectTypeAdmin(true);
        } else {
            setIsSelectTypeAdmin(false);
        }
    }

    const handleSaveUser = (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || birthDate === "" || joinedDate === "" || locationNameSelect === "" || gender === "" || roleName === "") {
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

        if (roleName === "ADMIN") {
            const createUserRes = axios.post(`${AXIOS_API_URL}/admin/api/users`, {
                firstName: firstName,
                lastName: lastName,
                birthDate: birthDate,
                joinedDate: joinedDate,
                locationName: locationNameSelect,
                gender: gender,
                roleName: roleName
            }, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}})
                .then((res) => {
                    navigate("/manage-user");
                    localStorage.setItem('savedUser', JSON.stringify(res.data));
                })
        }

        if (roleName === "STAFF") {
            const createUserRes = axios.post(`${AXIOS_API_URL}/admin/api/users`, {
                firstName: firstName,
                lastName: lastName,
                birthDate: birthDate,
                joinedDate: joinedDate,
                locationName: locationName,
                gender: gender,
                roleName: roleName
            }, {headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')}})
                .then((res) => {
                    navigate("/manage-user");
                    localStorage.setItem('savedUser', JSON.stringify(res.data));
                })
        }
    }

    return (
        <Container>
            <Title>
                <H2>Create New User</H2>
            </Title>
            <Form onChange={() => setIsChangeForm(prev => !prev)}>
                <FormTitle>
                    <FormTitleItem>First Name</FormTitleItem>
                    <FormTitleItem>Last Name</FormTitleItem>
                    <FormTitleItem>Date of Birth</FormTitleItem>
                    <FormTitleItem>Gender</FormTitleItem>
                    <FormTitleItem>Joined Date</FormTitleItem>
                    <FormTitleItem>Type</FormTitleItem>
                    {
                        isSelectTypeAdmin ?
                            <FormTitleItem>
                                Location
                            </FormTitleItem>
                            :
                            <></>
                    }
                </FormTitle>
                <FormContent>
                    <FormContentItem>
                        <InputText id='createUser_firstName' type="text" className='borderPrimary'
                                   onChange={(e) => handleChangeFirstName(e)}
                                   maxLength={128}
                                   value={firstName}
                        ></InputText>
                    </FormContentItem>
                    <FormContentItem>
                        <InputText id='createUser_lastName' type="text" className='borderPrimary'
                                   onChange={(e) => handleChangeLastName(e)}
                                   maxLength={128}
                                   value={lastName}
                        ></InputText>
                    </FormContentItem>
                    <FormContentItem>
                        <InputDate id='createUser_birthDate' type="date"
                                   className={birthDateError ? "borderDanger" : "borderPrimary"}
                                   onChange={(e) => {
                                       handleChangeBirthDate(e)
                                   }}
                        ></InputDate>
                        {birthDateError && <Error>User is under 18. Please select a different date</Error>}
                    </FormContentItem>
                    <FormContentItemCheckbox>
                        <Label id='createUser_genderFalse'>
                            <InputRadio type="radio" name="genderUser" value={false} onChange={(e) => {
                                setGender(e.target.value)
                            }}/>
                            <InputRadioSpan>Female</InputRadioSpan>
                        </Label>
                        <Label id='createUser_genderTrue'>
                            <InputRadio type="radio" name="genderUser" value={true} onChange={(e) => {
                                setGender(e.target.value)
                            }}/>
                            <InputRadioSpan>Male</InputRadioSpan>
                        </Label>
                    </FormContentItemCheckbox>
                    <FormContentItem>
                        <InputDate id='createUser_joinedDate' type="date"
                                   onChange={(e) => {
                                       handleChangeJoinedDate(e)
                                   }}
                                   className={joinedDateSaturdaySundayError || joinedDateSoonError ? "borderDanger" : "borderPrimary"}
                        ></InputDate>
                        {joinedDateSaturdaySundayError &&
                            <Error>Joined date is Saturday or Sunday.<br/>Please select a different date</Error>}
                        {joinedDateSoonError &&
                            <Error>Joined date is not later than Date of Birth.<br/>Please select a different
                                date</Error>}
                    </FormContentItem>
                    <FormContentItem>
                        <Select id='createUser_roleNameSelect' name="roleName"
                                onChange={(e) => handleChangeType(e)}
                        >
                            {
                                roles.length > 0 ?
                                    roles.map((role) => {
                                        return (
                                            <Option value={role.name}
                                                    selected={role.name === "STAFF"}>{StringFormatter.capitalizeFirstLetter(role.name)}</Option>
                                        );
                                    })
                                    : null
                            }
                        </Select>
                    </FormContentItem>
                    {
                        isSelectTypeAdmin ?
                            <FormContentItem>
                                <Select id='createUser_locationSelect' name="selectLocation"
                                        onChange={(e) => setLocationNameSelect(e.target.value)}
                                >
                                    {
                                        locations.length > 0 ?
                                            locations.map((location) => {
                                                return (
                                                    <Option
                                                        value={location.name}>{StringFormatter.capitalizeFirstLetterOfEachWord(location.name)}</Option>
                                                );
                                            })
                                            : null
                                    }
                                </Select>
                            </FormContentItem>
                            :
                            <></>
                    }

                    <Button>
                        <ButtonContainer>
                            <button
                                id="createUser_Save"
                                type="button"
                                className={
                                    'btn btn-login btn-danger' +
                                    ' btn-lg ' +
                                    (emptyError || birthDateError || joinedDateSaturdaySundayError || joinedDateSoonError ? 'disabled' : '')
                                }
                                onClick={(e) => {
                                    handleSaveUser(e)
                                }}
                                style={{fontSize: "1rem"}}
                            >
                                Save
                            </button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonClick
                                id='createUser_Cancel'
                                onClick={() => navigate("/manage-user")}
                            >Cancel</ButtonClick>
                        </ButtonContainer>
                    </Button>
                </FormContent>
            </Form>
        </Container>
    )
}

export default CreateNewUserMain