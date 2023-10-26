


import {Select, MenuItem, FormControl, InputLabel} from '@mui/material';

const Dropdown = ({
    label,
    id,
    value,
    name,
    handleChange,
    options,
    ...props
}) =>{
    return(
    <> 
        <FormControl fullWidth>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                id={id}
                value={value}
                label={label}
                onChange={handleChange}
                name={name}
                {...props}
            >
                {
                    options.map(option => (
                        <MenuItem value={option}>{option}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    </>
);
}

export default Dropdown;