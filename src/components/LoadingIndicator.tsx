import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateKeyframes = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled('svg')`
  width: 120px;
  height: 120px;
  animation: ${rotateKeyframes} linear 1.3s infinite;
  position: absolute;
  left: calc(50% - 60px);
  top: calc(50% - 60px);
  z-index: 9999;
`;

const Spinner = styled('circle')`
  stroke-dasharray: 166;
  stroke-dashoffset: 110;
  stroke-linecap: round;
  stroke-width: 2;
  stroke: #33C15D;
  fill: none;
`;

export default () => {
  return (
    <Container viewBox='0 0 52 52'>
      <Spinner cx='26' cy='26' r='25' />
    </Container>
  );
}
