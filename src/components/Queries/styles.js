const { makeStyles, createTheme } = require('@material-ui/core/styles');
const { deepPurple } = require('@material-ui/core/colors');

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: deepPurple[500],
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3',
    },
  },
});

module.exports = makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: darkTheme.palette.background.paper,
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: darkTheme.palette.text.primary,
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  purple: {
    color: darkTheme.palette.getContrastText(darkTheme.palette.primary.main),
    backgroundColor: darkTheme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 20px',
    },
    heading: {
      display: 'none',
    },
    userName: {
      display: 'none',
    },
    image: {
      marginLeft: '5px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '160px',
    },
  },
  actionDiv: {
    textAlign: 'center',
  },
  // New styles for dark mode
  paper: {
    backgroundColor: darkTheme.palette.background.paper,
    color: darkTheme.palette.text.primary,
  },
  secondaryText: {
    color: darkTheme.palette.text.secondary,
  },
}));