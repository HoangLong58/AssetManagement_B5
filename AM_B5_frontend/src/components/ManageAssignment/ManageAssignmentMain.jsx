import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import '../../css/main.css';
import {useEffect, useRef, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    CloseOutlined,
    FilterAltOutlined,
    ReplayOutlined,
    SearchOutlined,
} from '@mui/icons-material';
import Modal from './Modal';
import Toast from "./Toast";
import DateFormatterService from '../../service/DateFormatterService';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import AssignmentService from '../../service/AssignmentService';

const Container = styled.div`
    margin-top: 100px;
`;

const H2 = styled.h2`
    padding-left: 29px;
    margin-bottom: 1.2rem;
    color: var(--color-primary);
`;


const PictureNoResultFound = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    padding: var(--card-padding);
    text-align: left;
    transition: all 300ms ease;
    position: relative;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
    &:hover {
        background: var(--color-light);
    }
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
`;

const A = styled.a`
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
`;

const SearchWrapper = styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
    top: 12%;
    left: 57%;
    box-shadow: var(--box-shadow);
    &.active {
        box-shadow: none;
    }
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

const Button = styled.button`
    width: 40px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    height: 43px;
    width: 250px;
`;

const FilterTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-radius: 5px;
`;

const FilterSpan = styled.span`
    display: block;
    min-width: 175px;
    padding: 10px 0px 10px 20px;
`;
const FilterUl = styled.ul`
    background-color: #f5f5f5;
    position: absolute;
    top: 43px;
    left: 0px;
    width: 100%;
    max-height: 240px;
    overflow-y: auto;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 10;
`;
const FilterLi = styled.li`
    padding-left: 20px;
`;
const FilterCheckbox = styled.input`
    accent-color: red;
`;

const FilterIcon = styled.div`
    border-left: 1px solid #b5b5b5;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Select = styled.select`
    border-radius: 5px;
    padding: 10px;
`;

const OptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
    padding-left: 29px;
`;

const RightOption = styled.div`
    display: flex;
    flex-direction: row;
`;

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

const AddContainer = styled.div`
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
`;

const Item = styled.div`
    width: 220spx;
    height: 43px;
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
`;

const Th = styled.th`
    border-bottom: 1px solid #34383c;
    min-width: 50px;
    color: #34383c;
`;

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ThSpan = styled.span``;

const ThSortIcon = styled.div``;

const Label = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`;

const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
`;

