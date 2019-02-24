import * as React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
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

  // When the widget is not the full screen, fixed keeps it in the center.
  @media only screen and (min-width: 600.02px) and (min-height: 600.02px) {
    position: fixed;
  }
`;

interface OpenGlobalStyleProps {
  containerId: string;
}

const OpenGlobalStyle = createGlobalStyle`
  // Don't allow scrolling when widget is open
  html body {
    overflow: hidden !important;
  }

  // When the widget takes the full screen, we place it inline to prevent iOS scroll issues.
  @media only screen and (max-width: 600px), (max-height: 600px) {
    html body > *:not(#${(props: OpenGlobalStyleProps) => props.containerId}) {
      display: none !important;
    }
  }
`;

export interface ApplicationProps {
  blueprintId: string;
  containerId: string;
  isLoading: boolean;
  isOpen: boolean;
  personaBaseUrl: string;
  refIframe: React.RefObject<HTMLIFrameElement>;
}

export default (props: ApplicationProps) => {
  return (
    <Overlay isOpen={props.isOpen}>
      {props.isLoading && <LoadingIndicator  />}

      <Widget
        blueprintId={props.blueprintId}
        personaBaseUrl={props.personaBaseUrl}
        refIframe={props.refIframe}
      />
      {props.isOpen && <OpenGlobalStyle containerId={props.containerId} />}
    </Overlay>
  );
}
