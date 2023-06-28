// import NextLink from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';

export const SideNavItem = (props) => {
  const theme = useTheme();

  const { active = false, disabled, external, icon, path, title } = props;
  // console.group(title)
  // console.log('path: ', path)
  // console.log('external: ', external)

  // // const a1 = path ? external  ? "a" :"b":"C";
  // // console.log( 'path ? external  ? "a" :"b": "c" --->', a1)
  // // console.groupEnd(title)

  const linkProps = path ? { href: path}: {}

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
          }
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'primary.dark',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'secondary.contrastText',
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'primary.dark',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'secondary.contrastText'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
