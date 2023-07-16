import { useCallback, useEffect, useReducer } from "react";

import Chart from "./components/Chart";
import Header from "./components/Header";
import { CompanyContext } from "./state/context";
import './App.css';
import companyReducer, { initialState } from "./state/reducers";
import { fetchCompanies } from "./state/actions";

function App() {
    const [state, dispatch] = useReducer(companyReducer, initialState);

    const asyncDispatch = useCallback(action => {
        typeof action === "function"
            ? action(dispatch)
            : dispatch(action);
    }, []);

    useEffect(() => {
        asyncDispatch(fetchCompanies());
    }, []);

    const handlePages = newPage => {
        asyncDispatch(fetchCompanies(newPage));
    };

    if (state.isLoading) {
        return <div className="container-fluid bg-dark d-flex align-items-center justify-content-center vh-100 p-3">
            <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    } else {
        const { current_page, prev_page, next_page, total_pages } = state.companyMeta;

        return (
            <CompanyContext.Provider value={{ state, asyncDispatch }}>
                <div className="container-fluid bg-dark d-flex flex-column align-items-center justify-content-between vh-100 p-3" >
                    <Header />

                    <div style={{ height: "20%" }}></div>
    
                    <div className="flex-grow-1 bg-dark flex-column align-items-center h-auto text-center">
                        {state.loadingGraph
                            ? <div className="container bg-dark d-flex align-items-center justify-content-center">
                                <div className="spinner-border text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : !state.timeSeriesData
                                ? state.error 
                                    ? <p className="text-danger">Error: {state.error.message}</p> 
                                    : <p className="text-warning">No company selected.</p>
                                : <Chart data={state.timeSeriesData} />}
                    </div>
    
                    <div style={{height: "100px"}}></div>
    
                    <nav aria-label="Naviagtion">
                        <ul className="pagination">
                            {prev_page && <li className="page-item">
                                <button className="page-link" onClick={() => handlePages(prev_page)}>Previous</button>
                            </li>}
    
                            {[...Array(10).keys()].map(pageNum => <li
                                key={pageNum + 1}
                                className={`page-item ${current_page === pageNum + 1 ? "active" : ""}`}
                            >
                                <button
                                    onClick={() => handlePages(pageNum + 1)}
                                    className="page-link"
                                >{pageNum +1}</button>
                            </li>)}
    
                            {next_page && <li className="page-item">
                                <button className="page-link" onClick={() => handlePages(next_page)}>Next</button>
                            </li>}
                        </ul>
                    </nav>
                </div>
            </CompanyContext.Provider>
        );
    }
}

export default App;
