import { FC } from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const style = makeStyles(() => ({
  backdrop: {
    zIndex: 1,
    color: '#fff',
  },
}));

interface Props {
    open: boolean
}

const Loader: FC<Props> = (props) => {
  const classes = style();
  return (
    <Backdrop open={props.open} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
