import React from 'react';

export default function Subtitle(props) {
  const { children } = props;

  const subtitleStyle = {
    padding: '0px 16px',
    height: '1.5em',
    lineHeight: '1.5em',
  };

  return (
    <h1 style={subtitleStyle}>
      { children }
    </h1>
  );
}