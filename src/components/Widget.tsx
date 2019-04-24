import * as React from 'react';
import * as queryString from 'query-string';
import styled, { keyframes } from 'styled-components';

const genieSlideIn = keyframes`
  from {
    transform: translate(-50%, -40%) scale(.8);
  }
  90% {
    transform: translate(-50%, -51%) scale(1.01);
  }
  to {
    transform: translate(-50%, -50%);
  }
`

const slideDown = keyframes`
  from {
    transform: translate(-50%, -55%);
  }
  to {
    transform: translate(-50%, -50%);
  }
`;

const Iframe = styled('iframe')`
  animation: ${genieSlideIn} .3s, ${slideDown} ease-out .3s;

  width: 100%;
  height: 100%;

  margin-left: auto;
  margin-right: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: #FFFFFF;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 12px 40px 2px #555555;

  @media only screen and (min-width: 600.02px) and (min-height: 600.02px) {
    max-width: 400px;
    max-height: 650px;
  }
`;

export interface WidgetProps {
  blueprintId: string;
  themeId: string;
  language: string;
  personaBaseUrl: string;
  refIframe: React.RefObject<HTMLIFrameElement>;
  subject: string;
}

export default (props: WidgetProps) => {
  const queryParams = queryString.stringify({
    'blueprint-id': props.blueprintId,
    'iframe-origin': window.location.origin,
    language: props.language,
    subject: props.subject,
    'theme-id': props.themeId,
  });

  return (
    <Iframe
      allow='camera'
      sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-modals'
      frameBorder='0'
      ref={props.refIframe}
      src={props.personaBaseUrl + '/widget?' + queryParams}
    >
    </Iframe>
  );
}
