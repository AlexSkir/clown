import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-9px',
      width: '20px',
      height: '10px',
      '&::before': {
        borderWidth: '0 10px 10px 10px',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-9px',
      width: '20px',
      height: '10px',
      '&::before': {
        borderWidth: '10px 10px 0 10px',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-9px',
      height: '20px',
      width: '10px',
      '&::before': {
        borderWidth: '10px 10px 10px 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-9px',
      height: '20px',
      width: '10px',
      '&::before': {
        borderWidth: '10px 0 10px 10px',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  };
}

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    position: 'absolute',
    fontSize: 6,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: arrowGenerator('#6bebeb'),
  tooltip: {
    position: 'relative',
    color: 'black',
    fontSize: '18px',
    backgroundColor: '#6bebeb',
    border: '1px solid #3c8484'
  },
  tooltipPlacementLeft: {
    right: '-15px',
    margin: '0 8px',
  },
  tooltipPlacementRight: {
    margin: '0 8px',
  },
  tooltipPlacementTop: {
    right: '-15px',
    margin: '8px 0',
  },
  tooltipPlacementBottom: {
    top: '5px',
    margin: '8px 0',
  },
}));

function BootstrapTooltip(props) {
  const { arrow, ...classes } = useStylesBootstrap();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <Tooltip
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
}

BootstrapTooltip.propTypes = {
  title: PropTypes.node,
};

export default function CustomizedTooltips(props) {
  return (
    <BootstrapTooltip {...props} title={props.title} placement={props.placement} />
  );
}
CustomizedTooltips.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.string.isRequired
}