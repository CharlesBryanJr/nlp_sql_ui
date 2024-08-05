const { makeStyles } = require('@material-ui/core/styles');

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9', // You can keep this or adjust as needed
    },
    secondary: {
      main: '#f48fb1', // You can keep this or adjust as needed
    },
    background: {
      default: '#787878', // Significantly lighter than before
      paper: '#888888', // Significantly lighter than before
    },
    text: {
      primary: '#ffffff',
      secondary: '#c0c0c0', // Lighter secondary text for better contrast
    },
  },
});

export default makeStyles(() => ({
  ul: {
    justifyContent: 'space-around',
  },
}));