const InputDate = styled.input`
    border: 1px solid #bebebe;
    min-width: 200px;
    height: 43px;
    margin: 0px 30px 0px 0px;
    outline: none;
    color: #191919;
    border-radius: 5px;
    padding: 0px 10px;
    box-sizing: border-box;
    position: relative;
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        left: 159px;
        width: 1px;
        height: 79px;
        background-color: #bebebe;
    }
    &::before {
        content: "Assigned Date";
        display: none;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 2;
        width: 50%;
        height: 100%;
        background-color: white;
        text-align: center;
        padding: 12px 0px 0px 5px;
    }
    &.nolabel {
        &::before { 
            display: block;
        }
    }
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


const ManageAssignmentMain = () => {
    const navigate = useNavigate();

    const [isSortNo, setIsSortNo] = useState(false);
    const [isSortAssetCode, setIsSortAssetCode] = useState(false);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortAssignedTo, setIsSortAssignedTo] = useState(false);
    const [isSortAssignedBy, setIsSortAssignedBy] = useState(false);
    const [isSortAssignedDate, setIsSortAssignedDate] = useState(false);
    const [isSortState, setIsSortState] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = useState('all')
    const [date, setDate] = useState('')
    const [pageNo, setPageNo] = useState(0)
    const [totalPage, setTotalPage] = useState()
    const [searching, setSearching] = useState('')
    const [assignments, setAssignment] = useState([])
    const [errMess, setErrMess] = useState('')
    const [totalElements, setTotalElements] = useState(0)
    const [pageSize, setPageSize] = useState(0)
    const [order, setOrder] = useState(0)
    const [orderState, setOrderState] = useState("ASC")
    const [states, setStates] = useState(["accepted", "declined", "waiting_for_acceptance"])

    const [selected, setSelected] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState('');
    const [danhMucModal, setDanhMucModal] = useState(null);
    const [isReloadPage, setIsReloadPage] = useState(false);

    const [emptyTotalElements, setEmptyTotalElements] = useState();

    var savedAssignment = {}
    savedAssignment = JSON.parse(localStorage.getItem('savedAssignment'));
    window.onunload = () => {
        window.localStorage.removeItem('savedAssignment');
    }

    const openModal = (modal) => {
        setShowModal((prev) => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.assignment);
    };

    const [dataToast, setDataToast] = useState({message: 'alo alo', type: 'success'});
    const toastRef = useRef(null);

    const showToastFromOut = (dataShow) => {
        setDataToast(dataShow);
        toastRef.current.show();
    };

    const handleClickFilterState = () => {
        var checkList = document.getElementById('ManageAsset_FilterState');
        if (checkList.classList.contains('visible')) checkList.classList.remove('visible');
        else checkList.classList.add('visible');
    };
    const handleClickFilterCategory = () => {
        var checkList = document.getElementById('ManageAsset_FilterCategory');
        if (checkList.classList.contains('visible')) checkList.classList.remove('visible');
        else checkList.classList.add('visible');
    };

    useEffect(() => {
        setIsLoading(true);
        const dateInput = document.getElementById('assignedDate').value
        setDate(dateInput)
        const searchText = document.getElementById('searchBar').value
        setSearching(searchText)

        AssignmentService.filterAssignment(states, searchText, dateInput, pageNo)
            .then(res => {
                if (res.data.totalElements === 0) {
                    setEmptyTotalElements(true);
                } else {
                    setEmptyTotalElements(false);
                }
                setAssignment(res.data.assignmentContent)
                setPageNo(res.data.pageNo)
                setTotalPage(res.data.totalPages)
                setTotalElements(res.data.totalElements)
                setPageSize(res.data.pageSize)
                setOrder(res.data.pageSize * res.data.pageNo + 1)
                setIsLoading(false);
            })
            .catch(err => {
            })
    }, [pageNo, isReloadPage])


    const handleFilter = (e) => {
        const search = document.getElementById('searchBar').value
        setSearching(search)
        const stateFitler = e.target.value
        var array = [""]
        if (stateFitler === "all") {
            setStates(["accepted", "declined", "waiting_for_acceptance"])
            array = ["accepted", "declined", "waiting_for_acceptance"]
        } else {
            array.push(stateFitler)
            setStates(array)
        }

        setPageNo(0)
        setIsLoading(true);

        AssignmentService.filterAssignment(array, search, date, 0)
            .then(res => {
                if (res.data.totalElements === 0) {
                    setEmptyTotalElements(true);
                } else {
                    setEmptyTotalElements(false);
                }
                if (res.status === 200) {
                    setAssignment(res.data.assignmentContent)
                    setPageNo(res.data.pageNo)
                    setTotalPage(res.data.totalPages)
                    setTotalElements(res.data.totalElements)
                    setPageSize(res.data.pageSize)
                    setOrder(res.data.pageSize * res.data.pageNo + 1)
                    setIsLoading(false);
                }
            })
            .catch(err => {
            })
    }

    const handleChooseDate = (e) => {
        setErrMess('')
        const choosenDate = e.target.value
        setDate(choosenDate)
        setPageNo(0)
        setIsLoading(true);

        AssignmentService.filterAssignment(states, searching, choosenDate, 0)
            .then(res => {
                if (res.data.totalElements === 0) {
                    setEmptyTotalElements(true);
                } else {
                    setEmptyTotalElements(false);
                }
                if (res.status === 200) {
                    setAssignment(res.data.assignmentContent)
                    setPageNo(res.data.pageNo)
                    setTotalPage(res.data.totalPages)
                    setTotalElements(res.data.totalElements)
                    setPageSize(res.data.pageSize)
                    setOrder(res.data.pageSize * res.data.pageNo + 1)
                    setIsLoading(false);
                }
            })
            .catch(err => {
                const validation = err.response.data
                if (validation) {
                    setErrMess(validation.message.replaceAll('.', ' '))
                }
            })
    }

    const searchingHandler = (e) => {
        setErrMess('')
        const dateChosen = document.getElementById('assignedDate').value
        setDate(dateChosen)
        let text = ""
        if (e) {
            if (e.target.value === "") {
                text = ""
                setSearching(text)
                AssignmentService.filterAssignment(states, text, dateChosen, 0)
                    .then(res => {
                        if (res.data.totalElements === 0) {
                            setEmptyTotalElements(true);
                        } else {
                            setEmptyTotalElements(false);
                        }
                        setAssignment(res.data.assignmentContent)
                        setPageNo(res.data.pageNo)
                        setTotalPage(res.data.totalPages)
                        setTotalElements(res.data.totalElements)
                        setPageSize(res.data.pageSize)
                        setOrder(res.data.pageSize * res.data.pageNo + 1)
                        setIsLoading(false);
                    })
                    .catch(err => {
                    })
            }
        } else {
            text = document.getElementById('searchBar').value
            setSearching(text)
            setIsLoading(true);
            AssignmentService.filterAssignment(states, text, dateChosen, 0)
                .then(res => {
                    setAssignment(res.data.assignmentContent)
                    if (res.data.totalElements === 0) {
                        setEmptyTotalElements(true);
                    } else {
                        setEmptyTotalElements(false);
                    }
                    setPageNo(res.data.pageNo)
                    setTotalPage(res.data.totalPages)
                    setTotalElements(res.data.totalElements)
                    setPageSize(res.data.pageSize)
                    setOrder(res.data.pageSize * res.data.pageNo + 1)
                    setIsLoading(false);
                })
                .catch(err => {
                })
        }
    }

    const changePage = ({selected}) => {
        setPageNo(selected)
    }

    const sorting = (col) => {
        if (orderState === "ASC") {
            const sorted = [...assignments].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setAssignment(sorted)
            setOrderState("DSC")
        }
        if (orderState === "DSC") {
            const sorted = [...assignments].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setAssignment(sorted)
            setOrderState("ASC")
        }
    }

    return (
        <Container>
            <H2>Assignment List: </H2> <br/>
            <a style={{color: "red", fontWeight: "500", marginLeft: "20px"}}>{errMess} </a>
            <OptionContainer>

                <FilterContainer id="ManageAsset_FilterState" className="dropdown-check-list" tabindex="100">
                    <FilterTitle
                        className="anchor"
                        onClick={() => {
                            handleClickFilterState();
                        }}
                        style={{width: "100%"}}
                    >
                        <FilterSpan>State</FilterSpan>
                        <FilterIcon>
                            <FilterAltOutlined/>
                        </FilterIcon>
                    </FilterTitle>
                    <FilterUl className="items" id='filter'>
                        <Label>
                            <FilterLi>
                                <FilterCheckbox value="all" id="filterAll"
                                                type="checkbox"
                                                onChange={(e) => handleFilter(e)}
                                                checked={states.length === 0 || states.length === 3}
                                />
                            </FilterLi>
                            <LiSpan>All</LiSpan>
                        </Label>

                        <Label>
                            <FilterLi>
                                <FilterCheckbox
                                    type="checkbox" value="accepted" id="filterAccepted"
                                    checked={states.includes("accepted")}
                                    onChange={(e) => handleFilter(e)}
                                />
                            </FilterLi>
                            <LiSpan>Accepted</LiSpan>
                        </Label>

                        <Label>
                            <FilterLi>
                                <FilterCheckbox value="declined" id="filterDeclined"
                                                type="checkbox"
                                                checked={states.includes("declined")}
                                                onChange={(e) => handleFilter(e)}
                                />
                            </FilterLi>
                            <LiSpan>Declined</LiSpan>
                        </Label>

                        <Label>
                            <FilterLi>
                                <FilterCheckbox value="waiting_for_acceptance" id="filterWaiting"
                                                type="checkbox"
                                                checked={states.includes("waiting_for_acceptance")}
                                                onChange={(e) => handleFilter(e)}
                                />
                            </FilterLi>
                            <LiSpan>Waiting for acceptance</LiSpan>
                        </Label>

                    </FilterUl>
                </FilterContainer>
                <InputDate id='assignedDate' type="date"
                           onChange={(e) => {
                               handleChooseDate(e)
                           }}
                           className={date ? "borderPrimary" : "borderPrimary nolabel"}
                ></InputDate>


                <RightOption>
                    <SearchContainer>
                        <Input id='searchBar' type="text" onChange={(e) => searchingHandler(e)}
                        />
                        <SearchIcon onClick={() => searchingHandler()}>
                            <SearchOutlined/>
                        </SearchIcon>
                    </SearchContainer>
                    <AddContainer id='btnAddAssignment'>
                        <Item className="add-product" onClick={() => navigate('/create-new-assignment')}>
                            <h3>Create new assignment</h3>
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
                                            onClick={() => {
                                            }}
                                        >
                                            <ThSpan>No.</ThSpan>
                                            <ThSortIcon>
                                                {isSortNo ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => {
                                                setIsSortAssetCode(prev => !prev)
                                                sorting("assetCode")
                                            }}
                                        >
                                            <ThSpan>Asset Code</ThSpan>
                                            <ThSortIcon>
                                                {isSortAssetCode ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => {
                                                setIsSortAssetName(prev => !prev)
                                                sorting("assetName")
                                            }}
                                        >
                                            <ThSpan>Asset Name</ThSpan>
                                            <ThSortIcon>
                                                {isSortAssetName ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => {
                                                setIsSortAssignedTo(prev => !prev)
                                                sorting("assignedTo")
                                            }}
                                        >
                                            <ThSpan>Assigned to</ThSpan>
                                            <ThSortIcon>
                                                {isSortAssignedTo ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => {
                                                setIsSortAssignedBy(prev => !prev)
                                                sorting("assignedBy")
                                            }}
                                        >
                                            <ThSpan>Assigned By</ThSpan>
                                            <ThSortIcon>
                                                {isSortAssignedBy ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => {
                                                setIsSortAssignedDate(prev => !prev)
                                                sorting("assignedDate")
                                            }}
                                        >
                                            <ThSpan>Assigned Date</ThSpan>
                                            <ThSortIcon>
                                                {isSortAssignedDate ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                            </ThSortIcon>
                                        </ThContainer>
                                    </Th>
                                    <Th>
                                        <ThContainer
                                            onClick={() => {
                                                setIsSortState(prev => !prev)
                                                sorting("state")
                                            }}
                                        >
                                            <ThSpan>State</ThSpan>
                                            <ThSortIcon>
                                                {isSortState ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
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
                                        <Tbody id="manage-assignment-main-tbody-id">
                                            {savedAssignment ?
                                                (
                                                    <Tr key={savedAssignment.assetCode + "-" + savedAssignment.assignedTo + "-" + savedAssignment.assignedDate}
                                                        id={savedAssignment.assetCode + "-" + savedAssignment.assignedTo + "-" + savedAssignment.assignedDate}
                                                    >
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{order}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{savedAssignment.assetCode}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{savedAssignment.assetName}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{savedAssignment.assignedTo}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{savedAssignment.assignedBy}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{DateFormatterService.dateFormat(savedAssignment.assignedDate)}</Td>
                                                        <Td onClick={() => openModal({
                                                            type: "detailAssignment", assignment: {
                                                                assetCode: savedAssignment.assetCode,
                                                                assetName: savedAssignment.assetName,
                                                                specification: savedAssignment.assetSpecification,
                                                                assignedTo: savedAssignment.assignedTo,
                                                                assignedBy: savedAssignment.assignedBy,
                                                                assignedDate: DateFormatterService.dateFormat(savedAssignment.assignedDate),
                                                                state: savedAssignment.state,
                                                                note: savedAssignment.note
                                                            }
                                                        })}>{savedAssignment.state}</Td>
                                                        <Td style={{border: 'none'}}>
                                                            <Button id={savedAssignment.assetCode + '-edit'}
                                                                    disabled={savedAssignment.state !== "Waiting for acceptance"}
                                                                    onClick={(e) => {
                                                                        navigate("/edit-assignment"
                                                                            , {
                                                                                state: {
                                                                                    assetCode: savedAssignment.assetCode,
                                                                                    assetName: savedAssignment.assetName
                                                                                    ,
                                                                                    assignedTo: savedAssignment.assignedTo,
                                                                                    assignedDate: savedAssignment.assignedDate
                                                                                    ,
                                                                                    note: savedAssignment.note,
                                                                                    firstName: savedAssignment.assignedToFirstname
                                                                                    ,
                                                                                    lastName: savedAssignment.assignedToLastname
                                                                                    ,
                                                                                    staffCode: savedAssignment.assignedToStaffCode
                                                                                }
                                                                            })
                                                                    }}>
                                                                <FontAwesomeIcon
                                                                    style={{
                                                                        fontSize: '1.2rem',
                                                                        marginLeft: '15px',
                                                                        color: savedAssignment.state === "Waiting for acceptance" ? '#707070' : '#b6b6b6'
                                                                    }}
                                                                    icon={faPencilAlt}
                                                                />
                                                            </Button>
                                                        </Td>
                                                        <Td style={{border: 'none'}}>
                                                            <Button id={savedAssignment.assetCode + '-reject'}
                                                                    disabled={savedAssignment.state === "Accepted" ? true : false}
                                                                    onClick={() => {
                                                                        openModal({
                                                                            type: "confirmDeleteAssignment",
                                                                            assignment: {
                                                                                assetCode: savedAssignment.assetCode,
                                                                                assignedTo: savedAssignment.assignedTo,
                                                                                assignedDate: savedAssignment.assignedDate
                                                                            }
                                                                        });
                                                                    }}
                                                            >
                                                                <CloseOutlined
                                                                    style={{
                                                                        border: savedAssignment.state === "Accepted" ? '2px solid #efbec4' : '2px solid #de6a79',
                                                                        borderRadius: '50%',
                                                                        color: savedAssignment.state === "Accepted" ? '#efbec4' : '#de6a79',
                                                                        marginLeft: '15px',
                                                                    }}
                                                                />
                                                            </Button>
                                                        </Td>
                                                        <Td style={{border: 'none'}}>
                                                            <Button id={savedAssignment.assetCode + '-request'}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        openModal({
                                                                            type: "returningRequestAdmin",
                                                                            assignment: savedAssignment
                                                                        });
                                                                    }}
                                                                    attr
                                                                    disabled={savedAssignment.requestReturningId !== null || savedAssignment.state === 'Waiting for acceptance' || savedAssignment.state === 'Declined' ? true : false}
                                                            >
                                                                <ReplayOutlined
                                                                    style={{color: savedAssignment.requestReturningId !== null || savedAssignment.state === 'Waiting for acceptance' || savedAssignment.state === 'Declined' ? '#bcbcbc' : ''}}/>
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ) : ''
                                            }
                                            {
                                                assignments.map((ass, index) =>
                                                    savedAssignment ?
                                                        ((savedAssignment.assetCode !== ass.assetCode || savedAssignment.assignedTo !== ass.assignedTo || savedAssignment.assignedDate !== ass.assignedDate) ?
                                                            (
                                                                <Tr key={ass.assetCode + "-" + ass.assignedTo + "-" + ass.assignedDate}
                                                                    id={ass.assetCode + "-" + ass.assignedTo + "-" + ass.assignedDate}
                                                                >
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{index + order + 1}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{ass.assetCode}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{ass.assetName}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{ass.assignedTo}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{ass.assignedBy}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{DateFormatterService.dateFormat(ass.assignedDate)}</Td>
                                                                    <Td onClick={() => openModal({
                                                                        type: "detailAssignment", assignment: {
                                                                            assetCode: ass.assetCode,
                                                                            assetName: ass.assetName,
                                                                            specification: ass.assetSpecification,
                                                                            assignedTo: ass.assignedTo,
                                                                            assignedBy: ass.assignedBy,
                                                                            assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                            state: ass.state,
                                                                            note: ass.note
                                                                        }
                                                                    })}>{ass.state}</Td>
                                                                    <Td style={{border: 'none'}}>
                                                                        <Button id={ass.assetCode + '-edit'}
                                                                                disabled={ass.state !== "Waiting for acceptance"}
                                                                                onClick={(e) => {
                                                                                    navigate("/edit-assignment"
                                                                                        , {
                                                                                            state: {
                                                                                                assetCode: ass.assetCode,
                                                                                                assetName: ass.assetName
                                                                                                ,
                                                                                                assignedTo: ass.assignedTo,
                                                                                                assignedDate: ass.assignedDate,
                                                                                                note: ass.note
                                                                                                ,
                                                                                                firstName: ass.assignedToFirstname
                                                                                                ,
                                                                                                lastName: ass.assignedToLastname
                                                                                                ,
                                                                                                staffCode: ass.assignedToStaffCode
                                                                                            }
                                                                                        })
                                                                                }}>
                                                                            <FontAwesomeIcon
                                                                                style={{
                                                                                    fontSize: '1.2rem',
                                                                                    marginLeft: '15px',
                                                                                    color: ass.state === "Waiting for acceptance" ? '#707070' : '#b6b6b6'
                                                                                }}
                                                                                icon={faPencilAlt}
                                                                            />
                                                                        </Button>
                                                                    </Td>
                                                                    <Td style={{border: 'none'}}>
                                                                        <Button id={ass.assetCode + '-reject'}
                                                                                disabled={ass.state === "Accepted" ? true : false}
                                                                                onClick={() => {
                                                                                    openModal({
                                                                                        type: "confirmDeleteAssignment",
                                                                                        assignment: {
                                                                                            assetCode: ass.assetCode,
                                                                                            assignedTo: ass.assignedTo,
                                                                                            assignedDate: ass.assignedDate
                                                                                        }
                                                                                    });
                                                                                }}
                                                                        >
                                                                            <CloseOutlined
                                                                                style={{
                                                                                    border: ass.state === "Accepted" ? '2px solid #efbec4' : '2px solid #de6a79',
                                                                                    borderRadius: '50%',
                                                                                    color: ass.state === "Accepted" ? '#efbec4' : '#de6a79',
                                                                                    marginLeft: '15px',
                                                                                }}
                                                                            />
                                                                        </Button>
                                                                    </Td>
                                                                    <Td style={{border: 'none'}}>
                                                                        <Button id={ass.assetCode + '-request'}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    openModal({
                                                                                        type: "returningRequestAdmin",
                                                                                        assignment: ass
                                                                                    });
                                                                                }}
                                                                                attr
                                                                                disabled={ass.requestReturningId !== null || ass.state === 'Waiting for acceptance' || ass.state === 'Declined' ? true : false}
                                                                        >
                                                                            <ReplayOutlined
                                                                                style={{color: ass.requestReturningId !== null || ass.state === 'Waiting for acceptance' || ass.state === 'Declined' ? '#bcbcbc' : '#5b6ee3'}}/>
                                                                        </Button>
                                                                    </Td>
                                                                </Tr>
                                                            ) : '')
                                                        : (
                                                            <Tr key={ass.assetCode + "-" + ass.assignedTo + "-" + ass.assignedDate}
                                                                id={ass.assetCode + "-" + ass.assignedTo + "-" + ass.assignedDate}
                                                            >
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{index + order}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{ass.assetCode}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{ass.assetName}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{ass.assignedTo}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{ass.assignedBy}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{DateFormatterService.dateFormat(ass.assignedDate)}</Td>
                                                                <Td onClick={() => openModal({
                                                                    type: "detailAssignment", assignment: {
                                                                        assetCode: ass.assetCode,
                                                                        assetName: ass.assetName,
                                                                        specification: ass.assetSpecification,
                                                                        assignedTo: ass.assignedTo,
                                                                        assignedBy: ass.assignedBy,
                                                                        assignedDate: DateFormatterService.dateFormat(ass.assignedDate),
                                                                        state: ass.state,
                                                                        note: ass.note
                                                                    }
                                                                })}>{ass.state}</Td>
                                                                <Td style={{border: 'none'}}>
                                                                    <Button id={ass.assetCode + '-edit'}
                                                                            disabled={ass.state !== "Waiting for acceptance"}
                                                                            onClick={(e) => {
                                                                                navigate("/edit-assignment"
                                                                                    , {
                                                                                        state: {
                                                                                            assetCode: ass.assetCode,
                                                                                            assetName: ass.assetName
                                                                                            ,
                                                                                            assignedTo: ass.assignedTo,
                                                                                            assignedDate: ass.assignedDate,
                                                                                            note: ass.note
                                                                                            ,
                                                                                            firstName: ass.assignedToFirstname
                                                                                            ,
                                                                                            lastName: ass.assignedToLastname
                                                                                            ,
                                                                                            staffCode: ass.assignedToStaffCode
                                                                                        }
                                                                                    })
                                                                            }}>
                                                                        <FontAwesomeIcon
                                                                            style={{
                                                                                fontSize: '1.2rem',
                                                                                marginLeft: '15px',
                                                                                color: ass.state === "Waiting for acceptance" ? '#707070' : '#b6b6b6'
                                                                            }}
                                                                            icon={faPencilAlt}
                                                                        />
                                                                    </Button>
                                                                </Td>
                                                                <Td style={{border: 'none'}}>
                                                                    <Button id={ass.assetCode + '-reject'}
                                                                            disabled={ass.state === "Accepted" ? true : false}
                                                                            onClick={() => {
                                                                                openModal({
                                                                                    type: "confirmDeleteAssignment",
                                                                                    assignment: {
                                                                                        assetCode: ass.assetCode,
                                                                                        assignedTo: ass.assignedTo,
                                                                                        assignedDate: ass.assignedDate
                                                                                    }
                                                                                });
                                                                            }}
                                                                    >
                                                                        <CloseOutlined
                                                                            style={{
                                                                                border: ass.state === "Accepted" ? '2px solid #efbec4' : '2px solid #de6a79',
                                                                                borderRadius: '50%',
                                                                                color: ass.state === "Accepted" ? '#efbec4' : '#de6a79',
                                                                                marginLeft: '15px',
                                                                                cursor: ass.state === "Accepted" ? 'not-allowed' : '',
                                                                            }}
                                                                        />
                                                                    </Button>
                                                                </Td>
                                                                <Td style={{border: 'none'}}>
                                                                    <Button id={ass.assetCode + '-request'}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                openModal({
                                                                                    type: "returningRequestAdmin",
                                                                                    assignment: ass
                                                                                });
                                                                            }}
                                                                            attr
                                                                            disabled={ass.requestReturningId !== null || ass.state === 'Waiting for acceptance' || ass.state === 'Declined' ? true : false}
                                                                    >
                                                                        <ReplayOutlined
                                                                            style={{color: ass.requestReturningId !== null || ass.state === 'Waiting for acceptance' || ass.state === 'Declined' ? '#bcbcbc' : '#5b6ee3'}}/>
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
                        <Modal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            type={typeModal}
                            setIsReloadPage={setIsReloadPage}
                            assignment={danhMucModal}
                            showToastFromOut={showToastFromOut}
                        />

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

            < Toast
                ref={toastRef}
                dataToast={dataToast}
            />
        </Container>
    );
};

export default ManageAssignmentMain;
