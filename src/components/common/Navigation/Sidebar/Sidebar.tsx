/* eslint-disable linebreak-style */
import React from 'react';
import Link from 'next/link';
import { Title, Box } from '@mantine/core';
import { useStyles } from '../Navigation.styled';

function Sidebar() {
  const { classes } = useStyles();

  return (
    <div style={{ padding: '1rem' }}>
      <Link href="/" passHref>
        <span className={classes.logo}>
          <Title color="brand">
            REEL
            <Box component="span" sx={{ color: 'white' }}>
              RIOT
            </Box>
          </Title>
        </span>
      </Link>
    </div>
  );
}

export default Sidebar;