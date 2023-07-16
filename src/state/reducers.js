import { 
    FETCH_COMPANIES_ERROR, 
    FETCH_COMPANIES_REQUEST, 
    FETCH_COMPANIES_SUCCESS, 
    FETCH_TIME_SERIES_ERROR, 
    FETCH_TIME_SERIES_REQUEST, 
    FETCH_TIME_SERIES_SUCCESS, 
    SET_COMPANY_CODE } from "./actionTypes";

export const initialState = {
    companyCode: null,
    timeSeriesData: null,
    companies: [],
    companyMeta: {
        current_page: 1, 
        prev_page: null, 
        next_page: null, 
        total_pages: 0
    },
    isLoading: false,
    loadingGraph: false,
    error: null
};

export default function companyReducer(state = initialState, {type, payload}) {
    switch (type) {
        case SET_COMPANY_CODE:
            return {
                ...state,
                companyCode: payload,
            };

        case FETCH_COMPANIES_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case FETCH_COMPANIES_SUCCESS:
            return {
                ...state,
                companies: payload.datasets,
                companyMeta: payload.meta,
                isLoading: false,
            };

        case FETCH_COMPANIES_ERROR:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
            };

        case FETCH_TIME_SERIES_REQUEST:
            return {
                ...state,
                loadingGraph: true,
            };

        case FETCH_TIME_SERIES_SUCCESS:
            return {
                ...state,
                timeSeriesData: payload,
                loadingGraph: false
            };

        case FETCH_TIME_SERIES_ERROR:
            return {
                ...state,
                error: payload.error,
                loadingGraph: false
            };
    
        default:
            return state;
    }
}