import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import '../../css/main.css';
import {useEffect, useRef, useState} from 'react';

import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    CloseOutlined,
    FilterAltOutlined,
    SearchOutlined,
} from '@mui/icons-material';
import Modal from './Modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import * as CategoryService from '../../service/CategoryService';
import * as AssetService from '../../service/AssetService';
import PagingItem from './PagingItem';
import axios from 'axios';
import {AXIOS_API_URL} from '../../constants/Axios';

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

const ButtonDelete = styled.button`
    width: 40px;
    height: 30px;
    border: 2px solid var(--color-danger);
    border-radius: 100%;
    color: var(--color-danger);
    background: var(--color-white);
    padding: 0px;
    outline: none;
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

const Filter = styled.div`
    margin: 20px;
    display: flex;
    border: 1px solid #333;
    border-radius: 5px;
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

const Option = styled.option``;

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
    min-width: 174px;
    height: 40px;
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

const Label = styled.label`
    display: flex;
    flex-direction: row;
    padding: 10px 0px;
`;

const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
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

const ManageAssetMain = () => {
    const [isSortAssetCode, setIsSortAssetCode] = useState(false);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortCategory, setIsSortCategory] = useState(false);
    const [isSortState, setIsSortState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isReloadPage, setIsReloadPage] = useState(false);

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState('');
    const [danhMucModal, setDanhMucModal] = useState(null);

    const [isSearch, setIsSearch] = useState(false);

    const openModal = (modal) => {
        setShowModal((prev) => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.asset);
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

    const arrayState = ['AVAILABLE', 'NOT_AVAILABLE', 'ASSIGNED'];
    const [categories, setCategories] = useState([]);
    const [listState, setListState] = useState([]);
    const [assets, setAssets] = useState([]);
    const [page, setPage] = useState(1);
    const [checkSearchState, setCheckSearchState] = useState(['AVAILABLE', 'NOT_AVAILABLE', 'ASSIGNED']);
    const [keyword, setKeyword] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    let PAGE_SIZE = 20;
    let userId = JSON.parse(localStorage.getItem('user_info')).id;
    const [emptyTotalElements, setEmptyTotalElements] = useState();

    useEffect(() => {
        setIsLoading(true);
        const getAllCategories = async () => {
            const result = await CategoryService.getListCategories();
            setCategories(result.data);
            setIsLoading(false);
            return result.data;
        };
        getAllCategories();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const getListAssetState = async () => {
            const result = await AssetService.getListAssetState();
            setListState(result.data);
            setIsLoading(false);
            return result.data;
        };
        getListAssetState();
    }, []);

    const [sortBy, setSortBy] = useState('code');
    const [sortDirection, setSortDirection] = useState('ASC');

    useEffect(() => {
        setIsLoading(true);
        const getListAsset = async () => {
            const result = await AssetService.getListAsset(
                userId,
                page,
                PAGE_SIZE,
                keyword,
                sortBy,
                sortDirection,
                searchCategory.toString(),
                checkSearchState.toString(),
            );
            setAssets(result.data.list);
            setTotalPages(result.data.totalPages);
            if (page > totalPages && totalPages > 0) {
                setPage(totalPages);
            }
            if (result.data.totalPages == 0 || result.data.list.size == 0) {
                setEmptyTotalElements(true);
            } else {
                setEmptyTotalElements(false);
            }
            setIsLoading(false);
        };
        getListAsset();
    }, [
        isReloadPage,
        page,
        isSearch,
        PAGE_SIZE,
        sortBy,
        sortDirection,
        totalPages,
        searchCategory.toString(),
        checkSearchState.toString(),
    ]);

    const handleChangeCategory = (categoryId) => {
        setSearchCategory((prev) => {
            const isChecked = searchCategory.includes(categoryId);
            if (isChecked) {
                return searchCategory.filter((ob) => ob != categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };
    const handleChangeSearchState = (item) => {
        setCheckSearchState((prev) => {
            const isChecked = checkSearchState.includes(item);
            if (isChecked) {
                return checkSearchState.filter((ob) => ob != item);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleChangeSortDirection = (sortDirection) => {
        if (sortDirection == 'DESC') {
            setSortDirection('ASC');
        }
        if (sortDirection == 'ASC') {
            setSortDirection('DESC');
        }
    };

    let assetSaved = JSON.parse(localStorage.getItem('assetSaved'));

    window.onunload = () => {
        window.localStorage.removeItem('assetSaved');
    };

    const handleClickDeleteAsset = async (asset) => {
        let isHaveAssignment = false;
        const result = await axios
            .get(`${AXIOS_API_URL}/admin/api/assignments/${asset.assetCode}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
                },
            })
            .then((result) => {
                if (result.data.length > 0) {
                    isHaveAssignment = true;
                }
            });

        if (isHaveAssignment) {
            openModal({type: 'canNotDeleteAsset', asset: asset});
        } else {
            openModal({type: 'deleteAsset', asset: asset});
        }
    };

    const handleClickSearch = () => {
        setIsSearch(true);
        const getListAsset = async () => {
            const result = await AssetService.getListAsset(
                userId,
                page,
                PAGE_SIZE,
                keyword,
                sortBy,
                sortDirection,
                searchCategory.toString(),
                checkSearchState.toString(),
            );
            setAssets(result.data.list);
            setTotalPages(result.data.totalPages);
            if (page > totalPages && totalPages > 0) {
                setPage(totalPages);
            }
            if (result.data.totalPages == 0 || result.data.list.size == 0) {
                setEmptyTotalElements(true);
            } else {
                setEmptyTotalElements(false);
            }
            setIsLoading(false);
        };
        getListAsset();
        setIsSearch(false);
    };

    useEffect(() => {
        if (keyword == '') {
            handleClickSearch();
        }
    }, [keyword]);

    return (
        <Container id="asset_list">
            <H2>Asset List</H2>
            <OptionContainer id="option_container">
                <FilterContainer id="ManageAsset_FilterState" className="dropdown-check-list" tabindex="100">
                    <FilterTitle
                        id="btn_click_filter_state"
                        className="anchor"
                        onClick={() => {
                            handleClickFilterState();
                        }}
                        style={{width: '100%'}}
                    >
                        <FilterSpan>State</FilterSpan>
                        <FilterIcon>
                            <FilterAltOutlined/>
                        </FilterIcon>
                    </FilterTitle>
                    <FilterUl className="items" id="filter_by_state">
                        <Label id="label_all_state" onChange={() => setCheckSearchState('')}>
                            <FilterLi id="filterLi_all_state">
                                <FilterCheckbox
                                    type="checkbox"
                                    name="filterType"
                                    value="all"
                                    id="all_state"
                                    checked={
                                        checkSearchState.length == 0 || checkSearchState.length == listState.length
                                    }
                                />
                            </FilterLi>
                            <LiSpan>All</LiSpan>
                        </Label>
                        {listState.map((item) => (
                            <Label key={item}>
                                <FilterLi id="filterLi_by_state">
                                    <FilterCheckbox
                                        checked={checkSearchState.includes(item)}
                                        type="checkbox"
                                        name="filterType"
                                        value={item}
                                        id={item}
                                        onChange={() => handleChangeSearchState(item)}
                                    />
                                </FilterLi>
                                <LiSpan id={'lable_' + item}>{AssetService.formatAssetState(item)}</LiSpan>
                            </Label>
                        ))}
                    </FilterUl>
                </FilterContainer>
                <FilterContainer id="ManageAsset_FilterCategory" className="dropdown-check-list" tabindex="100">
                    <FilterTitle
                        id="btn_filter_category"
                        className="anchor"
                        onClick={() => {
                            handleClickFilterCategory();
                        }}
                        style={{width: '100%'}}
                    >
                        <FilterSpan>Category</FilterSpan>
                        <FilterIcon>
                            <FilterAltOutlined/>
                        </FilterIcon>
                    </FilterTitle>
                    <FilterUl className="items" id="filter_by_category">
                        <Label id="label_search_category" onChange={() => setSearchCategory('')}>
                            <FilterLi id="filterLi_all_category">
                                <FilterCheckbox
                                    checked={searchCategory.length == 0}
                                    type="checkbox"
                                    name="filterType"
                                    value=""
                                    id="all_categories"
                                />
                            </FilterLi>
                            <LiSpan>All</LiSpan>
                        </Label>
                        {categories.map((item) => (
                            <Label key={item.id} id={item.id}>
                                <FilterLi id={'FilterLi_' + item.id}>
                                    <FilterCheckbox
                                        checked={searchCategory.includes(item.id)}
                                        onChange={() => handleChangeCategory(item.id)}
                                        type="checkbox"
                                        name="filterType"
                                        value={item.name}
                                        id={item.id}
                                    />
                                </FilterLi>
                                <LiSpan id={'label_' + item.name}>{item.name}</LiSpan>
                            </Label>
                        ))}
                    </FilterUl>
                </FilterContainer>

                <RightOption id="option_search">
                    <SearchContainer id="search">
                        <Input
                            value={keyword || ''}
                            onChange={(e) => setKeyword(e.target.value)}
                            type="text"
                            id="textSearch"
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
                    <AddContainer id="container_add">
                        <Item id="btn_add" className="add-product" onClick={() => navigate('/create-new-asset')}>
                            <h3>Create new asset</h3>
                        </Item>
                    </AddContainer>
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
                    <Table id="table">
                        <Thead id="thead">
                            <Tr id="trow">
                                <Th id="th_sort_container_code">
                                    <ThContainer
                                        id="sort_container_code"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortAssetCode((prev) => !prev);
                                            setSortBy('code');
                                        }}
                                    >
                                        <ThSpan>Asset Code</ThSpan>
                                        <ThSortIcon id="sort_by_code">
                                            {isSortAssetCode ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="th_sort_container_name">
                                    <ThContainer
                                        id="sort_container_name"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortAssetName((prev) => !prev);
                                            setSortBy('name');
                                        }}
                                    >
                                        <ThSpan>Asset Name</ThSpan>
                                        <ThSortIcon id="sort_by_name">
                                            {isSortAssetName ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="th_sort_container_category">
                                    <ThContainer
                                        id="sort_container_category"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortCategory((prev) => !prev);
                                            setSortBy('category');
                                        }}
                                    >
                                        <ThSpan>Category</ThSpan>
                                        <ThSortIcon id="sort_by_category">
                                            {isSortCategory ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                        </ThSortIcon>
                                    </ThContainer>
                                </Th>
                                <Th id="th_sort_container_state">
                                    <ThContainer
                                        id="sort_container_state"
                                        onClick={() => {
                                            handleChangeSortDirection(sortDirection);
                                            setIsSortState((prev) => !prev);
                                            setSortBy('state');
                                        }}
                                    >
                                        <ThSpan>State</ThSpan>
                                        <ThSortIcon id="sort_by_state">
                                            {isSortState ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
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
                            <Tbody id="tableAssets">
                                {assetSaved ? (
                                    <Tr key={assetSaved.assetCode} id={'row_' + assetSaved.assetCode}>
                                        <Td
                                            id={'asset_code' + assetSaved.assetCode}
                                            onClick={() => openModal({type: 'detailAsset', asset: assetSaved})}
                                        >
                                            {assetSaved.assetCode}
                                        </Td>
                                        <Td
                                            id={assetSaved.assetCode + assetSaved.assetName}
                                            onClick={() => openModal({type: 'detailAsset', asset: assetSaved})}
                                        >
                                            {assetSaved.assetName}
                                        </Td>
                                        <Td
                                            id={assetSaved.assetCode + assetSaved.categoryName}
                                            onClick={() => openModal({type: 'detailAsset', asset: assetSaved})}
                                        >
                                            {assetSaved.categoryName}
                                        </Td>
                                        <Td
                                            id={assetSaved.assetCode + assetSaved.state}
                                            onClick={() => openModal({type: 'detailAsset', asset: assetSaved})}
                                        >
                                            {AssetService.formatAssetState(assetSaved.state)}
                                        </Td>
                                        <Td style={{border: 'none'}} id={'td_edit_' + assetSaved.assetCode}>
                                            <Button
                                                id={'btn_edit_' + assetSaved.assetCode}
                                                disabled={assetSaved.state === 'ASSIGNED' ? true : false}
                                                onClick={() => {
                                                    navigate('/edit-asset', {
                                                        state: {
                                                            id: assetSaved.assetCode,
                                                            name: assetSaved.assetName,
                                                            category: assetSaved.categoryName,
                                                            spec: assetSaved.specification,
                                                            installedDate: assetSaved.installedDate,
                                                            state: assetSaved.state,
                                                        },
                                                    });
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        marginLeft: '25px',
                                                        color: assetSaved.state === 'ASSIGNED' ? '#b7b7b7' : '#707070',
                                                    }}
                                                    icon={faPencilAlt}
                                                />
                                            </Button>
                                        </Td>
                                        <Td style={{border: 'none'}} id={'td_delete_' + assetSaved.assetCode}>
                                            <Button
                                                id={'btn_delete' + assetSaved.assetCode}
                                                onClick={() => handleClickDeleteAsset(assetSaved)}
                                            >
                                                <CloseOutlined
                                                    style={{
                                                        border:
                                                            assetSaved.state === 'ASSIGNED'
                                                                ? '2px solid #efbec4'
                                                                : '2px solid #de6a79',
                                                        borderRadius: '50%',
                                                        color: assetSaved.state === 'ASSIGNED' ? '#efbec4' : '#de6a79',
                                                        marginLeft: '25px',
                                                    }}
                                                />
                                            </Button>
                                        </Td>
                                    </Tr>
                                ) : (
                                    ''
                                )}
                                {assets.map((asset) =>
                                    assetSaved ? (
                                        assetSaved.assetCode !== asset.assetCode ? (
                                            <Tr key={asset.assetCode} id={'row_' + asset.assetCode}>
                                                <Td
                                                    id={'asset_code' + asset.assetCode}
                                                    onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                                >
                                                    {asset.assetCode}
                                                </Td>
                                                <Td
                                                    id={asset.assetCode + asset.assetName}
                                                    onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                                >
                                                    {asset.assetName}
                                                </Td>
                                                <Td
                                                    id={asset.assetCode + asset.categoryName}
                                                    onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                                >
                                                    {asset.categoryName}
                                                </Td>
                                                <Td
                                                    id={asset.assetCode + asset.state}
                                                    onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                                >
                                                    {AssetService.formatAssetState(asset.state)}
                                                </Td>
                                                <Td style={{border: 'none'}} id={'td_edit_' + asset.assetCode}>
                                                    <Button
                                                        id={'btn_edit_' + asset.assetCode}
                                                        disabled={asset.state === 'ASSIGNED' ? true : false}
                                                        onClick={() => {
                                                            navigate('/edit-asset', {
                                                                state: {
                                                                    id: asset.assetCode,
                                                                    name: asset.assetName,
                                                                    category: asset.categoryName,
                                                                    spec: asset.specification,
                                                                    installedDate: asset.installedDate,
                                                                    state: asset.state,
                                                                },
                                                            });
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                marginLeft: '25px',
                                                                color:
                                                                    asset.state === 'ASSIGNED' ? '#b7b7b7' : '#707070',
                                                            }}
                                                            icon={faPencilAlt}
                                                        />
                                                    </Button>
                                                </Td>
                                                <Td style={{border: 'none'}} id={'td_delete_' + asset.assetCode}>
                                                    <Button
                                                        id={'btn_delete' + asset.assetCode}
                                                        onClick={() => handleClickDeleteAsset(asset)}
                                                    >
                                                        <CloseOutlined
                                                            style={{
                                                                border:
                                                                    asset.state === 'ASSIGNED'
                                                                        ? '2px solid #efbec4'
                                                                        : '2px solid #de6a79',
                                                                borderRadius: '50%',
                                                                color:
                                                                    asset.state === 'ASSIGNED' ? '#efbec4' : '#de6a79',
                                                                marginLeft: '25px',
                                                            }}
                                                        />
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ) : (
                                            ''
                                        )
                                    ) : (
                                        <Tr key={asset.assetCode} id={'row_' + asset.assetCode}>
                                            <Td
                                                id={'asset_code' + asset.assetCode}
                                                onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                            >
                                                {asset.assetCode}
                                            </Td>
                                            <Td
                                                id={asset.assetCode + asset.assetName}
                                                onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                            >
                                                {asset.assetName}
                                            </Td>
                                            <Td
                                                id={asset.assetCode + asset.categoryName}
                                                onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                            >
                                                {asset.categoryName}
                                            </Td>
                                            <Td
                                                id={asset.assetCode + asset.state}
                                                onClick={() => openModal({type: 'detailAsset', asset: asset})}
                                            >
                                                {AssetService.formatAssetState(asset.state)}
                                            </Td>
                                            <Td style={{border: 'none'}} id={'td_edit_' + asset.assetCode}>
                                                <Button
                                                    id={'btn_edit_' + asset.assetCode}
                                                    disabled={asset.state === 'ASSIGNED' ? true : false}
                                                    onClick={() => {
                                                        navigate('/edit-asset', {
                                                            state: {
                                                                id: asset.assetCode,
                                                                name: asset.assetName,
                                                                category: asset.categoryName,
                                                                spec: asset.specification,
                                                                installedDate: asset.installedDate,
                                                                state: asset.state,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        style={{
                                                            fontSize: '1.2rem',
                                                            marginLeft: '25px',
                                                            color: asset.state === 'ASSIGNED' ? '#b7b7b7' : '#707070',
                                                        }}
                                                        icon={faPencilAlt}
                                                    />
                                                </Button>
                                            </Td>
                                            <Td style={{border: 'none'}} id={'td_delete_' + asset.assetCode}>
                                                <Button
                                                    id={'btn_delete' + asset.assetCode}
                                                    disabled={asset.state === 'ASSIGNED' ? true : false}
                                                    onClick={() => handleClickDeleteAsset(asset)}
                                                >
                                                    <CloseOutlined
                                                        style={{
                                                            border:
                                                                asset.state === 'ASSIGNED'
                                                                    ? '2px solid #efbec4'
                                                                    : '2px solid #de6a79',
                                                            borderRadius: '50%',
                                                            color: asset.state === 'ASSIGNED' ? '#efbec4' : '#de6a79',
                                                            marginLeft: '25px',
                                                        }}
                                                    />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ),
                                )}
                            </Tbody>
                        )}
                    </Table>
                </>
            )}

            <Modal
                id="modal_asset"
                showModal={showModal}
                setShowModal={setShowModal}
                type={typeModal}
                asset={danhMucModal}
                setIsReloadPage={setIsReloadPage}
                showToastFromOut={showToastFromOut}
            />
            {totalPages > 0 ? PagingItem(page, totalPages, setPage) : <></>}
        </Container>
    );
};

export default ManageAssetMain;
