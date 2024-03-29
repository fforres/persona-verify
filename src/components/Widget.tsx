import * as React from 'react';
import * as qs from 'qs';
import styled, { keyframes } from 'styled-components';

import { PrefillAttributes } from 'lib/interfaces';

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
  box-shadow: 0px 12px 40px 2px rgba(0, 0, 0, 0.4);

  @media only screen and (min-width: 600.02px) and (min-height: 600.02px) {
    max-width: 400px;
    max-height: 650px;
  }
`;

export interface WidgetProps {
  templateId: string;
  themeId: string;
  environment?: string;
  inquiryId?: string;
  language: string;
  personaBaseUrl: string;
  prefill?: PrefillAttributes;
  refIframe: React.RefObject<HTMLIFrameElement>;
  accessToken?: string;
  referenceId?: string;
}

export default (props: WidgetProps) => {
  const prefill = props.prefill || {} as PrefillAttributes;
  const queryParams = qs.stringify({
    'template-id': props.templateId,
    environment: props.environment,
    'iframe-origin': window.location.origin,
    'inquiry-id': props.inquiryId,
    language: props.language,
    'session-token': props.accessToken,
    'reference-id': props.referenceId,
    'theme-id': props.themeId,
    prefill: {
      'name-first': prefill.nameFirst,
      'name-last': prefill.nameLast,
      'birthdate': prefill.birthdate,
      'address-street-1': prefill.addressStreet1,
      'address-street-2': prefill.addressStreet2,
      'address-city': prefill.addressCity,
      'address-subdivision': prefill.addressSubdivision,
      'address-postal-code': prefill.addressPostalCode,
      'country-code': prefill.countryCode,
    },
  });

  return (
    <Iframe
      allow='camera'
      sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-modals'
      frameBorder='0'
      ref={props.refIframe}
      src={props.personaBaseUrl + '/widget?' + queryParams}
      onLoad={() => {
        // TODO: check contents
      }}
    >
    </Iframe>
  );
}
