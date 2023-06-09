import {useState, useEffect} from 'react';

//Custom Hook
export const useFetch = (url) => {
    const [data, setData] = useState(null);

    //Refactoring

    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    //loading
    const [loading, setLoading] = useState(false);

    // Trying Erros
    const [error, setError] = useState(null)



    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-type" : "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
        }
    };

    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);

            try {

                const res = await fetch(url);

                const json = await res.json();
        
                setData(json);

            } catch (error) {

                console.log(error);

                setError("There was some erro to load data!");

            };

            setLoading(false);
        };

        fetchData();

    }, [url, callFetch]);

    // Refactoring Post
    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST") {
                let fetchOptions = [url, config];
    
                const res = await fetch(...fetchOptions);
    
                const json = await res.json();
    
                setCallFetch(json);
            };
        }; 

        httpRequest();

    }, [config, method, url]);

    return { data, httpConfig, loading, error };
}