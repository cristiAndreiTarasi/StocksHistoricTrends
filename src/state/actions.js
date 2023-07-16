import { FETCH_COMPANIES_ERROR, FETCH_COMPANIES_REQUEST, FETCH_COMPANIES_SUCCESS, FETCH_TIME_SERIES_ERROR, FETCH_TIME_SERIES_REQUEST, FETCH_TIME_SERIES_SUCCESS } from "./actionTypes";

export const fetchCompanies = (page = 1) => {
    return async dispatch => {
        dispatch({ type: FETCH_COMPANIES_REQUEST });
        
        try {
            const response = await fetch(`http://localhost:3001/api/companies/${page}`);
            const data = await response.json();

            dispatch({
                type: FETCH_COMPANIES_SUCCESS,
                payload: data,
            });
            console.log('fetchCompanies data:', data);
        } catch (error) {
            dispatch({
                type: FETCH_COMPANIES_ERROR,
                payload: error.message
            });
        }
    };
};

export const fetchTimeSeries = companyCode => {
    return async dispatch => {
        dispatch({ type: FETCH_TIME_SERIES_REQUEST });
        
        try {
            const response = await fetch(`http://localhost:3001/api/time-series/${companyCode}`);
            const data = await response.json();

            const columnNames = data.column_names;
            const close = columnNames.indexOf('Close');
            const date = columnNames.indexOf('Date');

            const processedData = data.data.map(row => ({
                date: row[date],
                close: row[close]
            }));

            dispatch({
                type: FETCH_TIME_SERIES_SUCCESS,
                payload: processedData,
            });
        } catch (error) {
            dispatch({
                type: FETCH_TIME_SERIES_ERROR,
                payload: error.message,
            });
        }
    };
};