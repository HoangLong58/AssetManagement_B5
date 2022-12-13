import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import "../../css/main.css";
import {useEffect, useRef, useState} from "react";
import ReactPaginate from 'react-paginate';
import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    CloseOutlined,
    FilterAltOutlined,
    SearchOutlined
} from "@mui/icons-material";
import Modal from "./Modal";
import UserService from "../../service/UserService";
import DateFormatterService from "../../service/DateFormatterService";
import './css/pagination.css';
import StringFormatter from './../../service/StringFormatter'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import {AXIOS_API_URL} from "../../constants/Axios";

const Container = styled.div`
    margin-top: 100px;
`

const H2 = styled.h2`
    padding-left: 29px;
    margin-bottom: 1.2rem;
    color: var(--color-primary);
`

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    padding: var(--card-padding);
    text-align: left;
    transition: all 300ms ease;
    position: relative;
`

const Thead = styled.thead`

`

const Tr = styled.tr`

    &:hover {
        background: var(--color-light);
    }
`

const Tbody = styled.tbody`

`

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
`

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
`

const Button = styled.button`
    width: 40px;
    height: 30px;
    padding:0px;
    outline:none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 40px;

`

const FilterTitle = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
position: relative;
border-radius: 5px;
`

const FilterSpan = styled.span`
display: block;
padding: 10px 60px 10px 20px;
`
const FilterUl = styled.ul`
background-color: #f5f5f5;
position: absolute;
top: 261px;
left: 409px;
width: 144px;
z-index: 10;
`
const FilterLi = styled.li`
padding-left: 20px;
`
const FilterCheckbox = styled.input`
    accent-color: red;
`

const FilterIcon = styled.div`
    border-left: 1px solid #b5b5b5;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
    padding-left: 29px;
`

const RightOption = styled.div`
    display: flex;
    flex-direction: row;
`

const SearchContainer = styled.div`
    display: flex;
    border: 1px solid #dadada;
    border-radius: 5px;
`

const SearchIcon = styled.div`
    border-left: 1px solid #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: auto;
`

const AddContainer = styled.div`
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
`

const Item = styled.div`
    width: 170px;
    height: 30px;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.2rem var(--card-padding);
    border-radius: 5px;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    &.add-product {
        background-color: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary);
        color: white;
        cursor: pointer;
        & div {
            display: flex;
            justify-items: center;
            gap: 0.6rem;
        }
    }
`

const Th = styled.th`

    border-bottom: 1px solid #34383c;
    min-width: 100px;
    color: #34383c;
`

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ThSpan = styled.span`
`

const ThSortIcon = styled.div`
`

