import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';



EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
  };

  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: '國家/地區' },
    { id: 'new_confirmed', numeric: false, disablePadding: false, label: '新增病例' },
    { id: 'confirmed', numeric: false, disablePadding: false, label: '已確診' },
    { id: 'no_symptom', numeric: false, disablePadding: false, label: '無症狀人數' },
    { id: 'recovered', numeric: false, disablePadding: false, label: '恢復人數' },
    { id: 'deaths', numeric: false, disablePadding: false, label: '死亡人數' }
  ];

export default function EnhancedTableHead(props) {
    const { order, orderBy,  onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              style={{ padding: "12px"}}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'desc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}

              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }