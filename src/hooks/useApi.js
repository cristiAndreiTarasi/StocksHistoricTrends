import { useEffect, useState } from "react";

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            try {
                const response = await fetch(url)
                const data = response.json();

                setData(data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, error, isLoading };
}; 

export default useApi;