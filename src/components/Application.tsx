import * as React from 'react';

import styled, { createGlobalStyle, keyframes } from 'styled-components';

import CenteredFrame from 'components/CenteredFrame';
import { ClientOptions } from 'lib/Client';
import LoadingSpinner from 'components/LoadingSpinner';
import Logo from 'images/logo.svg';
import { MEDIA_QUERIES } from 'lib/styles';
import Widget from 'components/Widget';

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
  left: 50%;
  transform: translateX(-50%);

  & svg {
    height: 51px;
  }

  & path {
    fill: white;
  }

  @media ${MEDIA_QUERIES.isMobile} {
    display: none;
  }
`

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
        templateId={props.clientOptions.templateId}
        themeId={props.clientOptions.themeId}
        environment={props.clientOptions.environment}
        inquiryId={props.clientOptions.inquiryId}
        language={props.clientOptions.language}
        personaBaseUrl={props.personaBaseUrl}
        prefill={props.clientOptions.prefill}
        refIframe={props.refIframe}
        accessToken={props.clientOptions.accessToken}
        referenceId={props.clientOptions.referenceId}
      />
      {props.isOpen && <OpenGlobalStyle containerId={props.containerId} />}

      <PoweredBy><Logo/></PoweredBy>
    </Overlay>
  );
}
