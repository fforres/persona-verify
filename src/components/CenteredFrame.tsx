import * as React from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  width: 120px;
  height: 120px;
  position: absolute;
  left: calc(50% - 60px);
  top: calc(50% - 60px);
  z-index: 9999;
`;

export default (props) =>
  <Container>
    {props.children}
  </Container>;
