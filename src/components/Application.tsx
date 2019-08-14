import * as React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

import CenteredFrame from 'components/CenteredFrame';
import LoadingSpinner from 'components/LoadingSpinner';
import Logo from 'images/logo.svg';
import Widget from 'components/Widget';
import { MEDIA_QUERIES } from 'lib/styles';
import { ClientOptions } from 'lib/Client';

const OVERLAY_OPACITY = 0.7;

const fadeIn = keyframes`
  from {
    background-color: rgba(0, 0, 0, 0);
    opacity: 0;
  }
  to {
    background-color: rgba(0, 0, 0, ${OVERLAY_OPACITY});
    opacity: 1;
  }
`;

interface OverlayProps {
  isOpen: boolean;
}

const Overlay = styled('div')`
  animation: ${fadeIn} .3s;
  background-color: rgba(0, 0, 0, ${OVERLAY_OPACITY});
  display: ${(props: OverlayProps) => props.isOpen ? 'block' : 'none'};

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

const PoweredBy = styled('div')`
  position: absolute;
  bottom: 8px;
  right: 8px

  color: white;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;

  display: flex;
  align-items: center;

  @media ${MEDIA_QUERIES.isMobile} {
    display: none;
  }
`

const PersonaLogo = styled('div')`
  margin-left: 4px;
  padding-top: 3px;
`

interface OpenGlobalStyleProps {
  containerId: string;
}

const OpenGlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');

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
  clientOptions: ClientOptions;
  containerId: string;
  isLoading: boolean;
  isOpen: boolean;
  personaBaseUrl: string;
  refIframe: React.RefObject<HTMLIFrameElement>;
}

export default (props: ApplicationProps) => {
  return (
    <Overlay isOpen={props.isOpen}>
      {props.isLoading &&
        <CenteredFrame>
          <LoadingSpinner />
        </CenteredFrame>
      }

      <Widget
        blueprintId={props.clientOptions.blueprintId}
        themeId={props.clientOptions.themeId}
        environment={props.clientOptions.environment}
        inquiryId={props.clientOptions.inquiryId}
        language={props.clientOptions.language}
        personaBaseUrl={props.personaBaseUrl}
        prefill={props.clientOptions.prefill}
        refIframe={props.refIframe}
        sessionToken={props.clientOptions.sessionToken}
        subject={props.clientOptions.subject}
        referenceId={props.clientOptions.referenceId}
      />
      {props.isOpen && <OpenGlobalStyle containerId={props.containerId} />}

      <PoweredBy>Powered by <PersonaLogo><Logo/></PersonaLogo></PoweredBy>
    </Overlay>
  );
}