const Label = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`

const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
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

const ManageUserMain = () => {
    const navigate = useNavigate();

    const [isSortStaffCode, setIsSortStaffCode] = useState(false);
    const [isSortFullName, setIsSortFullName] = useState(false);
    const [isSortJoinedDate, setIsSortJoinedDate] = useState(false);
    const [isSortType, setIsSortType] = useState(false);
    const [order, setOrder] = useState("ASC");
    const [roleName, setRoleName] = useState('All');
    const [emptyTotalElements, setEmptyTotalElements] = useState();
    const [isReload, setIsReload] = useState(false)
    const [isLoading, setIsLoading] = useState(false);


    var userInfo = {}
    userInfo = JSON.parse(localStorage.getItem('user_info'));


    var savedUser = {}
    savedUser = JSON.parse(localStorage.getItem('savedUser'));
    if (savedUser) {
    }

    window.onunload = () => {
        window.localStorage.removeItem('savedUser');
    }


    const handleClickDisableUser = (user) => {
        let url = AXIOS_API_URL + "/admin/api/users/checking/" + user.staffCode;
        const userInfo = JSON.parse(localStorage.getItem('user_info'));
        axios
            .get(url, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`
                }
            })
            .then((response) => {
                openModal({type: "confirmDisableUser", user: user})
            })
            .catch((error) => {
                if (error.response.data.message == "staff.not.found.with.code:" + user.staffCode) {
                }
                if (error.response.data.message == "exist.valid.assignments") {
                    openModal({type: "canNotDisableUser"})
                }
            });
    }

    const handleClickSortStaffCode = (col) => {
        setIsSortStaffCode(prev => !prev);
        setIsLoading(true);
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("DSC")
            setIsLoading(false);
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setIsLoading(false);
            setUsers(sorted)
            setOrder("ASC")
        }

    }
    const handleClickSortFullName = (col) => {
        setIsSortFullName(prev => !prev);
        setIsLoading(true);
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setIsLoading(false);
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setUsers(sorted)
            setOrder("ASC")
            setIsLoading(false);
        }
    }
    const handleClickSortJoinedDate = (col) => {
        setIsSortJoinedDate(prev => !prev);
        setIsLoading(true);
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setIsLoading(false);
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setIsLoading(false);
            setUsers(sorted)
            setOrder("ASC")
        }
    }
    const handleClickSortType = (col) => {
        setIsSortType(prev => !prev);
        setIsLoading(true);
        if (order === "ASC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setIsLoading(false);
            setUsers(sorted)
            setOrder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...users].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setIsLoading(false);
            setUsers(sorted)
            setOrder("ASC")
        }

    }

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [danhMucModal, setDanhMucModal] = useState(null);

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.user);
    }

    const [dataToast, setDataToast] = useState({message: "alo alo", type: "success"});
    const toastRef = useRef(null);

    const showToastFromOut = (dataShow) => {
        setDataToast(dataShow);
        toastRef.current.show();
    }

    const [dataRes, setDataRes] = useState({})
    const [users, setUsers] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const [searching, setSearching] = useState('')

    useEffect(() => {
        setIsLoading(true);
        var roles = []
        if (roleName === "All") {
            roles = ["ADMIN", "STAFF"]
        } else {
            roles.push(roleName)
        }
        UserService.searchByText(searching, roles, pageNo)
            .then(res => {
                setUsers(res.data.userContent)
                setPageNo(res.data.pageNo)
                setTotalPage(res.data.totalPages)
                // SHOW IMAGE NO RESULT IF totalElements = 0
                if (res.data.totalElements === 0) {
                    setEmptyTotalElements(true);
                } else {
                    setEmptyTotalElements(false);
                }
                setIsLoading(false);
            })
            .catch(err => {
            })
    }, [pageNo, isReload])

    const changePage = ({selected}) => {
        setPageNo(selected)
    }

    const handleFilters = (e) => {
        setIsLoading(true);
        const role = e.target.value
        var roles = []
        setPageNo(0)
        if (role === 'All') {
            roles = ["ADMIN", "STAFF"]
        } else {
            roles.push(role)
        }
        setRoleName(role)


        UserService.searchByText(searching, roles, 0)
            .then(res => {
                setUsers(res.data.userContent)
                setPageNo(res.data.pageNo)
                setTotalPage(res.data.totalPages)
                // SHOW IMAGE NO RESULT IF totalElements = 0
                if (res.data.totalElements === 0) {
                    setEmptyTotalElements(true);
                } else {
                    setEmptyTotalElements(false);
                }
                setIsLoading(false);
            })
            .catch(err => {
            })


    }

    const [text, setText] = useState('')

    const searchingHandler = (e) => {
        setIsLoading(true);
        let textSearch = ''
        setPageNo(0)
        textSearch = document.getElementById("textSearch").value
        if (textSearch.replaceAll(" ", "") == "") {
            textSearch = ""
        }

        setText(textSearch)
        setSearching(textSearch)

        var roles = []
        if (roleName === 'All') {
            roles = ["ADMIN", "STAFF"]
        } else {
            roles.push(roleName)
        }
        UserService.searchByText(textSearch, roles, 0)
            .then(res => {
                setUsers(res.data.userContent)
                setPageNo(res.data.pageNo)
                setTotalPage(res.data.totalPages)

                if (res.data.totalElements === 0) {
                    setEmptyTotalElements(true);
                } else {
                    setEmptyTotalElements(false);
                }
                setIsLoading(false);
            })
            .catch(err => {
            })
    }

    const handleClickTypeFilter = () => {
        var checkList = document.getElementById('ManageUser_Filter');
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }

    return (
        <Container>
            <H2>User List</H2>
            <OptionContainer>
                <FilterContainer id="ManageUser_Filter" className="dropdown-check-list" tabindex="100">
                    <FilterTitle className="anchor" onClick={() => {
                        handleClickTypeFilter()
                    }}>
                        <FilterSpan>Type</FilterSpan>
                        <FilterIcon>
                            <FilterAltOutlined/>
                        </FilterIcon>
                    </FilterTitle>
                    <FilterUl className="items">
                        <Label>
                            <FilterLi>
                                <FilterCheckbox type="checkbox" name="filterType" value="All" id="all"
                                                onChange={(e) => handleFilters(e)}
                                                checked={roleName === 'All'}
                                />
                            </FilterLi>
                            <LiSpan>All</LiSpan>
                        </Label>
                        <Label>
                            <FilterLi>
                                <FilterCheckbox type="checkbox" name="filterType" value="ADMIN" id='admin'
                                                onChange={(e) => handleFilters(e)}
                                                checked={roleName === 'ADMIN'}/>
                            </FilterLi>
                            <LiSpan>Admin</LiSpan>
                        </Label>
                        <Label>
                            <FilterLi>
                                <FilterCheckbox type="checkbox" name="filterType" value="STAFF" id='staff'
                                                onChange={(e) => handleFilters(e)}
                                                checked={roleName === 'STAFF'}/>
                            </FilterLi>
                            <LiSpan>Staff</LiSpan>
                        </Label>
                    </FilterUl>
                </FilterContainer>

                <RightOption>
                    <SearchContainer>
                        <Input type="text" placeHolder="Nhập vào mã danh mục"
                               id="textSearch"
                               onChange={(e) => {
                                   if (e.target.value.replaceAll(" ", "") == "") {
                                       setSearching("")
                                       searchingHandler()
                                   }
                               }}
                        />
                        <SearchIcon onClick={() => searchingHandler()}>
                            <SearchOutlined/>
                        </SearchIcon>
                    </SearchContainer>
                    <AddContainer>
                        <Item className="add-product"
                              onClick={() => navigate("/create-new-user")}
                        >
                            <h3>Create new user</h3>
                        </Item>
                    </AddContainer>
                </RightOption>
            </OptionContainer>
            {
                emptyTotalElements ?
                    <PictureNoResultFound id="No_Result_Found_Picture">
                        <Img
                            src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000"
                            alt="Not Found Result"/>
                        <H1NoResultFound>No result found</H1NoResultFound>
                    </PictureNoResultFound>
                    :
                    <>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>
                                        <ThContainer
                                            onClick={() => handleClickSortStaffCode("staffCode")}
                                        >
                                            <ThSpan>Staff Code</ThSpan>
                                            <ThSortIcon>
                                                {
                                                    isSortStaffCode ?
                                                        <ArrowDropUpOutlined/>
                                                        :
                                                        <ArrowDropDownOutlined/>
                                                }
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => handleClickSortFullName("firstName")}
                                        >
                                            <ThSpan>Full Name</ThSpan>
                                            <ThSortIcon>
                                                {
                                                    isSortFullName ?
                                                        <ArrowDropUpOutlined/>
                                                        :
                                                        <ArrowDropDownOutlined/>
                                                }
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>Username</Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => handleClickSortJoinedDate("joinedDate")}
                                        >
                                            <ThSpan>Joined Date</ThSpan>
                                            <ThSortIcon>
                                                {
                                                    isSortJoinedDate ?
                                                        <ArrowDropUpOutlined/>
                                                        :
                                                        <ArrowDropDownOutlined/>
                                                }
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => handleClickSortType("roleName")}
                                        >
                                            <ThSpan>Type</ThSpan>
                                            <ThSortIcon>
                                                {
                                                    isSortType ?
                                                        <ArrowDropUpOutlined/>
                                                        :
                                                        <ArrowDropDownOutlined/>
                                                }
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                </Tr>
                            </Thead>

                            {
                                isLoading ? (
                                        <div class="spinner-border text-warning"
                                             style={{color: "#e22027", position: "absolute", left: "50%"}} role="status">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    ) :
                                    (

                                        <Tbody id="userTableBody">
                                            {
                                                savedUser ?
                                                    (<Tr id={savedUser.staffCode} key={savedUser.staffCode}>
                                                        <Td onClick={() => openModal({
                                                            type: "detailUser",
                                                            user: savedUser
                                                        })}>{savedUser.staffCode}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailUser",
                                                            user: savedUser
                                                        })}>{savedUser.firstName + ' ' + savedUser.lastName}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailUser",
                                                            user: savedUser
                                                        })}>{savedUser.username}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailUser",
                                                            user: savedUser
                                                        })}>
                                                            {DateFormatterService.dateFormat(savedUser.joinedDate)}
                                                        </Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailUser",
                                                            user: savedUser
                                                        })}>
                                                            {StringFormatter.capitalizeFirstLetter(savedUser.roleName) || 'N/A'}
                                                        </Td>
                                                        <Td style={{border: "none"}}>
                                                            <Button
                                                                id={savedUser.staffCode + "-edit"}
                                                                onClick={() => {
                                                                    navigate("/edit-user", {
                                                                        state: {
                                                                            staffCode: savedUser.staffCode,
                                                                            firstName: savedUser.firstName,
                                                                            lastName: savedUser.lastName,
                                                                            birthDate: savedUser.birthDate,
                                                                            joinedDate: savedUser.joinedDate,
                                                                            gender: savedUser.gender,
                                                                            roleName: savedUser.roleName
                                                                        }
                                                                    })
                                                                }}
                                                            >
                                                                <FontAwesomeIcon style={{
                                                                    fontSize: "1.2rem",
                                                                    marginLeft: "25px",
                                                                    color: "#707070"
                                                                }} icon={faPencilAlt}/>
                                                            </Button>
                                                        </Td>
                                                        <Td style={{border: "none"}}>
                                                            <Button id={savedUser.staffCode + "-del"}
                                                                    onClick={() => handleClickDisableUser(savedUser)}>
                                                                <CloseOutlined style={{
                                                                    border: "2px solid #de6a79",
                                                                    borderRadius: "50%",
                                                                    color: "#de6a79",
                                                                    marginLeft: "25px"
                                                                }}/>
                                                            </Button>
                                                        </Td>
                                                    </Tr>) : ''
                                            }

                                            {
                                                users.map(user =>
                                                    savedUser ?
                                                        (savedUser.staffCode != user.staffCode ?
                                                            (
                                                                <Tr id={user.staffCode} key={user.staffCode}>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailUser",
                                                                        user: user
                                                                    })}>{user.staffCode}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailUser",
                                                                        user: user
                                                                    })}>{user.firstName + ' ' + user.lastName}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailUser",
                                                                        user: user
                                                                    })}>{user.username}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailUser",
                                                                        user: user
                                                                    })}>
                                                                        {DateFormatterService.dateFormat(user.joinedDate)}
                                                                    </Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailUser",
                                                                        user: user
                                                                    })}>
                                                                        {StringFormatter.capitalizeFirstLetter(user.roleName) || 'N/A'}
                                                                    </Td>
                                                                    <Td style={{border: "none"}}>
                                                                        <Button id={user.staffCode + "-edit"}
                                                                                onClick={() => {
                                                                                    navigate("/edit-user", {
                                                                                        state: {
                                                                                            staffCode: user.staffCode,
                                                                                            firstName: user.firstName,
                                                                                            lastName: user.lastName,
                                                                                            birthDate: user.birthDate,
                                                                                            joinedDate: user.joinedDate,
                                                                                            gender: user.gender,
                                                                                            roleName: user.roleName
                                                                                        }
                                                                                    })
                                                                                }}
                                                                        >
                                                                            <FontAwesomeIcon style={{
                                                                                fontSize: "1.2rem",
                                                                                marginLeft: "25px",
                                                                                color: "#707070"
                                                                            }} icon={faPencilAlt}/>
                                                                        </Button>
                                                                    </Td>
                                                                    <Td style={{border: "none"}}>
                                                                        <Button id={user.staffCode + "-del"}
                                                                                onClick={() => handleClickDisableUser(user)}>
                                                                            <CloseOutlined style={{
                                                                                border: "2px solid #de6a79",
                                                                                borderRadius: "50%",
                                                                                color: "#de6a79",
                                                                                marginLeft: "25px"
                                                                            }}/>
                                                                        </Button>
                                                                    </Td>
                                                                </Tr>
                                                            ) : '')
                                                        :
                                                        (
                                                            <Tr id={user.staffCode} key={user.staffCode}>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailUser",
                                                                    user: user
                                                                })}>{user.staffCode}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailUser",
                                                                    user: user
                                                                })}>{user.firstName + ' ' + user.lastName}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailUser",
                                                                    user: user
                                                                })}>{user.username}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailUser",
                                                                    user: user
                                                                })}>
                                                                    {DateFormatterService.dateFormat(user.joinedDate)}
                                                                </Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailUser",
                                                                    user: user
                                                                })}>
                                                                    {StringFormatter.capitalizeFirstLetter(user.roleName) || 'N/A'}
                                                                </Td>
                                                                <Td style={{border: "none"}}>
                                                                    <Button id={user.staffCode + "-edit"}
                                                                            onClick={() => {
                                                                                navigate("/edit-user", {
                                                                                    state: {
                                                                                        staffCode: user.staffCode,
                                                                                        firstName: user.firstName,
                                                                                        lastName: user.lastName,
                                                                                        birthDate: user.birthDate,
                                                                                        joinedDate: user.joinedDate,
                                                                                        gender: user.gender,
                                                                                        roleName: user.roleName
                                                                                    }
                                                                                })
                                                                            }}
                                                                    >
                                                                        <FontAwesomeIcon style={{
                                                                            fontSize: "1.2rem",
                                                                            marginLeft: "25px",
                                                                            color: "#707070"
                                                                        }} icon={faPencilAlt}/>
                                                                    </Button>
                                                                </Td>
                                                                <Td style={{border: "none"}}>
                                                                    <Button id={user.staffCode + "-del"}
                                                                            onClick={() => handleClickDisableUser(user)}>
                                                                        <CloseOutlined style={{
                                                                            border: "2px solid #de6a79",
                                                                            borderRadius: "50%",
                                                                            color: "#de6a79",
                                                                            marginLeft: "25px"
                                                                        }}/>
                                                                    </Button>
                                                                </Td>
                                                            </Tr>
                                                        )
                                                )
                                            }

                                        </Tbody>
                                    )
                            }
                        </Table>
                        <ReactPaginate
                            initialPage={0}
                            forcePage={pageNo}
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={totalPage}
                            onPageChange={changePage}
                            containerClassName={"paginationBtns"}
                            previousLinkClassName={"previousBtn"}
                            nextClassName={"nextBtn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}

                        />
                    </>
            }
            < Modal
                showModal={showModal}
                setShowModal={setShowModal}
                type={typeModal}
                user={danhMucModal}
                setIsReload={setIsReload}
            />
        </Container>
    );
};


export default ManageUserMain;