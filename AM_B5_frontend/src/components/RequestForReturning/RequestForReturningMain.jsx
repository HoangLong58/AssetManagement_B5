import styled from 'styled-components';
import '../../css/main.css';
import {useEffect, useRef, useState} from 'react';

import Modal from './Modal';
import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    CheckOutlined,
    CloseOutlined,
    FilterAltOutlined,
    SearchOutlined,
} from '@mui/icons-material';
import DateFormatterService from '../../service/DateFormatterService';
import * as RequestReturningService from '../../service/RequestReturningService';
import PagingItem from '../ManageAsset/PagingItem';
import Toast from '../ManageAssignment/Toast';

const Container = styled.div`
    margin-top: 100px;
`;

const H2 = styled.h2`
    padding-left: 29px;
    margin-bottom: 1.2rem;
    color: var(--color-primary);
`;

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

const LeftOption = styled.div`
    display: flex;
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
    margin: 0px 30px 0px 30px;
    outline: none;
    color: #191919;
    border-radius: 5px;
    padding: 0px 10px;
    box-sizing: border-box;
    position: relative;
    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0px;
        left: 159px;
        width: 1px;
        height: 79px;
        background-color: #bebebe;
    }
    &::before {
        content: 'Returned Date';
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
`;

const PictureNoResultFound = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Img = styled.img`
    width: 500px;
    max-height: 600px;
    object-fit: cover;
`;

const H1NoResultFound = styled.h1`
    letter-spacing: 2px;
    font-size: 1.3rem;
    color: var(--color-primary);
`;

