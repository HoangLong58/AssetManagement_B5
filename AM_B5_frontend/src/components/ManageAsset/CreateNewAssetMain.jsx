import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import "../../css/main.css"
import {ArrowDropDownOutlined, CloseOutlined, DoneOutlined} from '@mui/icons-material';
import CategoriesService from "../../service/CategoriesService";
import UserService from "../../service/UserService";
import AssetsService from "../../service/AssetsService";
import Toast from "./Toast";

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
    margin: 5px 20px;
    padding: 0px 0px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
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
    border: 1px solid #c1c1c1;
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

const InputRadioSpan = styled.span`
    font-size: 1.1rem;
    padding: 0px 10px;
`
const Label = styled.label`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
`

const Error = styled.span`
    margin: 0px 0px 10px 30px;
    font-size: 1.1rem;
    color: red;
`

const CategoryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: relative;
    height: 43px;
    width: 300px;
`

const CategoryTitle = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
border-radius: 5px;
`

const CategorySpan = styled.span`
    display: block;
    min-width: 260px;
    padding: 10px 0px 10px 20px;
`
const CategoryUl = styled.ul`
background-color: #f5f5f5;
position: absolute;
top: 43px;
left: 0px;
width: 300px;
border: 0;
padding: 0;
z-index: 10;

`
const CategoryLi = styled.li`
    padding: 10px 0px 10px 20px;
    cursor: pointer;
`

const CategoryLiContainer = styled.div`
    max-height: 240px;
    overflow-y: auto;
`

const CategoryIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
const LiSpan = styled.span`
    font-size: 0.9rem;
    margin-left: 10px;
`
const AddCategoryContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    border: 1px solid #9e9e9e;
    background-color: #f5f5f5;
    position: absolute;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    justify-content: space-around;
    align-items: center;
`

const AddCategoryInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 10px 5px 30px;
`

const CategoryInput = styled.input`
padding-left: 5px;
width: 120px;
border: 1px solid #9e9e9e;
height: 30px;
`

const PreflixInput = styled.input`
padding-left: 5px;
width: 30px;
height: 30px;
border: 1px solid #9e9e9e;
`

const AddCategoryOptionContainer = styled.div`
display:flex;
justify-content: center;
align-items: center;
`


