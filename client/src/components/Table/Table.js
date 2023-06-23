import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "../TableRow/TableRow";
import "./Table.css";

const Table = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        axios
            .post(process.env.REACT_APP_SERVER_URL + "/api/user/allUserData", {})
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.error(err);
                alert("error occured");
            });
    }, []);

    const rows = userData.map((rowData, i) => {
        return <TableRow key={i} id={i + 1} rowData={rowData} />;
    });

    return (
        <table>
            <tbody>
                <tr>
                    <th scope="col">#Rank</th>
                    <th scope="col">Username</th>
                    <th scope="col">Won</th>
                    <th scope="col">Lost</th>
                    <th scope="col">Draw</th>
                    <th scope="col">Points</th>
                </tr>
                {rows}
            </tbody>
        </table>
    );
};

export default Table;
