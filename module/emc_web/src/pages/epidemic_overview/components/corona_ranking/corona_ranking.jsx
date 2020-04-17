import React, { useState, useRef} from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export function CoronaRanking(props) {
    const [data, setData] = useState(props.data);
    const [style, setStyle] = useState(props.style);

    const countryToFlag = (isoCode) => {
        return typeof String.fromCodePoint !== 'undefined'
            ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }

    return (
        <div style={style}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell>排名</TableCell> */}
                            <TableCell align="left">國家/地區</TableCell>
                            <TableCell align="left">已確診</TableCell>
                            <TableCell align="left">恢復人數</TableCell>
                            <TableCell align="left">死亡人數</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.code}>
                                {/* <TableCell component="th" scope="row">
                                    {row.rank}
                                </TableCell> */}
                                <TableCell align="left">
                                    <React.Fragment>
                                        <span>{countryToFlag(row.code)}</span>
                                        {row.label}  {row.name}
                                    </React.Fragment>
                                    {row.name_cn}
                                </TableCell>
                                <TableCell align="left">{row.confirmed}</TableCell>
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