const CreateNewAssetMain = () => {
    const [isAddNewCategory, setIsAddNewCategory] = useState(true);
    const [category, setCategory] = useState();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [categoryError, setCategoryError] = useState();
    const [categoryName, setCategoryName] = useState();
    const [categoryPrefix, setCategoryPrefix] = useState();
    const [assetName, setAssetName] = useState();
    const [specification, setSpecification] = useState();
    const [assetState, setAssetState] = useState('AVAILABLE');
    const [installedDate, setInstalledDate] = useState();
    const [locationId, setLocationId] = useState();
    const [assetError, setAssetError] = useState();
    const [today, setToday] = useState();

    const [dataToast, setDataToast] = useState({message: "alo alo", type: "success"});
    const toastRef = useRef(null);

    const showToastFromOut = (dataShow) => {
        setDataToast(dataShow);
        toastRef.current.show();
    }

    const userInfo = JSON.parse(localStorage.getItem("user_info"))

    useEffect(() => {
        getAllCategories();
    }, [isAddNewCategory]);

    useEffect(() => {
        getUserLoginById()
        setToday(new Date().toISOString().split("T")[0])
    }, []);

    const getAllCategories = () => {
        CategoriesService.getListCategories()
            .then(res => {
                setCategories(res.data.reverse());
            })
            .catch(errors => {
                setCategoryError(errors.response);
            })
    }

    const getUserLoginById = () => {
        if (userInfo) {
            UserService.getUserByStaffCode(userInfo.id)
                .then(res => {
                    setLocationId(res.data.locationCode)
                })
                .catch(errors => {
                })
        }
    }


    const handleSaveNewAsset = () => {
        if (category) {
            const assetData = {
                assetName: assetName,
                categoryId: category.id,
                specification: specification,
                state: assetState,
                installedDate: installedDate,
            }
            AssetsService.createNewAsset(assetData)
                .then(res => {
                    if (res.data) {
                        localStorage.setItem("assetSaved", JSON.stringify(res.data))
                    }
                    navigate("/manage-asset")
                })
                .catch(errors => {
                    setAssetError(errors.response.data)
                })
        }


    }

    function handleAddCategoryClick(id, name) {

        CategoriesService.createCategory(id.toUpperCase(), name)
            .then(res => {
                setIsAddNewCategory(true)
                // Toast
                const dataToast = {message: "Add new category success", type: "success"};
                showToastFromOut(dataToast);
            })
            .catch(errors => {
                setCategoryError(errors.response.data)
            })
    }

    const setToggleCategory = () => {
        var checkList = document.getElementById('createAsset_Category');
        if (checkList.classList.contains('visible-create-asset')) {
            checkList.classList.remove('visible-create-asset');
            setCategoryError(undefined)
        } else {
            checkList.classList.add('visible-create-asset');
        }

        setIsAddNewCategory(true);
    }

    const handleChooseCategory = (props) => {
        setCategory(props.item);
        setToggleCategory();
    }

    const isAllFilled = () => {
        return !!(assetName && specification && category && installedDate && !assetError);

    }
    return (<Container>
        <Title>
            <H2>Create New Asset</H2>
        </Title>
        <Form>
            <FormTitle>
                <FormTitleItem>Name</FormTitleItem>
                <FormTitleItem>Category</FormTitleItem>
                <FormTitleItem>Specification</FormTitleItem>
                <FormTitleItem style={{marginTop: "15px"}}>Installed
                    Date</FormTitleItem>
                <FormTitleItem>State</FormTitleItem>
            </FormTitle>
            <FormContent>
                <FormContentItem>
                    <InputText id='createAsset_Name' type="text"
                               className='borderPrimary'
                               maxLength={200}
                               onChange={(e) => {
                                   setAssetName(e.currentTarget.value)
                               }}
                    ></InputText>
                </FormContentItem>
                <CategoryContainer id="createAsset_Category"
                                   className="dropdown-check-list-create-asset"
                                   tabindex="100" style={{margin: "5px 20px"}}>
                    <CategoryTitle className="anchor-create-asset" onClick={() => {
                        setToggleCategory()
                    }}>
                        <CategorySpan>{category ? category.name : ""}</CategorySpan>
                        <CategoryIcon>
                            <ArrowDropDownOutlined/>
                        </CategoryIcon>
                    </CategoryTitle>
                    <CategoryUl className="items-create-asset" style={{padding: "0"}}>
                        <CategoryLiContainer id="list-category-id">
                            {categories.map((item) => <CategoryLi id={item.id}
                                                                  onClick={() => {
                                                                      handleChooseCategory({item: item})
                                                                      setCategoryError(undefined)

                                                                  }}>
                                <LiSpan>{item.name}</LiSpan>
                            </CategoryLi>)}
                        </CategoryLiContainer>
                        <AddCategoryContainer>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%"
                            }}>

                                {isAddNewCategory ? <span
                                    onClick={() => setIsAddNewCategory(false)}
                                    style={{
                                        textAlign: "center",
                                        color: "var(--color-primary)",
                                        display: "block",
                                        padding: "10px 100px 10px 0px",
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                        width: "100%"
                                    }}
                                >
                                    <i id="linkAddCategory">Add new category</i>
                                </span> : <div style={{
                                    display: "flex", flexDirection: "row"
                                }}>
                                    <AddCategoryInputContainer>
                                        <CategoryInput id="textCategoryName"
                                                       type="text"
                                                       onChange={(e) => {
                                                           setCategoryName(e.currentTarget.value)
                                                           setCategoryError(undefined)
                                                       }}/>
                                        <PreflixInput id="textCategoryPrefix"
                                                      type="text"
                                                      onChange={(e) => {
                                                          setCategoryPrefix(e.currentTarget.value.replace(/[^a-z\d ]/gi, ''))
                                                          setCategoryError(undefined)
                                                      }}
                                                      value={categoryPrefix}
                                        />
                                    </AddCategoryInputContainer>
                                    <AddCategoryOptionContainer>
                                        <DoneOutlined
                                            id="confirmAddCategory"
                                            style={{
                                                color: "var(--color-primary)",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handleAddCategoryClick(categoryPrefix, categoryName)}
                                        />
                                        <CloseOutlined id="closeAddCategory"
                                                       style={{
                                                           marginLeft: "10px", cursor: "pointer"
                                                       }}
                                                       onClick={() => {
                                                           setIsAddNewCategory(true)
                                                           setCategoryError(undefined)
                                                       }}
                                        />
                                    </AddCategoryOptionContainer>
                                </div>}
                                {categoryError ? (<Error>{categoryError.message}</Error>) : ('')}
                            </div>
                        </AddCategoryContainer>
                    </CategoryUl>
                </CategoryContainer>

                <FormContentItem>
                    <TextArea id='createAsset_Specification' rows="3" cols="46"
                              className='borderPrimary'
                              onChange={(e) => {
                                  setSpecification(e.currentTarget.value)
                                  setAssetError(undefined)
                              }}
                    ></TextArea>
                </FormContentItem>
                <FormContentItem>
                    <InputDate id='createAsset_InstalledDate' type="date"
                               className="borderPrimary"
                               max={today}
                               onChange={(e) => {
                                   setInstalledDate(e.target.value)
                                   setAssetError(undefined)
                               }}
                    ></InputDate>
                </FormContentItem>
                <FormContentItemCheckbox id="createAsset_Radio">
                    <Label id='createAsset_RadioAvailable'>
                        <InputRadio id="radioAvailable" type="radio" name="createAsset_RadioAvailable"
                                    defaultChecked value="AVAILABLE"
                                    onChange={(e) => {
                                        setAssetState(e.target.value)
                                        setAssetError(undefined)
                                    }}/>
                        <InputRadioSpan>Available</InputRadioSpan>
                    </Label>
                    <Label id='createAsset_RadioNotAvailable'>
                        <InputRadio id="radioNotAvailable" type="radio" name="createAsset_RadioAvailable"
                                    value="NOT_AVAILABLE"
                                    onChange={(e) => {
                                        setAssetState(e.target.value)
                                        setAssetError(undefined)
                                    }}/>
                        <InputRadioSpan>Not Available</InputRadioSpan>
                    </Label>
                </FormContentItemCheckbox>
                {assetError ? (<Error>{assetError.message}</Error>) : ('')}
                <Button>
                    <ButtonContainer>
                        <button
                            id="createUser_Save"
                            type="button"
                            className={'btn btn-login btn-danger btn-lg '
                                + (isAllFilled() ? '' : 'disabled')
                            }

                            style={{fontSize: "1rem"}}
                            onClick={handleSaveNewAsset}
                        >
                            Save
                        </button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <ButtonClick
                            id='createAsset_Cancel'
                            onClick={() => navigate("/manage-asset")}
                        >Cancel</ButtonClick>
                    </ButtonContainer>
                </Button>
            </FormContent>
        </Form>
        <Toast
            ref={toastRef}
            dataToast={dataToast}
        />
    </Container>)
}

export default CreateNewAssetMain