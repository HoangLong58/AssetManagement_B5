import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import "../../css/main.css"
import {ArrowDropDownOutlined, ArrowDropUpOutlined, SearchOutlined} from '@mui/icons-material';
import UserService from '../../service/UserService';
import AssetsService from '../../service/AssetsService';
import AssignmentService from '../../service/AssignmentService';

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

const InputDate = styled.input`
    min-width: 300px;
    height: 40px;
    margin: 5px 20px;
    outline: none;
    color: #191919;
    border-radius: 10px;
    padding: 0px 10px;
    box-sizing: border-box;
    border: 1px solid #c1c1c1;
    &::placeholder {
        letter-spacing: 2px;
        font-size: 15px;
    }
    &:focus {
        box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
    }
`

const TextArea = styled.textarea`
max-width: 300px;
margin: 5px 20px;
outline: none;
color: #191919;
border-radius: 10px;
padding: 5px 10px 0px 10px;
box-sizing: border-box;
border: 1px solid #c1c1c1;
resize: none;
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

const Error = styled.span`
    margin: 0px 0px 10px 30px;
    font-size: 1.1rem;
    color: red;
`

const UserBox = styled.div`
    display: flex;
    width: 100%;
    max-width: 300px;
    height: 40px;
    // height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #c9c9c9;
    border-radius: 10px;
    margin: 5px 20px;
    padding: 0px 10px;
    position: relative;
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        left: 252px;
        width: 1px;
        height: 39px;
        background-color: #cecece;
    }
    .active & {
        display: none;
    }
`
const UserSpan = styled.span`
    font-size: 1.1rem;
`

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    padding: var(--card-padding);
    text-align: left;
    transition: all 300ms ease;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
    &:hover {
        background: var(--color-light);
    }
`;

const Tbody = styled.tbody`
`;

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
`;

const Th = styled.th`
    border-bottom: 1px solid #34383c;
    min-width: 100px;
    color: #34383c;
`;

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ThSpan = styled.span``;

const ThSortIcon = styled.div``;

const Wrapper = styled.div`
    display: none;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 650px;
    height: auto;
    background-color: #fff;
    border: 2px solid #333;
    --growth-from: 0.7;
    --growth-to: 1;
    animation: growth linear 0.1s;
    z-index: 10;
    ${UserBox}.active & {
        display: block;
    }
`
const BoxTitle = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 2rem 2rem 0px 2rem;
`

const Option = styled.div`
max-height: 400px; 
overflow:auto;
`

const SearchContainer = styled.div`
    // margin: 20px;
    display: flex;
    border: 1px solid #dadada;
    border-radius: 5px;
`;

const SearchIcon = styled.div`
    border-left: 1px solid #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: auto;
`;

const Input = styled.input`
    width: 100%;
    height: 42px;
    padding: 0px 50px 0 20px;
    border-radius: 5px;
    background-color: #ffffff;
    box-sizing: border-box;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: var(--color-dark);
`;

const BoxH2 = styled.h2`
    text-align: center;
    color: var(--color-primary);
    font-size: 1.3rem;
`

const PictureNoResultFound = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Img = styled.img`
width: 500px;
max-height: 600px;
object-fit: cover;
`

const H1NoResultFound = styled.h1`
letter-spacing: 2px;
font-size: 1.3rem;
color: var(--color-primary);
`

