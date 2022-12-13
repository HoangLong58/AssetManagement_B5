import styled from "styled-components";
import {CloseOutlined} from "@mui/icons-material";
import {useCallback, useEffect, useRef, useState} from "react";
import "../../css/main.css";
import axios from "axios";
import DateFormatterService from "../../service/DateFormatterService";
import * as AssetService from '../../service/AssetService'
import {AXIOS_API_URL} from "../../constants/Axios";
import {useNavigate} from "react-router-dom";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    animation: fadeIn linear 0.1s;
`

const ModalWrapper = styled.div`
    width: 900px;
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    line-height: 1.8;
    color: #141414;
    margin: 20px 0px 20px 150px;

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

const H2 = styled.h2`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 75px;
    margin-bottom: 0.8rem;
    color: var(--color-primary);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 2px solid #333;
    width: 100%;
    height: 80px;
    margin: 0;
    background-color: #eff1f5;
`

const DetailTitle = styled.div`
display: block;
padding-bottom: 50px;
`

const DetailTitleItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
`
const DetailContent = styled.div`
display: block;
margin-left: 50px;
`

const DetailContentItem = styled.div`
font-size: 1.1rem;
margin-bottom: 10px;
color: #8f9194;
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

const Button = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
`

const Table = styled.table`
    background: var(--color-white);
    width: 100%;
    text-align: left;
    transition: all 300ms ease;
`

const Thead = styled.thead`

`

const Tr = styled.tr`

    &:hover {
        background: var(--color-light);
    }
`

const Tbody = styled.tbody`
max-height: 100px;
overflow-y: auto;

`

const Td = styled.td`
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: #65676a;
`

const Th = styled.th`

    border-bottom: 1px solid #34383c;
    min-width: 150px;
    color: #34383c;
`

const ThContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ThSpan = styled.span`
`

const EditLink = styled.span`
    color: #4babeb;
    text-decoration: underline;
    font-style: italic;
    margin-left: 4px;
    cursor: pointer;
