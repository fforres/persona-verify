import * as React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import LoadingIndicator from 'components/LoadingIndicator';
import Widget from 'components/Widget';
import { MEDIA_QUERIES } from 'lib/styles';

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

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
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
  @media ${MEDIA_QUERIES.isMobile} {
    html body > *:not(#${(props: OpenGlobalStyleProps) => props.containerId}) {
      display: none !important;
    }
  }
`;

export interface ApplicationProps {
  blueprintId: string;
  themeId: string;
  containerId: string;
  isLoading: boolean;
  isOpen: boolean;
  language: string;
  personaBaseUrl: string;
  refIframe: React.RefObject<HTMLIFrameElement>;
  subject: string;
}

export default (props: ApplicationProps) => {
  return (
    <Overlay isOpen={props.isOpen}>
      {props.isLoading && <LoadingIndicator  />}

      <Widget
        blueprintId={props.blueprintId}
        themeId={props.themeId}
        language={props.language}
        personaBaseUrl={props.personaBaseUrl}
        refIframe={props.refIframe}
        subject={props.subject}
      />
      {props.isOpen && <OpenGlobalStyle containerId={props.containerId} />}
    </Overlay>
  );
}
