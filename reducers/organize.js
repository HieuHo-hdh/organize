import {actionTypes, reduxUtil} from "../actions/organize";


const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;

const {
    GET_ORGANIZE_LIST,
    SEARCH_ORGANIZE,
} = actionTypes;

const initialState = {
    organizeListData: {},
    searchedOrganize: [],
    organizeListLoading: false,
    searchLoading:false,
}

const reducer = createReducer ({
    [defineActionLoading(GET_ORGANIZE_LIST)] : (state) =>{
        return {
            ...state,
            organizeListLoading: true,
        }
    },
    [defineActionSuccess(GET_ORGANIZE_LIST)] : (state, {organizeListData}) =>{
        return {
            ...state,
            organizeListData,
            organizeListLoading: false,
        }
    },
    [defineActionLoading(SEARCH_ORGANIZE)]: (state) => {
        return {
            ...state,
            searchLoading: true
        }
    },
    [defineActionSuccess(SEARCH_ORGANIZE)]: (state, { searchedOrganize }) => {
        return {
            ...state,
            searchedOrganize,
            searchLoading: false
        }
    },
    initialState
})

export default {
    reducer
};