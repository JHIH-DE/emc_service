import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

export default function AddInfectedDialog({ title, addInfectedItem }) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        year: '2020',
        name: '嚴重特殊傳染性肺炎Test',
    });
    const [age, setAge] = React.useState('41-50');
    const [month, setMonth] = React.useState('4');
    const [city, setCity] = React.useState('台北市');
    const [gender, setGender] = React.useState('M');
    const [imported, setImported] = React.useState('是');

    const ages = [
        {
            value: '≤10',
            label: '≤ 10歲',
        },
        {
            value: '11-20',
            label: '11歲 - 20歲',
        },
        {
            value: '21-30',
            label: '21歲 - 30歲',
        },
        {
            value: '31-40',
            label: '31歲 - 40歲',
        },
        {
            value: '41-50',
            label: '41歲 - 50歲',
        },
        {
            value: '51-60',
            label: '51歲 - 60歲',
        },
        {
            value: '61-70',
            label: '61歲 - 70歲',
        },
        {
            value: '71-80',
            label: '71歲 - 80歲',
        },
        {
            value: '81≥',
            label: '81歲 ≥',
        }
    ];

    const months = [
        {
            value: '1',
            label: '1月',
        },
        {
            value: '2',
            label: '2月',
        },
        {
            value: '3',
            label: '3月',
        },
        {
            value: '4',
            label: '4月',
        },
        {
            value: '5',
            label: '5月',
        },
        {
            value: '6',
            label: '6月',
        },
    ];

    const cities = [
        {
            value: '基隆市',
            label: '基隆市',
        },
        {
            value: '台北市',
            label: '台北市',
        },
        {
            value: '新北市',
            label: '新北市',
        },
        {
            value: '宜蘭縣',
            label: '宜蘭縣',
        },
        {
            value: '桃園市',
            label: '桃園市',
        },
        {
            value: '新竹市',
            label: '新竹市',
        },
        {
            value: '苗栗縣',
            label: '苗栗縣',
        },
        {
            value: '台中市',
            label: '台中市',
        },
        {
            value: '雲林縣',
            label: '雲林縣',
        },
        {
            value: '彰化縣',
            label: '彰化縣',
        },
        {
            value: '台南市',
            label: '台南市',
        },
        {
            value: '高雄市',
            label: '高雄市',
        },
    ];

    const genders = [
        {
            value: 'M',
            label: '男性',
        },
        {
            value: 'F',
            label: '女性',
        },
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const imported = event.target.name;
        setState({
            ...state,
            [imported]: event.target.value,
        });
    };

    const handleChangeMonth = (event) => {
        setMonth(event.target.value);
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeImported = (event) => {
        setImported(event.target.value);
    };

    const clickAddInfectedItem = (event) => {
        const wrapper = { name: state.name, year: state.year, month: month, city: city, age: age, gender: gender, imported: imported, confirmed: '1' };
        addInfectedItem(wrapper);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                {title}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        新增傳染性肺炎感染者，請在此輸入相關資料。
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    /> */}
                    <TextField
                        disabled
                        id="name-select-currency"
                        label="病名"
                        defaultValue={state.name}
                        style={{ marginLeft: '20px', marginRight: '20px', width: '150px', }}
                    />
                    <TextField
                        disabled
                        id="year-select-currency"
                        label="年"
                        defaultValue={state.year}
                        style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px', width: '100px', }}
                    />
                    <TextField
                        id="month-select-currency"
                        select
                        label="月份"
                        value={month}
                        onChange={handleChangeMonth}
                        style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px', width: '100px', }}
                    >
                        {months.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="city-select-currency"
                        select
                        label="城市"
                        value={city}
                        onChange={handleChangeCity}
                        style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px', width: '100px', }}
                    >
                        {cities.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="age-select-currency"
                        select
                        label="年齡"
                        value={age}
                        onChange={handleChangeAge}
                        style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px', width: '150px', }}
                    >
                        {ages.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="gender-select-currency"
                        select
                        label="性別"
                        value={gender}
                        onChange={handleChangeGender}
                        style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px', width: '100px', }}
                    >
                        {genders.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id="imported-select-currency"
                        select
                        label="境外移入"
                        value={imported}
                        onChange={handleChangeImported}
                        style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px', width: '100px', }}
                    >
                        <MenuItem key="是" value="是">
                            是
                    </MenuItem>
                        <MenuItem key="否" value="否">
                            否
                    </MenuItem>
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
          </Button>
                    <Button onClick={clickAddInfectedItem} color="primary">
                        新增
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
