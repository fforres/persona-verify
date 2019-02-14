import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import LoadingIndicator from 'components/LoadingIndicator';
import Widget from 'components/Widget';

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
  }
  to {
    background-color: rgba(0, 0, 0, .3);
    opacity: 1;
  }
`;

interface OverlayProps {
  isOpen: boolean;
}

const Overlay = styled('div')`
  animation: ${fadeIn} .3s;
  background-color: rgba(0, 0, 0, .3);
  display: ${(props: OverlayProps) => props.isOpen ? 'block' : 'none'};

  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;


  @media only screen and (min-width: 600.02px) {
    position: fixed;
  }
`;

export interface ApplicationProps {
  blueprintId: string;
  isLoading: boolean;
  isOpen: boolean;
  personaBaseUrl: string;
}

export default (props: ApplicationProps) => {
  return (
    <Overlay isOpen={props.isOpen}>
      {props.isLoading && <LoadingIndicator  />}

      <Widget
        blueprintId={props.blueprintId}
        personaBaseUrl={props.personaBaseUrl}
      />
    </Overlay>
  );
}
