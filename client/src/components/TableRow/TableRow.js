import React from "react";
import "./TableRow.css";

const TableRow = (props) => {
    const {matches, won, lost, draw, points, username } = props.rowData;

    return (
        <tr>
            <td>{props.id}</td>
            <td align="left">{username}</td>
            <td>{matches}</td>
            <td>{won}</td>
            <td>{lost}</td>
            <td>{draw}</td>
            <td>{points}</td>
        </tr>
    );
};

export default TableRow;
