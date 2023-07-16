import { useContext, useEffect } from "react";
import { CompanyContext } from "../state/context";
import { fetchCompanies, fetchTimeSeries } from "../state/actions";
import { SET_COMPANY_CODE } from "../state/actionTypes";
import { generateUniqueId } from "../utils/helpers";

const Header = () => {
    const { state, asyncDispatch } = useContext(CompanyContext);
    // const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        if (state.companyCode) {
            asyncDispatch(fetchTimeSeries(state.companyCode));
        }
    }, [state.companyCode]);

    const handleSelection = event => {
       asyncDispatch({
            type: SET_COMPANY_CODE,
            payload: event,
        });
    };

    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid d-flex flex-column">
            <a className="navbar-brand" style={{ fontSize: "50px" }}>WIKI Companies</a>
            
            <select 
                className="form-select form-select-sm mb-3" 
                aria-label=".form-select-lg example"
                onChange={evt => handleSelection(evt.target.value)}
            >
                <option value="">Select a company</option>
                {state.companies.map(({ dataset_code, name }) => {
                    return <option key={generateUniqueId()} value={dataset_code}>
                        {name.startsWith("Untitled") ? dataset_code : name}
                    </option>;
                })}
            </select>
        </div>
    </nav>;
};

export default Header;

