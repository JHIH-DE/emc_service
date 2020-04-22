import React, { useState, useEffect } from "react";
import './infected_list.less';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AddInfectedDialog from '../add_infected_dialog/add_infected_dialog';
import TablePaginationActions from '../../../table_pagination_actions';
import { useSelector, useDispatch } from "react-redux";
import configureStore from '../../../../store';
import { addInfectedData } from '../../../../actions/actions';

const store = configureStore();


export default function InfectedList(props) {
    const dispatch = useDispatch();
    const infectedes = useSelector(state => state.infectedes.data);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const triggerAddInfected = (event) => {
        store.dispatch(addInfectedData(event)).then((returned) => {
            let temp = Object.assign([], infectedes);
            let insertData = { ...event, id: returned.data };
            dispatch({ type: 'UPDATA_INFECTED_DATA', data: temp, newData: insertData });
            setShowAlert(true);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };
    return (
        <div>
            <h1>台灣傳染性肺炎感染者列表</h1>
            {infectedes.isLoading ? <div className="progress-content"> <CircularProgress /></div> :
                <div>
                    <AddInfectedDialog title={"新增感染者"} addInfectedItem={triggerAddInfected} />
                    <Paper style={{ width: "100%" }}>
                        <TableContainer component={Paper} className="table-content">
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{width: '50px'}}>id</TableCell>
                                        <TableCell align="right">病名</TableCell>
                                        <TableCell align="right">年</TableCell>
                                        <TableCell align="right">月</TableCell>
                                        <TableCell align="right">城市</TableCell>
                                        <TableCell align="right">年齡</TableCell>
                                        <TableCell align="right">性別</TableCell>
                                        <TableCell align="right">境外移入</TableCell>
                                        <TableCell align="right">確定病例</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? infectedes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : infectedes
                                    ).map(row => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row" style={{width: '50px'}}>
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
                            count={infectedes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { "aria-label": "rows per page" },
                                native: true
                            }}
                            labelDisplayedRows={({ from, to, count, page }) => `第${page + 1}頁、 第${from}筆 - 第${to}筆、 共 ${count} 筆`}
                            labelRowsPerPage="顯示筆數"
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </Paper>
                    <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            新增感染者成功！
                </Alert>
                    </Snackbar>
                </div>
            }
        </div>
    );
}
