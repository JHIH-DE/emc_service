import React from "react";
import './infected_list.less';
import { apiGetInfectedMain } from "../../service";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TablePaginationActions from '../../../table_pagination_actions';


class InfectedList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            rowsPerPage: 10,
            page: 0
        }
    }

    componentDidMount() {
        apiGetInfectedMain()
            .then(res => {
                console.log(res);
                this.setState({ data: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: parseInt(event.target.value, 10) });
    };

    render() {
        return (
            <div>
                <h1>台灣傳染性肺炎感染者列表</h1>
                <Paper style={{ width: "100%" }}>
                    <TableContainer component={Paper} className="table-content">
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell align="right">病名</TableCell>
                                    <TableCell align="right">年</TableCell>
                                    <TableCell align="right">月</TableCell>
                                    <TableCell align="right">城市</TableCell>
                                    <TableCell align="right">性別</TableCell>
                                    <TableCell align="right">年齡</TableCell>
                                    <TableCell align="right">境外移入</TableCell>
                                    <TableCell align="right">確診</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                    ? this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    : this.state.data
                                ).map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.year}</TableCell>
                                        <TableCell align="right">{row.month}</TableCell>
                                        <TableCell align="right">{row.city}</TableCell>
                                        <TableCell align="right">{row.age}</TableCell>
                                        <TableCell align="right">{row.gender}</TableCell>
                                        <TableCell align="right">{row.imported}</TableCell>
                                        <TableCell align="right">{row.confirmed}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
                        component="div"
                        count={this.state.data.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        SelectProps={{
                            inputProps: { "aria-label": "rows per page" },
                            native: true
                        }}
                        labelDisplayedRows={({ from, to, count, page }) => `第${page + 1}頁、 第${from}筆 - 第${to}筆、 共 ${count} 筆`}
                        labelRowsPerPage="顯示筆數"
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </Paper>
            </div>
        );
    }
}

export default InfectedList;