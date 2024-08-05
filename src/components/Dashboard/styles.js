import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: theme.spacing(2),
    display: 'flex',
    padding: theme.spacing(2),
  },
  pagination: {
    borderRadius: 4,
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  dashboardContainer: {
    marginTop: theme.spacing(4),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  link: {
    display: 'block',
    marginBottom: theme.spacing(1),
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  itemContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  item: {
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;