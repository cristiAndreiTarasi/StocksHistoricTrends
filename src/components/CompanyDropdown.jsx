import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

const CompanyDropdown = ({ onSelect }) => {
    const [companies, setCompanies] = useState([]);
    const { data, error } = useApi("http://localhost:3001/api/companies");

    useEffect(() => {
        if (data) {
            setCompanies(data);
        }
    }, [data]);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return <div>
        <select onChange={evt => onSelect(evt.target.value)}>
            <option value="">Select a company</option>

            {companies.map(({ id, dataset_code,  }) => {
                return <option key={id} value={dataset_code}>
                    {dataset_code}
                </option>
            })}
        </select>
    </div>;
};

export default CompanyDropdown;