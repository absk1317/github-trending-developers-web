import React from 'react';

export default ({ href, target = '_blank', style = {}, rel = 'noopener noreferrer', children }) => {
  return (
    <a href={href} target={target} style={{ ...style, textDecoration: 'none' }} rel={rel}>
      {children}
    </a>
  );
};