const CreateNewAssignmentMain = () => {
    const navigate = useNavigate();

    const [isSortStaffCode, setIsSortStaffCode] = useState(false);
    const [isSortFullName, setIsSortFullName] = useState(false);
    const [isSortType, setIsSortType] = useState(false);
    const [isSortAssetCode, setIsSortAssetCode] = useState(false);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortCategory, setIsSortCategory] = useState(false);
    const [isChangeForm, setIsChangeForm] = useState(false);

    const [orderUserState, setOrderUserState] = useState("DSC");
    const [orderAssetState, setOrderAssetState] = useState("DSC");

    const location = JSON.parse(localStorage.getItem('user_info')).location;
    const [user, setUser] = useState(null);
    const [asset, setAsset] = useState(null);
    const [userList, setUserList] = useState([]);
    const [assetList, setAssetList] = useState([]);
    const [today, setToday] = useState("");
    const [userId, setUserId] = useState("");
    const [assetId, setAssetId] = useState("");
    const [date, setDate] = useState(null);
    const [note, setNote] = useState("");
    const [searchUser, setSearchUser] = useState("");
    const [searchAsset, setSearchAsset] = useState("");

    const [isNoUser, setIsNoUser] = useState(false);
    const [isNoAsset, setIsNoAsset] = useState(false);

    const [assignDateError, setAssignDateError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);

    const [isLoadingUser, setIsLoadingUser] = useState(false);
    const [isLoadingAsset, setIsLoadingAsset] = useState(false);

    const openSelectUser = () => {

        var checkList = document.getElementById('CreateAssignment_UserBox');
        checkList.classList.add('active');
        searchUserList("");
    }
    const closeSelectUser = (e) => {
        e.preventDefault();
        var checkList = document.getElementById('CreateAssignment_UserBox');
        checkList.classList.remove('active');
        var searchbox = document.getElementById('textSearch_user');
        searchbox.value = "";
        setIsSortStaffCode(false);
        setIsSortFullName(false);
        setIsSortType(false);
        setOrderUserState("DSC");


    }

    const handleSortStaffCode = () => {
        setIsSortStaffCode(prev => !prev);
        sortingUserList("staffCode");
    }
    const handleSortFullName = () => {
        setIsSortFullName(prev => !prev);
        sortingUserList("firstName");
    }
    const handleSortType = () => {
        setIsSortType(prev => !prev);
        sortingUserList("roleName");
    }
    const handleSearchUser = (e) => {
        setSearchUser(e.target.value);
    }
    const handleSelectUser = (e) => {
        if (userId !== "") {
            e.preventDefault();
            var checkList = document.getElementById('CreateAssignment_UserBox');
            checkList.classList.remove('active');
            userList.map((u) => {
                if (u.staffCode === userId)
                    setUser(u);
            })
        }
    }

    const searchUserList = async (text) => {
        setIsLoadingUser(true);
        await UserService.searchUser(text)
            .then((res) => {
                const sorted = res.data.list_user;
                sorted.sort((a, b) => a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1);
                setUserList(sorted);
                setIsLoadingUser(false);
                if (res.data.total === 0) {
                    setIsNoUser(true);
                } else {
                    setIsNoUser(false);
                }
            })
            .catch(error => {
                }
            )
    }

    const sortingUserList = (col) => {
        if (orderUserState === "ASC") {
            const sorted = [...userList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUserList(sorted)
            setOrderUserState("DSC")

        }
        if (orderUserState === "DSC") {
            const sorted = [...userList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUserList(sorted)
            setOrderUserState("ASC")

        }
    }

    const openSelectAsset = () => {
        var checkList = document.getElementById('CreateAssignment_AssetBox');
        checkList.classList.add('active');
        searchAssetList("")

    }
    const closeSelectAsset = (e) => {
        e.preventDefault();
        var checkList = document.getElementById('CreateAssignment_AssetBox');
        checkList.classList.remove('active');
        var searchbox = document.getElementById('textSearch_asset');
        searchbox.value = "";
        setIsSortAssetCode(false);
        setIsSortAssetName(false);
        setIsSortCategory(false);
    }

    const handleSortAssetCode = () => {
        setIsSortAssetCode(prev => !prev);
        sortingAssetList("assetCode");
    }
    const handleSortAssetName = () => {
        setIsSortAssetName(prev => !prev);
        sortingAssetList("assetName");
    }
    const handleSortCategory = () => {
        setIsSortCategory(prev => !prev);
        sortingAssetList("categoryName");
    }
    const handleSearchAsset = (e) => {
        setSearchAsset(e.target.value);
    }
    const handleSelectAsset = (e) => {
        if (assetId !== "") {
            e.preventDefault();
            var checkList = document.getElementById('CreateAssignment_AssetBox');
            checkList.classList.remove('active');
            assetList.map((a) => {
                if (a.assetCode === assetId)
                    setAsset(a);
            })
        }
    }

    const searchAssetList = async (text) => {
        setIsLoadingAsset(true);
        await AssetsService.searchAsset(text)
            .then((res) => {
                const sorted = res.data.list_asset;
                sorted.sort((a, b) => a.assetName.toLowerCase() > b.assetName.toLowerCase() ? 1 : -1);
                setAssetList(sorted);
                setIsLoadingAsset(false);
                if (res.data.total === 0) {
                    setIsNoAsset(true);
                } else {
                    setIsNoAsset(false);
                }
            })
            .catch(error => {
                }
            )
    }
    const sortingAssetList = (col) => {
        if (orderAssetState === "ASC") {
            const sorted = [...assetList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setAssetList(sorted)
            setOrderAssetState("DSC")

        }
        if (orderAssetState === "DSC") {
            const sorted = [...assetList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setAssetList(sorted)
            setOrderAssetState("ASC")
        }
    }

    const handleChangeDate = (e) => {
        setDate(e.target.value);
    }

    const handleChangeNote = (e) => {
        setNote(e.target.value);
    }

    useEffect(() => {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();
        var minDate = year + '-' + month + '-' + day;
        setDate(minDate);
        setToday(minDate)
    }, [])

    useEffect(() => {
        if (user === null || asset === null || date === null) {
            setEmptyError(true);
            return;
        } else {
            setEmptyError(false);
        }
        setAssignDateError(false);
    }, [isChangeForm])

    useEffect(() => {
        if (date < today) {
            setAssignDateError(true);
            return;
        } else {
            setAssignDateError(false);
        }
    }, [date, isChangeForm])

    const handleSaveAssignment = (e) => {
        e.preventDefault();
        if (user === null || asset === null || date === null) {
            setEmptyError(true);
            return;
        }
        if (date < today) {
            setAssignDateError(true);
            return;
        }
        const assignBy = JSON.parse(localStorage.getItem('user_info')).id;
        const assignment = {
            assignedBy: assignBy,
            assignedTo: user.staffCode,
            assetCode: asset.assetCode,
            assignedDate: date,
            note: note
        }
        AssignmentService.createNewAssignment(assignment).then((res) => {
            navigate("/manage-assignment");
            localStorage.setItem('savedAssignment', JSON.stringify(res.data));
        });

    }

    return (
        <Container>
            <Title>
                <H2>Create Assignment</H2>
            </Title>
            <Form onChange={() => setIsChangeForm(prev => !prev)}>
                <FormTitle>
                    <FormTitleItem>User</FormTitleItem>
                    <FormTitleItem>Asset</FormTitleItem>
                    <FormTitleItem>Assigned Date</FormTitleItem>
                    <FormTitleItem>Note</FormTitleItem>
                </FormTitle>
                <FormContent>
                    <FormContentItem>
                        <UserBox id="CreateAssignment_UserBox">
                            <UserSpan>{user ? user.firstName + ' ' + user.lastName : ''}</UserSpan>
                            <SearchOutlined id="Create-assignment-user-list"
                                            style={{cursor: "pointer"}}
                                            onClick={() => openSelectUser()}
                            />
                            <Wrapper>
                                <BoxTitle>
                                    <BoxH2>Select User</BoxH2>
                                    <SearchContainer>
                                        <Input
                                            type="text"
                                            id="textSearch_user"
                                            onChange={(e) => handleSearchUser(e)}
                                        />
                                        <SearchIcon id="button-search-user" onClick={() => searchUserList(searchUser)}>
                                            <SearchOutlined/>
                                        </SearchIcon>
                                    </SearchContainer>
                                </BoxTitle>
                                <Option>
                                    {
                                        isNoUser ?
                                            (
                                                <PictureNoResultFound id="No_Result_Found_Picture">
                                                    <Img
                                                        src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000"
                                                        alt="Not Found Result"/>
                                                    <H1NoResultFound>No result found</H1NoResultFound>
                                                </PictureNoResultFound>

                                            )
                                            :
                                            (
                                                <Table style={{position: "relative"}}>
                                                    <Thead>
                                                        <Tr>
                                                            <Th style={{border: "none", minWidth: "30px"}}></Th>
                                                            <Th>
                                                                <ThContainer onClick={() => handleSortStaffCode()}>
                                                                    <ThSpan>Staff Code</ThSpan>
                                                                    <ThSortIcon>
                                                                        {isSortStaffCode ? <ArrowDropUpOutlined/> :
                                                                            <ArrowDropDownOutlined/>}
                                                                    </ThSortIcon>
                                                                </ThContainer>
                                                            </Th>
                                                            <Th>
                                                                <ThContainer onClick={() => handleSortFullName()}>
                                                                    <ThSpan>Full Name</ThSpan>
                                                                    <ThSortIcon>
                                                                        {isSortFullName ? <ArrowDropUpOutlined/> :
                                                                            <ArrowDropDownOutlined/>}
                                                                    </ThSortIcon>
                                                                </ThContainer>
                                                            </Th>
                                                            <Th>
                                                                <ThContainer onClick={() => handleSortType()}>
                                                                    <ThSpan>Type</ThSpan>
                                                                    <ThSortIcon>
                                                                        {isSortType ? <ArrowDropUpOutlined/> :
                                                                            <ArrowDropDownOutlined/>}
                                                                    </ThSortIcon>
                                                                </ThContainer>
                                                            </Th>
                                                        </Tr>
                                                    </Thead>
                                                    {
                                                        isLoadingUser ? (
                                                                <div class="spinner-border text-warning" style={{
                                                                    color: "#e22027",
                                                                    position: "absolute",
                                                                    left: "50%"
                                                                }} role="status">
                                                                    <span class="visually-hidden"></span>
                                                                </div>
                                                            ) :
                                                            (
                                                                <Tbody id="create-new-assignment-tbody-user-id">
                                                                    {userList.map((userInstance) =>
                                                                        (
                                                                            <Tr key={userInstance.staffCode}
                                                                                id={userInstance.staffCode}>
                                                                                <Td style={{
                                                                                    border: 'none',
                                                                                    textAlign: "center",
                                                                                    fontSize: "1.5rem"
                                                                                }}>
                                                                                    <InputRadio
                                                                                        type="radio"
                                                                                        name="Radio_User"
                                                                                        value={userInstance.staffCode}
                                                                                        onClick={() => setUserId(userInstance.staffCode)}
                                                                                    />
                                                                                </Td>
                                                                                <Td>{userInstance.staffCode}</Td>
                                                                                <Td>{userInstance.firstName + ' ' + userInstance.lastName}</Td>
                                                                                <Td>{userInstance.roleName}</Td>
                                                                            </Tr>)
                                                                    )}
                                                                </Tbody>
                                                            )
                                                    }
                                                </Table>
                                            )
                                    }
                                </Option>
                                <Button>
                                    <ButtonContainer>
                                        <button
                                            id="createUser_Save"
                                            type="button"
                                            className={
                                                'btn btn-login btn-danger' +
                                                ' btn-lg ' +
                                                (userId ? '' : 'disabled')
                                            }

                                            style={{fontSize: "1rem"}}
                                            onClick={(e) => {
                                                setIsChangeForm(prev => !prev);
                                                handleSelectUser(e);
                                            }}
                                        >
                                            Save
                                        </button>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id='createAsset_Cancel'
                                            onClick={(e) => {
                                                closeSelectUser(e)
                                            }}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </Wrapper>
                        </UserBox>
                    </FormContentItem>
                    <FormContentItem>
                        <UserBox id="CreateAssignment_AssetBox">
                            <UserSpan>{asset ? asset.assetName : ''}</UserSpan>
                            <SearchOutlined id="Create-assignment-asset-list"
                                            style={{cursor: "pointer"}}
                                            onClick={() => openSelectAsset()}
                            />
                            <Wrapper>
                                <BoxTitle>
                                    <BoxH2>Select Asset</BoxH2>
                                    <SearchContainer>
                                        <Input
                                            type="text"
                                            id="textSearch_asset"

                                            onChange={(e) => handleSearchAsset(e)}
                                        />
                                        <SearchIcon id="button-search-asset"
                                                    onClick={() => searchAssetList(searchAsset)}>
                                            <SearchOutlined/>
                                        </SearchIcon>
                                    </SearchContainer>
                                </BoxTitle>
                                <Option>
                                    {
                                        isNoAsset ?
                                            (
                                                <PictureNoResultFound id="No_Result_Found_Picture">
                                                    <Img
                                                        src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000"
                                                        alt="Not Found Result"/>
                                                    <H1NoResultFound>No result found</H1NoResultFound>
                                                </PictureNoResultFound>
                                            )
                                            :
                                            (
                                                <Table>
                                                    <Thead>
                                                        <Tr>
                                                            <Th style={{border: "none", minWidth: "30px"}}></Th>
                                                            <Th>
                                                                <ThContainer onClick={() => handleSortAssetCode()}>
                                                                    <ThSpan>Asset Code</ThSpan>
                                                                    <ThSortIcon>
                                                                        {isSortAssetCode ? <ArrowDropUpOutlined/> :
                                                                            <ArrowDropDownOutlined/>}
                                                                    </ThSortIcon>
                                                                </ThContainer>
                                                            </Th>
                                                            <Th>
                                                                <ThContainer onClick={() => handleSortAssetName()}>
                                                                    <ThSpan>Asset Name</ThSpan>
                                                                    <ThSortIcon>
                                                                        {isSortAssetName ? <ArrowDropUpOutlined/> :
                                                                            <ArrowDropDownOutlined/>}
                                                                    </ThSortIcon>
                                                                </ThContainer>
                                                            </Th>
                                                            <Th>
                                                                <ThContainer onClick={() => handleSortCategory()}>
                                                                    <ThSpan>Category</ThSpan>
                                                                    <ThSortIcon>
                                                                        {isSortCategory ? <ArrowDropUpOutlined/> :
                                                                            <ArrowDropDownOutlined/>}
                                                                    </ThSortIcon>
                                                                </ThContainer>
                                                            </Th>
                                                        </Tr>
                                                    </Thead>
                                                    {
                                                        isLoadingAsset ? (
                                                                <div class="spinner-border text-warning" style={{
                                                                    color: "#e22027",
                                                                    position: "absolute",
                                                                    left: "50%"
                                                                }} role="status">
                                                                    <span class="visually-hidden"></span>
                                                                </div>
                                                            ) :
                                                            (

                                                                <Tbody id="create-new-assignment-tbody-asset-id">
                                                                    {assetList.map((asset) =>

                                                                        <Tr key={asset.assetCode} id={asset.assetCode}>
                                                                            <Td style={{
                                                                                border: 'none',
                                                                                textAlign: "center",
                                                                                fontSize: "1.5rem"
                                                                            }}>
                                                                                <InputRadio
                                                                                    type="radio"
                                                                                    name="Radio_User"
                                                                                    value={asset}
                                                                                    onClick={() => setAssetId(asset.assetCode)}
                                                                                />
                                                                            </Td>
                                                                            <Td>{asset.assetCode}</Td>
                                                                            <Td>{asset.assetName}</Td>
                                                                            <Td>{asset.categoryName}</Td>
                                                                        </Tr>
                                                                    )}
                                                                </Tbody>
                                                            )
                                                    }
                                                </Table>
                                            )
                                    }
                                </Option>
                                <Button>
                                    <ButtonContainer>
                                        <button
                                            id="createAsset_Save"
                                            type="button"
                                            className={
                                                'btn btn-login btn-danger' +
                                                ' btn-lg ' +
                                                (assetId ? '' : 'disabled')

                                            }

                                            style={{fontSize: "1rem"}}
                                            onClick={(e) => {
                                                setIsChangeForm(prev => !prev);
                                                handleSelectAsset(e);
                                            }}

                                        >
                                            Save
                                        </button>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id='createAsset_Cancel'
                                            onClick={(e) => {
                                                closeSelectAsset(e)
                                            }}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </Wrapper>
                        </UserBox>
                    </FormContentItem>
                    <FormContentItem>
                        <InputDate
                            id='createAssignment_InstalledDate' type="date"
                            className={assignDateError ? "borderDanger" : "borderPrimary"}
                            min={today}
                            value={date}
                            onChange={(e) => {
                                handleChangeDate(e)
                            }}
                        ></InputDate>
                        {assignDateError &&
                            <Error>Assigned Date must be today or in future.<br/>Please select a different date</Error>}
                    </FormContentItem>
                    <FormContentItem>
                        <TextArea
                            id='createAssignment_Specification'
                            rows="3" cols="46" className='borderPrimary'
                            maxLength={256}
                            onChange={(e) => handleChangeNote(e)}
                        ></TextArea>
                    </FormContentItem>
                    <Button>
                        <ButtonContainer>
                            <button
                                id="createAssignment_Save"
                                type="button"
                                className={
                                    'btn btn-login btn-danger' +
                                    ' btn-lg ' +
                                    (emptyError || assignDateError ? 'disabled' : '')
                                }
                                style={{fontSize: "1rem"}}
                                onClick={(e) => {
                                    handleSaveAssignment(e)
                                }}
                            >
                                Save
                            </button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <ButtonClick
                                id='createAssignment_Cancel'
                                onClick={() => navigate("/manage-assignment")}
                            >Cancel</ButtonClick>
                        </ButtonContainer>
                    </Button>
                </FormContent>
            </Form>
        </Container>
    )
}

export default CreateNewAssignmentMain