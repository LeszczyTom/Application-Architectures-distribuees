import {useEffect, useState} from 'react';

function useDataBase() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [changed, setChanged] = useState(true);

    const selectAllFromDb = () => {
        setLoading(true);
        fetch("http://localhost:2222/selectAllFromDB")
            .then(response => response.json())
            .then(d => {
                setData(d);
                setLoading(false);
                setChanged(false);
                console.log(d);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }

    const addToDb = (album, artist, duration, cover, title) => {
        setLoading(true);
        fetch(`http://localhost:2222/addToDb?album=${album}&artist=${artist}&duration=${duration}&favorite=$false&cover=${cover}&title=${title}`)
            .then(response => response.json())
            .then(() => {
                setLoading(false);
                setChanged(true)
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }

    const deleteFromDbById = (id) => {
        setLoading(true);
        fetch(`http://localhost:2222/deleteFromDbById/${id}`)
            .then(response => response.json())
            .then(() => {
                setLoading(false);
                setChanged(true)
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }

    useEffect(() => {
        if(!changed) return
        setLoading(true);
        fetch("http://localhost:2222/selectAllFromDB")
            .then(response => response.json())
            .then(d => {
                setData(d);
                setLoading(false);
                setChanged(false);
                console.log(d);
            })
            .catch(e => {
                setError(e);
                setLoading(false);
            });
    }, [changed]);

    return {
        data,
        error,
        loading,
        selectAllFromDb,
        addToDb,
        deleteFromDbById
    };
}

export default useDataBase;
