import React, { useState, useEffect } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import EnhancedTableHead from '../../../enhanced_table_head';

export function CoronaRanking(props) {
    const [data, setData] = useState([]);
    const [latlong, setLatlong] = useState(props.latlong);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('new_confirmed');

    const countryToFlag = (isoCode) => {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }

    useEffect(() => {
        if (props.data.length > 0) {
            let temp = props.data.filter(item => (item.name !== "Diamond Princess" && item.name !== "Taiwan*"));
            let data = props.data.filter(item => item.name !== "Diamond Princess");

            let taiwan = data.filter(item => item.name === "Taiwan*")[0];
            let ranking = temp.sort((a, b) => {
                return b['confirmed'] - a['confirmed'];
            });
            let rankingData = ranking.slice(0, 20);
            rankingData.push(taiwan);
            for (let i = 0; i < rankingData.length; i++) {
                rankingData[i].name_cn = latlong[rankingData[i].name].name_cn;
                rankingData[i].code = latlong[rankingData[i].name].code;
            }
            setData(rankingData);
        }

    }, [props.data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    return (
        <div style={{ height: '60vh', overflow: 'scroll' }}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(data, getComparator(order, orderBy)).map(row => (
                            <TableRow key={row.code}>
                                <TableCell align="left">
                                    <React.Fragment>
                                        <span>{countryToFlag(row.code)}</span>

                                    </React.Fragment>
                                    {row.name_cn}
                                </TableCell>
                                <TableCell align="left">{row.new_confirmed}</TableCell>
                                <TableCell align="left">{row.confirmed}</TableCell>
                                <TableCell align="left">{row.no_symptom}</TableCell>
                                <TableCell align="left">{row.recovered}</TableCell>
                                <TableCell align="left">{row.deaths}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}