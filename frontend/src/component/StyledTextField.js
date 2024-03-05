import { TextField } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const StyledTextField = styled((props) => (
  <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#e7e7e7' : '#e7e7e7',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#E0E3E7',
    transition: theme.transitions.create([
      'border-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'white',
    },
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
      backgroundColor: 'white'
    },
  },
}));

export default StyledTextField;