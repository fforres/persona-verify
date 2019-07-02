import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import ImageLoadingLoop from 'images/loading/loop.svg';

const rotating = keyframes`
  from {
    transform: translate(-50%,-50%) rotate(0deg);
  }
  to {
    transform: translate(-50%,-50%) rotate(360deg);
  }
`;

const Container = styled('div')`
  position: relative;
  width: 120px;
  height: 120px;
`;

const Loop = styled('div')`
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${rotating} 5s linear infinite;
  }
`;

export default () => {
  return (
    <Container>
      <Loop>
        <ImageLoadingLoop />
      </Loop>
    </Container>
  );
};
