import styled from "styled-components";
import "../../css/main.css";
import {useEffect, useRef, useState} from "react";
import {
    ArrowDropDownOutlined,
    ArrowDropUpOutlined,
    CheckOutlined,
    CloseOutlined,
    ReplayOutlined
} from "@mui/icons-material";
import Modal from "./Modal";
import Toast from "./Toast";
import AssignmentService from "../../service/AssignmentService";
import DateFormatterService from "../../service/DateFormatterService";

const Container = styled.div`
    margin-top: 100px;
`;

const RecentOrders = styled.div`
    margin-top: 3.3rem;
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

const Button = styled.button`
    width: 30px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
`;

const ButtonDelete = styled.button`
width: 30px;
height: 30px;
padding: 0px;
outline: none;
background-color: transparent;
z-index: 2;
cursor: pointer;
    color: var(--color-danger);
`;

const Th = styled.th`
    border-bottom: 1px solid #34383c;
    min-width: 120px;
    color: #34383c;
`;
const ThButton = styled.th`
    min-width: 30px;
    color: #34383c;
`;

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const ThSpan = styled.span``;

const ThSortIcon = styled.div``;

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

const ButtonInfo = styled.button`
    width: 30px;
    height: 30px;
    padding: 0px;
    outline: none;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
    color: #576be3;