const RequestForReturningMain = () => {
    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState('');
    const [danhMucModal, setDanhMucModal] = useState(null);
    const [isReloadPage, setIsReloadPage] = useState(false);
    const [emptyTotalElements, setEmptyTotalElements] = useState();

    const [dataToast, setDataToast] = useState({
        message: 'alo alo',
        type: 'success',
    });
    const toastRef = useRef(null);
    const [returningId, setReturningId] = useState();

    const openModal = (modal) => {
        setShowModal((prev) => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.requestPayload);
    };

    const showToastFromOut = (dataShow) => {
        setDataToast(dataShow);
        toastRef.current.show();
    };

    const handleClickFilterState = () => {
        var checkList = document.getElementById('RequestForReturning_FilterState');
        if (checkList.classList.contains('visible')) checkList.classList.remove('visible');
        else checkList.classList.add('visible');
    };

    const [isSortNo, setIsSortNo] = useState(false);
    const [isSortAssetCode, setIsSortAssetCode] = useState(false);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortRequestedBy, setIsSortRequestedBy] = useState(false);
    const [isSortAssignedDate, setIsSortAssignedDate] = useState(false);
    const [isSortAcceptedBy, setIsSortAcceptedBy] = useState(false);
    const [isSortReturnedDate, setIsSortReturnedDate] = useState(false);
    const [isSortState, setIsSortState] = useState(false);

    let PAGE_SIZE = 20;

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listStates, setListState] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('assignment.asset.code');
    const [sortDirection, setSortDirection] = useState('ASC');
    const [returnDate, setReturnDate] = useState('');
    const [listRequestReturning, setListRequestReturning] = useState([]);
    const [checkSearchState, setCheckSearchState] = useState(['WAITING_FOR_RETURNING', 'COMPLETED']);
    const [isSearch, setIsSearch] = useState(false);
    const [count, setCount] = useState(0);

    const prevCount = useRef();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (page > 1) {
            prevCount.current = PAGE_SIZE * page - PAGE_SIZE + 1;
        } else {
            prevCount.current = 1;
        }
    }, [count, page]);

    useEffect(() => {
        setIsLoading(true);
        const getStates = async () => {
            const result = await RequestReturningService.getStates();
            setListState(result.data.listStates);
            return result.data.listStates;
        };
        getStates();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const getListRequestReturning = async () => {
            const result = await RequestReturningService.getListRequestReturning(
                page,
                PAGE_SIZE,
                keyword,
                sortBy,
                sortDirection,
                returnDate,
                checkSearchState.toString(),
            );
            setListRequestReturning(result.data.list);
            setTotalPages(result.data.totalPages);
            if (page > totalPages && totalPages > 0) {
                setPage(totalPages);
            }
            if (result.data.list.length === 0) {
                setEmptyTotalElements(true);
            } else {
                setEmptyTotalElements(false);
            }
            setIsLoading(false);
        };
        getListRequestReturning();
    }, [page, isSearch, totalPages, PAGE_SIZE, returnDate, checkSearchState, sortBy, sortDirection, isReloadPage]);

    const showState = () => {
        const Items = [];
        for (let i = 0; i < Object.keys(listStates).length; ++i) {
            Items.push(
                <Label id={'Label_' + Object.keys(listStates)[i]} key={Object.keys(listStates)[i]}>
                    <FilterLi id={'FilterLi_' + Object.keys(listStates)[i]}>
                        <FilterCheckbox
                            id={'FilterCheckbox_' + Object.keys(listStates)[i]}
                            value={Object.keys(listStates)[i]}
                            key={Object.keys(listStates)[i]}
                            type="checkbox"
                            name="state"
                            checked={checkSearchState === Object.keys(listStates)[i]}
                            onChange={() => setCheckSearchState(Object.keys(listStates)[i])}
                        />
                    </FilterLi>
                    <LiSpan id={'LiSpan_' + Object.keys(listStates)[i]}>{Object.values(listStates)[i]}</LiSpan>
                </Label>,
            );
        }
        return Items;
    };

    const handleChangeSortDirection = (sortDirection) => {
        if (sortDirection === 'DESC') {
            setSortDirection('ASC');
        } else if (sortDirection === 'ASC') {
            setSortDirection('DESC');
        }
    };

    const handleClickSearch = () => {
        setIsSearch(true);
        setIsLoading(true);
        const getListRequestReturning = async () => {
            const result = await RequestReturningService.getListRequestReturning(
                page,
                PAGE_SIZE,
                keyword,
                sortBy,
                sortDirection,
                returnDate,
                checkSearchState.toString(),
            );
            setListRequestReturning(result.data.list);
            setTotalPages(result.data.totalPages);
            if (page > totalPages && totalPages > 0) {
                setPage(totalPages);
            }
            if (result.data.list.length === 0) {
                setEmptyTotalElements(true);
            } else {
                setEmptyTotalElements(false);
            }
            setIsLoading(false);
        };
        getListRequestReturning();
        setIsSearch(false);
    };

    useEffect(() => {
        if (keyword == '') {
            handleClickSearch();
        }
    }, [keyword]);

    return (
        <Container id="container_manager_request_returning">
            <H2 id="H2_request_list">Request List </H2> <br/>
            <a id="a_request_list" style={{color: 'red', fontWeight: '500', marginLeft: '20px'}}></a>
            <OptionContainer id="option_container_manager_request_returning">
                <LeftOption id="left_option_manager_request_returning">
                    <FilterContainer
                        id="RequestForReturning_FilterState"
                        className="dropdown-check-list"
                        tabindex="100"
                    >
                        <FilterTitle
                            id="filter_title_request_returning"
                            className="anchor"
                            onClick={() => {
                                handleClickFilterState();
                            }}
                            style={{width: '100%'}}
                        >
                            <FilterSpan id="FilterSpan_State">State</FilterSpan>
                            <FilterIcon id="FilterIcon">
                                <FilterAltOutlined/>
                            </FilterIcon>
                        </FilterTitle>
                        <FilterUl className="items" id="filterUl">
                            <Label id="label_All">
                                <FilterLi id="FilterLi_All">
                                    <FilterCheckbox
                                        id="FilterCheckbox_All"
                                        type="checkbox"
                                        checked={checkSearchState.length == Object.keys(listStates).length}
                                        onChange={() => setCheckSearchState(['WAITING_FOR_RETURNING', 'COMPLETED'])}
                                    />
                                </FilterLi>
                                <LiSpan id="LiSpan_All">All</LiSpan>
                            </Label>
                            {showState()}
                        </FilterUl>
                    </FilterContainer>
                    <InputDate
                        id="assignedDate"
                        type="date"
                        onChange={(e) => setReturnDate(e.target.value)}
                        className={returnDate ? 'borderPrimary' : 'borderPrimary nolabel'}
                    ></InputDate>
                </LeftOption>

                <RightOption id="right_option_manager_request_returning">
                    <SearchContainer id="searchContainer_request_returning">
                        <Input
                            id="searchBar"
                            type="text"
                            value={keyword || ''}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleClickSearch();
                                }
                            }}
                        />
                        <SearchIcon id="btn_search" onClick={() => handleClickSearch()}>
                            <SearchOutlined/>
                        </SearchIcon>
                    </SearchContainer>
                </RightOption>
            </OptionContainer>
            {emptyTotalElements ? (
                <PictureNoResultFound id="No_Result_Found_Picture">
                    <Img
                        src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000"
                        alt="Not Found Result"
                    />
                    <H1NoResultFound>No result found</H1NoResultFound>
                </PictureNoResultFound>
            ) : (
                <>
                    <Table id="table_manager_request_returning">
                        <Thead id="thead_manager_request_returning">
                            <Tr id="tr_manager_request_returning">
                                <Th id="th_no">
                                    <ThContainer id="ThContainer_no">
                                        <ThSpan id="ThSpan_no">No.</ThSpan>
                                        <ThSortIcon id="ThSortIcon_no">
                                            {isSortNo ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="th_asset_code">
                                    <ThContainer
                                        id="ThContainer_asset_code"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortAssetCode((prev) => !prev);
                                            setSortBy('assignment.asset.code');
                                        }}
                                    >
                                        <ThSpan id="ThSpan_asset_code">Asset Code</ThSpan>
                                        <ThSortIcon id="ThSortIcon_asset_code">
                                            {isSortAssetCode ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="th_asset_name">
                                    <ThContainer
                                        id="ThContainer_asset_name"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortAssetName((prev) => !prev);
                                            setSortBy('assignment.asset.name');
                                        }}
                                    >
                                        <ThSpan id="ThSpan_asset_name">Asset Name</ThSpan>
                                        <ThSortIcon id="ThSortIcon_asset_name">
                                            {isSortAssetName ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="ThSpan_requestedBy_userName">
                                    <ThContainer
                                        id="ThContainer_requestedBy_userName"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortRequestedBy((prev) => !prev);
                                            setSortBy('requestedBy.userName');
                                        }}
                                    >
                                        <ThSpan id="ThSpan_requestedBy_userName">Requested by</ThSpan>
                                        <ThSortIcon id="ThSortIcon_requestedBy_userName">
                                            {isSortRequestedBy ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="ThSpan_assignedDate">
                                    <ThContainer
                                        id="ThContainer_assignedDate"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortAssignedDate((prev) => !prev);
                                            setSortBy('assignment.id.assignedDate');
                                        }}
                                    >
                                        <ThSpan id="ThSpan_assignedDate">Assigned Date</ThSpan>
                                        <ThSortIcon id="ThSortIcon_assignedDate">
                                            {isSortAssignedDate ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="ThSpan_acceptedBy_userName">
                                    <ThContainer
                                        id="ThContainer_acceptedBy_userName"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortAcceptedBy((prev) => !prev);
                                            setSortBy('acceptedBy.userName');
                                        }}
                                    >
                                        <ThSpan id="ThContainer_acceptedBy_userName">Accepted by</ThSpan>
                                        <ThSortIcon id="ThContainer_acceptedBy_userName">
                                            {isSortAcceptedBy ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="Th_returnedDate">
                                    <ThContainer
                                        id="ThContainer_returnedDate"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortReturnedDate((prev) => !prev);
                                            setSortBy('returnedDate');
                                        }}
                                    >
                                        <ThSpan id="ThSpan_returnedDate">Returned Date</ThSpan>
                                        <ThSortIcon id="ThSortIcon_returnedDate">
                                            {isSortReturnedDate ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="Th_state">
                                    <ThContainer
                                        id="ThContainer_state"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortState((prev) => !prev);
                                            setSortBy('state');
                                        }}
                                    >
                                        <ThSpan id="ThSpan_state">State</ThSpan>
                                        <ThSortIcon id="ThSortIcon_state">
                                            {isSortState ? <ArrowDropDownOutlined/> : <ArrowDropUpOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                            </Tr>
                        </Thead>
                        {isLoading ? (
                            <div
                                class="spinner-border text-warning"
                                style={{color: '#e22027', position: 'absolute', left: '50%'}}
                                role="status"
                            >
                                <span class="visually-hidden"></span>
                            </div>
                        ) : (
                            <Tbody id="manage-assignment-main-tbody-id">
                                {listRequestReturning.map((data, index) => (
                                    <Tr key={data.assetCode}>
                                        <Td id={data.id}>{prevCount.current + index}</Td>
                                        <Td id={data.id + '_' + data.assetCode}>{data.assetCode}</Td>
                                        <Td id={data.id + '_' + data.assetName}>{data.assetName}</Td>
                                        <Td id={data.id + '_' + data.requestedBy}>{data.requestedBy}</Td>
                                        <Td id={data.id + '_' + data.assignedDate}>
                                            {DateFormatterService.dateFormat(data.assignedDate)}
                                        </Td>
                                        <Td id={data.id + '_' + data.acceptedBy}>{data.acceptedBy}</Td>
                                        <Td id={data.id + '_' + data.returnedDate}>
                                            {data.returnedDate == null
                                                ? ''
                                                : DateFormatterService.dateFormat(data.returnedDate)}
                                        </Td>
                                        <Td id={data.id + '_' + data.state}>
                                            {RequestReturningService.formatRequestReturningState(data.state)}
                                        </Td>
                                        <Td className="danger" id={'Td_btn_edit_' + data.id}>
                                            <Button
                                                id={'btn_edit_' + data.id}
                                                onClick={() => {
                                                    const requestPayload = {
                                                        assignedTo: data.assignedTo,
                                                        assetCode: data.assetCode,
                                                        assignedDate: data.assignedDate,
                                                    };

                                                    openModal({
                                                        type: 'confirmComplete',
                                                        requestPayload: requestPayload,
                                                    });
                                                }}
                                                disabled={data.state == 'COMPLETED' ? true : false}
                                                style={
                                                    data.state == 'COMPLETED'
                                                        ? {cursor: 'not-allowed'}
                                                        : {cursor: 'pointer'}
                                                }
                                            >
                                                <CheckOutlined
                                                    style={{
                                                        color: data.state == 'COMPLETED' ? '#f6b4b8' : '#e62d37',
                                                    }}
                                                />
                                            </Button>
                                        </Td>
                                        <Td style={{border: 'none'}} id={'td_cancel_' + data.assetCode}>
                                            <Button
                                                id={'btn+delete_' + data.assetCode}
                                                disabled={data.state === 'COMPLETED' ? true : false}
                                                onClick={() => {
                                                    setReturningId(data.id);
                                                    openModal({
                                                        type: 'cancelRequestReturning',
                                                    });
                                                }}
                                            >
                                                <CloseOutlined
                                                    style={{
                                                        color: data.state === 'COMPLETED' ? '909090' : '',
                                                        cursor: data.state === 'COMPLETED' ? 'not-allowed' : '',
                                                    }}
                                                />
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        )}
                    </Table>
                    <Modal
                        id="modal_returning"
                        returningId={returningId}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        type={typeModal}
                        setIsReloadPage={setIsReloadPage}
                        requestPayload={danhMucModal}
                        showToastFromOut={showToastFromOut}
                    />
                    <Toast ref={toastRef} dataToast={dataToast}/>
                    {PagingItem(page, totalPages, setPage)}
                </>
            )}
        </Container>
    );
};

export default RequestForReturningMain;