`


const Modal = ({showModal, setShowModal, type, asset, setIsReloadPage, showToastFromOut}) => {
    const [isFullAssetName, setIsFullAssetName] = useState(true);
    const [isFullSpecification, setIsFullSpecification] = useState(true);
    const navigate = useNavigate();

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

    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        if (asset) {
            let assetId = asset.assetCode;
            const getListAssignment = async () => {
                const result = await AssetService.getListAssignment(assetId);
                setAssignments(result.data);
                return result.data;
            };
            getListAssignment();
        }
    }, [asset]);

    const handleDeleteAsset = async (assetCode) => {
        const deleteAssetRes = await axios.delete(`${AXIOS_API_URL}/admin/api/assets/${assetCode}`,
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_info')).token}`,
                }
            }
        ).then((deleteAssetRes) => {
            setShowModal(false);
            setIsReloadPage(prev => !prev);
            if (JSON.parse(localStorage.getItem('assetSaved')).assetCode === assetCode) {
                window.localStorage.removeItem('assetSaved');
            }
        }).catch((err) => {
        })
    }

    if (type === "detailAsset") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal} id="back_ground">
                        <ModalWrapper showModal={showModal} id="modal_wrapper">
                            <H2>Detailed Asset Information</H2>
                            <ModalContent id="modal_content">
                                <DetailTitle>
                                    <DetailTitleItem>Asset Code</DetailTitleItem>
                                    <DetailTitleItem>Asset Name</DetailTitleItem>
                                    <DetailTitleItem>Category</DetailTitleItem>
                                    <DetailTitleItem>Installed Date</DetailTitleItem>
                                    <DetailTitleItem>State</DetailTitleItem>
                                    <DetailTitleItem>Location</DetailTitleItem>
                                    <DetailTitleItem>Specification</DetailTitleItem>
                                    <DetailTitleItem>History</DetailTitleItem>
                                </DetailTitle>
                                <DetailContent id="detail_content">
                                    <DetailContentItem id={asset.assetCode}>{asset.assetCode}</DetailContentItem>
                                    <DetailContentItem id={asset.assetCode}
                                                       onMouseEnter={() => setIsFullAssetName(false)}
                                                       onMouseLeave={() => setIsFullAssetName(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {asset.assetName.length >= 20 ? (asset.assetName.substring(0, 20) + '...') : asset.assetName}
                                        {
                                            asset.assetName.length >= 20 ?
                                                <div style={{
                                                    display: isFullAssetName ? "none" : "block"
                                                    ,
                                                    position: "absolute",
                                                    width: '15rem',
                                                    backgroundColor: '#f5f5f5'
                                                    ,
                                                    wordWrap: "break-word",
                                                    height: 'auto',
                                                    zIndex: "10"
                                                    ,
                                                    border: "1px solid #333",
                                                    paddingLeft: "20px",
                                                    borderRadius: "10px"
                                                }}>
                                                    {asset.assetName}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem id={asset.categoryName}>{asset.categoryName}</DetailContentItem>
                                    <DetailContentItem
                                        id={asset.installedDate}>{DateFormatterService.dateFormat(asset.installedDate)}</DetailContentItem>
                                    <DetailContentItem
                                        id={asset.state}>{AssetService.formatAssetState(asset.state)}</DetailContentItem>
                                    <DetailContentItem id={asset.locationCode}>{asset.locationCode}</DetailContentItem>
                                    <DetailContentItem id={"location_" + asset.assetCode}
                                                       onMouseEnter={() => setIsFullSpecification(false)}
                                                       onMouseLeave={() => setIsFullSpecification(true)}
                                                       style={{position: "relative"}}
                                    >
                                        {asset.specification.length >= 20 ? (asset.specification.substring(0, 20) + '...') : asset.specification}
                                        {
                                            asset.specification.length >= 20 ?
                                                <div style={{
                                                    display: isFullSpecification ? "none" : "block"
                                                    ,
                                                    position: "absolute",
                                                    width: '15rem',
                                                    backgroundColor: '#f5f5f5'
                                                    ,
                                                    wordWrap: "break-word",
                                                    height: 'auto',
                                                    zIndex: "10"
                                                    ,
                                                    border: "1px solid #333",
                                                    paddingLeft: "20px",
                                                    borderRadius: "10px"
                                                }}>
                                                    {asset.specification}
                                                </div>
                                                :
                                                <></>
                                        }
                                    </DetailContentItem>
                                    <DetailContentItem id={"detail_content_item_" + asset.assetCode}>
                                        <Table id={"table_" + asset.assetCode}>
                                            <Thead id={"thead_" + asset.assetCode}>
                                                <Tr>
                                                    <Th>
                                                        <ThContainer>
                                                            <ThSpan>Date</ThSpan>
                                                        </ThContainer>
                                                    </Th>
                                                    <Th>
                                                        <ThContainer>
                                                            <ThSpan>Assigned to</ThSpan>
                                                        </ThContainer>
                                                    </Th>
                                                    <Th>
                                                        <ThContainer>
                                                            <ThSpan>Assigned by</ThSpan>
                                                        </ThContainer>
                                                    </Th>
                                                    <Th>
                                                        <ThContainer>
                                                            <ThSpan>Returned Date</ThSpan>
                                                        </ThContainer>
                                                    </Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody id={"tbody_" + asset.assetCode}>
                                                {
                                                    assignments ? (
                                                        assignments.map(data => (
                                                            <Tr id={assignments.assetCode} key={assignments.assetCode}>
                                                                <Td id={asset.assetCode + data.assignedDate}>{DateFormatterService.dateFormat(data.assignedDate)}</Td>
                                                                <Td id={asset.assetCode + data.assignedTo}>{data.assignedTo}</Td>
                                                                <Td id={asset.assetCode + data.assignedBy}>{data.assignedBy}</Td>
                                                                <Td></Td>
                                                            </Tr>
                                                        ))
                                                    ) : (<></>)
                                                }

                                            </Tbody>
                                        </Table>

                                    </DetailContentItem>

                                </DetailContent>
                            </ModalContent>
                            <CloseModalButton id="close_modal_button"
                                              aria-label="Close modal"
                                              onClick={() => setShowModal(prev => !prev)}
                            >
                                <CloseOutlined/>
                            </CloseModalButton>
                        </ModalWrapper>
                    </Background>
                ) : null}
            </>
        );
    }

    if (type === "canNotDeleteAsset") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "auto", margin: "0"}}>
                            <H2>Cannot Delete Asset</H2>

                            <ModalContent style={{display: "flex", flexDirection: "column"}}>
                                <p style={{marginTop: "0"}}>Cannot delete the asset because it belongs to one or<br/>
                                    more historical assignments.</p>
                                <p>If the asset is not able to be used anymore, please <br/>
                                    update its state in
                                    <EditLink
                                        id="redirect-edit-asset-from-delete-asset"
                                        onClick={() => {
                                            navigate("/edit-asset",
                                                {
                                                    state: {
                                                        id: asset.assetCode,
                                                        name: asset.assetName,
                                                        category: asset.categoryName,
                                                        spec: asset.specification,
                                                        installedDate: asset.installedDate,
                                                        state: asset.state
                                                    }
                                                })
                                        }}
                                    >
                                        Edit Asset page
                                    </EditLink>
                                </p>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseCanNotDeleteAsset"
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

    if (type === "deleteAsset") {
        return (
            <>
                {showModal ? (
                    <Background ref={modalRef} onClick={closeModal}>
                        <ModalWrapper showModal={showModal} style={{width: "400px"}}>
                            <H2>Are you sure?</H2>

                            <ModalContent style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                margin: "0"
                            }}>
                                <p style={{margin: "20px 20px 20px 75px"}}>Do you want to delete this asset?</p>
                                <Button style={{justifyContent: "center", margin: "10px 0px 0px 0px"}}>
                                    <ButtonContainer>
                                        <ButtonClick
                                            id="btnConfirmDeleteAsset"
                                            className="active"
                                            onClick={() => {
                                                handleDeleteAsset(asset.assetCode)
                                            }}
                                        >Delete</ButtonClick>
                                    </ButtonContainer>
                                    <ButtonContainer>
                                        <ButtonClick id="bntCancelDeleteAsset"
                                                     onClick={() => setShowModal(prev => !prev)}
                                        >Cancel</ButtonClick>
                                    </ButtonContainer>
                                </Button>
                            </ModalContent>

                            <CloseModalButton
                                aria-label="Close modal" id="btnCloseConfirmDeleteAsset"
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
};

export default Modal;