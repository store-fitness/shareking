import React from 'react';
import {
  Box,

  FormControl,

  MenuItem,
  Select,
} from '@mui/material';
const Currency = ({ currency, currencyList, setCurrency }) => {
  const handleChange = (event) => {
    const equal = currencyList.filter(
      (item) => item.code === event.target.value
    );

    setCurrency(equal[0]);
  };
  return (
    <Box align="right">
      <FormControl
        variant="filled"
        sx={{ backgroundColor: 'whitesmoke', minWidth: 40 }}
      >
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency?.code}
          label="Currency"
          onChange={handleChange}
          autoWidth
          autoFocus
          sx={{
            borderRadius: 2,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          {currencyList?.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Currency;
