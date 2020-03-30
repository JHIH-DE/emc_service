import React from "react";
import './infected_list.less';
import { apiGetInfectedMain } from "../../service";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class InfectedList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           data:[]
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

    
    render() {
        return (
            <div>
                <h1>台灣傳染性肺炎感染者列表</h1>
                <div className="table-content">
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
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
                            {this.state.data.map(row => (
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
                </div>
            </div>
        );
    }
}

export default InfectedList;