`

const HomeMain = () => {
    const InputRef = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [timkiem, setTimKiem] = useState("");

    const [isSortAssetCode, setIsSortAssetCode] = useState(true);
    const [isSortAssetName, setIsSortAssetName] = useState(false);
    const [isSortCategory, setIsSortCategory] = useState(false);
    const [isSortAssignedDate, setIsSortAssignedDate] = useState(false);
    const [isSortState, setIsSortState] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [typeModal, setTypeModal] = useState("")
    const [danhMucModal, setDanhMucModal] = useState(null);

    const userStaffCode = JSON.parse(localStorage.getItem('user_info')).id;
    const [assignmentList, setAssignmentList] = useState([]);

    const [isReloadPage, setIsReloadPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setIsSearch(false);
        InputRef.current.value = "";
        setTimKiem("");
    }

    useEffect(() => {
        setIsLoading(true);
        const getAssignmentList = async () => {
            const result = await AssignmentService.getAssignment(userStaffCode, 'asset.code', 'ASC').catch((error) => {
            });
            setAssignmentList(result.data);
            setIsLoading(false);
            return result.data;
        };
        getAssignmentList();
    }, [isReloadPage])

    const openModal = (modal) => {
        setShowModal(prev => !prev);
        setTypeModal(modal.type);
        setDanhMucModal(modal.assignment);
    }

    const handleSortAssetCode = (sort) => {
        setIsSortAssetCode(prev => !prev)
        sortAssignment(sort, isSortAssetCode ? 'DESC' : 'ASC');
    }

    const handleSortAssetName = (sort) => {
        setIsSortAssetName(prev => !prev)
        sortAssignment(sort, isSortAssetName ? 'DESC' : 'ASC');
    }

    const handleSortCategory = (sort) => {
        setIsSortCategory(prev => !prev)
        sortAssignment(sort, isSortCategory ? 'DESC' : 'ASC');
    }

    const handleSortAssignedDate = (sort) => {
        setIsSortAssignedDate(prev => !prev)
        sortAssignment(sort, isSortAssignedDate ? 'DESC' : 'ASC');
    }

    const handleSortState = (sort) => {
        setIsSortState(prev => !prev)
        sortAssignment(sort, isSortState ? 'DESC' : 'ASC');
    }

    const sortAssignment = (sortBy, sortDirection) => {
        setIsLoading(true);
        const getAssignmentList = async () => {
            const result = await AssignmentService.getAssignment(userStaffCode, sortBy, sortDirection).catch((error) => {
            });
            setAssignmentList(result.data);
            setIsLoading(false);
        }
        getAssignmentList();
    }

    const [dataToast, setDataToast] = useState({message: "alo alo", type: "success"});
    const toastRef = useRef(null);

    const showToastFromOut = (dataShow) => {
        setDataToast(dataShow);
        toastRef.current.show();
    }

    return (
        <Container id='assignment-list'>
            <RecentOrders>
                <H2 id='assignment-title'>My Assignment</H2>
                {
                    assignmentList.length === 0 ?
                        <PictureNoResultFound id="No_Result_Found_Picture">
                            <Img
                                src="https://img.freepik.com/premium-vector/file-found-illustration-with-confused-people-holding-big-magnifier-search-no-result_258153-336.jpg?w=2000"
                                alt="Not Found Result"/>
                            <H1NoResultFound>Your assignment is empty</H1NoResultFound>
                        </PictureNoResultFound>
                        :
                        <>
                            <Table id='assignment-table'>
                                <Thead id='assignment-thead'>
                                    <Tr id='assignment-thead-tr'>
                                        <Th id="th_sort_container_code">
                                            <ThContainer id="sort_container_code" onClick={() => {
                                                handleSortAssetCode('asset.code')
                                            }}>
                                                <ThSpan>Asset Code</ThSpan>
                                                <ThSortIcon id="sort_by_code">
                                                    {isSortAssetCode ? <ArrowDropUpOutlined/> :
                                                        <ArrowDropDownOutlined/>}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_name">
                                            <ThContainer id="sort_container_name" onClick={() => {
                                                handleSortAssetName('asset.name')
                                            }}>
                                                <ThSpan>Asset name</ThSpan>
                                                <ThSortIcon id="sort_by_name">
                                                    {isSortAssetName ? <ArrowDropUpOutlined/> :
                                                        <ArrowDropDownOutlined/>}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_category">
                                            <ThContainer id="sort_container_category" onClick={() => {
                                                handleSortCategory('asset.category.name')
                                            }}>
                                                <ThSpan>Category</ThSpan>
                                                <ThSortIcon id="asset.category.name">
                                                    {isSortCategory ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_date">
                                            <ThContainer id="sort_container_date" onClick={() => {
                                                handleSortAssignedDate('id.assignedDate')
                                            }}>
                                                <ThSpan>Assigned Date</ThSpan>
                                                <ThSortIcon id="sort_by_date">
                                                    {isSortAssignedDate ? <ArrowDropUpOutlined/> :
                                                        <ArrowDropDownOutlined/>}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <Th id="th_sort_container_state">
                                            <ThContainer id="sort_container_state" onClick={() => {
                                                handleSortState('state')
                                            }}>
                                                <ThSpan>State</ThSpan>
                                                <ThSortIcon id="sort_by_state">
                                                    {isSortState ? <ArrowDropUpOutlined/> : <ArrowDropDownOutlined/>}
                                                </ThSortIcon>
                                            </ThContainer>
                                        </Th>
                                        <ThButton id='th-accept-button'></ThButton>
                                        <ThButton id='th-decline-button'></ThButton>
                                        <ThButton id='th-return-button'></ThButton>
                                    </Tr>
                                </Thead>
                                {
                                    isLoading ? (
                                            <div class="spinner-border text-warning"
                                                 style={{color: "#e22027", position: "absolute", left: "50%"}}
                                                 role="status">
                                                <span class="visually-hidden"></span>
                                            </div>
                                        ) :
                                        (
                                            <Tbody id='assignment-body'>
                                                {assignmentList.map((assignmentDetail) =>
                                                    <Tr id='assignment-tbody-tr'>
                                                        <Td id={'asset-code' + assignmentDetail.assetCode}
                                                            onClick={() => openModal({
                                                                type: "detailAssignment",
                                                                assignment: assignmentDetail
                                                            })}>{assignmentDetail.assetCode}</Td>
                                                        <Td id={'asset-name' + assignmentDetail.assetCode}
                                                            onClick={() => openModal({
                                                                type: "detailAssignment",
                                                                assignment: assignmentDetail
                                                            })}>{assignmentDetail.assetName}</Td>
                                                        <Td id={'category-name' + assignmentDetail.assetCode}
                                                            onClick={() => openModal({
                                                                type: "detailAssignment",
                                                                assignment: assignmentDetail
                                                            })}>{assignmentDetail.assetCategoryName}</Td>
                                                        <Td id={'assigned-date' + assignmentDetail.assetCode}
                                                            onClick={() => openModal({
                                                                type: "detailAssignment",
                                                                assignment: assignmentDetail
                                                            })}>{DateFormatterService.dateFormat(assignmentDetail.assignedDate)}</Td>
                                                        <Td id={'state' + assignmentDetail.assetCode}
                                                            onClick={() => openModal({
                                                                type: "detailAssignment",
                                                                assignment: assignmentDetail
                                                            })}>{assignmentDetail.state}</Td>
                                                        <Td className="danger">
                                                            <ButtonDelete id={"btn-edit-" + assignmentDetail.assetCode}
                                                                          onClick={(e) => {
                                                                              e.stopPropagation();
                                                                              openModal({
                                                                                  type: "respondAccept",
                                                                                  assignment: assignmentDetail
                                                                              });
                                                                          }}
                                                                          disabled={assignmentDetail.state === 'Waiting for acceptance' ? false : true}>
                                                                <CheckOutlined
                                                                    style={{color: assignmentDetail.state === 'Waiting for acceptance' ? '' : '#f6b4b8'}}/>
                                                            </ButtonDelete>
                                                        </Td>
                                                        <Td className="warning">
                                                            <Button id={'btn-reject-' + assignmentDetail.assetCode}
                                                                    onClick={(e) => {
                                                                        openModal({
                                                                            type: "respondDecline",
                                                                            assignment: assignmentDetail
                                                                        });

                                                                    }}
                                                                    disabled={assignmentDetail.state === 'Waiting for acceptance' ? false : true}
                                                            >
                                                                <CloseOutlined
                                                                    style={{color: assignmentDetail.state === 'Waiting for acceptance' ? '' : '##b1b1b1'}}/>
                                                            </Button>
                                                        </Td>
                                                        <Td className="info">
                                                            <ButtonInfo id={'btn-return-' + assignmentDetail.assetCode}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            openModal({
                                                                                type: "returningRequest",
                                                                                assignment: assignmentDetail
                                                                            });
                                                                        }}
                                                                        attr
                                                                        disabled={assignmentDetail.requestReturningId !== null || assignmentDetail.state === 'Waiting for acceptance' ? true : false}
                                                            >
                                                                <ReplayOutlined
                                                                    style={{color: assignmentDetail.requestReturningId !== null || assignmentDetail.state === 'Waiting for acceptance' ? '#bcbcbc' : ''}}/>
                                                            </ButtonInfo>
                                                        </Td>
                                                    </Tr>
                                                )}
                                            </Tbody>
                                        )
                                }
                            </Table>
                        </>
                }
            </RecentOrders>
            <Modal id='modal_assignment'
                   showModal={showModal}
                   setShowModal={setShowModal}
                   type={typeModal}
                   assignment={danhMucModal}
                   setIsReloadPage={setIsReloadPage}
                   handleClose={handleClose}
                   showToastFromOut={showToastFromOut}
            />

            <Toast
                ref={toastRef}
                dataToast={dataToast}
            />
        </Container>
    );
};


export default HomeMain;