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

const Positioner = styled('div')`
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

  @media only screen and (max-width: 600px) {
    max-width: 100%;
    max-height: 100%;
  }

  @media only screen and (min-width: 600.02px) {
    max-width: 400px;
    max-height: 650px;
  }
`;

const StyledIframe = styled('iframe')`
  height: 100%;
  width: 100%;
`;

export interface WidgetProps {
  blueprintId: string;
  personaBaseUrl: string;
}

export default (props: WidgetProps) => {
  const queryParams = queryString.stringify({
    'blueprint-id': props.blueprintId,
    'iframe-origin': window.location.origin,
  });

  return (
    <Positioner>
      <StyledIframe
        allow='camera'
        sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-modals'
        frameBorder='0'
        src={props.personaBaseUrl + '/widget/v1?' + queryParams}
      >
      </StyledIframe>
    </Positioner>
  );
}
