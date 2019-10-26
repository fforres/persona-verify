import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Application from 'components/Application';
import { PrefillAttributes, ClientError } from 'lib/interfaces';

export interface ClientOptions {
  templateId?: string;
  themeId?: string;
  environment?: string;
  host?: string;
  subject?: string;
  referenceId?: string;

  inquiryId?: string;
  accessToken?: string;

  language?: string;
  prefill?: PrefillAttributes;

  onLoad?: (error: ClientError) => void;
  onStart?: (inquiryId: string) => void;
  onComplete?: (inquiryId: string, scopes: {}) => void;
  onExit?: (error: ClientError | undefined, metadata: {}) => void;
  onEvent?: (name: string, metadata: {}) => void;
}

export default class Client {
  private clientOptions: ClientOptions;
  private containerId: string;
  private container: HTMLDivElement;
  private baseUrl: string;
  private refIframe: React.RefObject<HTMLIFrameElement>;

  private isLoading: boolean = true;
  private isOpen: boolean = false;

  constructor(options: ClientOptions) {
    this.clientOptions = options;
    this.refIframe = React.createRef();

    // User error handling
    if (!options.templateId) {
      throw new Error('templateId must be value string');
    }
    if (typeof options.onComplete !== 'function') {
      throw new Error('onComplete callback must be function');
    }

    // Setup message handling
    switch(options.host) {
      case 'development':
        this.baseUrl = 'http://localhost:3000';
        break;

      case 'staging':
        this.baseUrl = 'https://staging.withpersona.com';
        break;

      default:
        this.baseUrl = 'https://withpersona.com';
        break;
    }
    window.addEventListener("message", this.handleMessage);

    // Create container div
    this.container = document.createElement('div');
    this.containerId = "persona-widget-" + new Array(16).fill(undefined).
      map(() => Math.floor(Math.random() * 35).toString(35)).
      join('');
    (this.container as any).setAttribute('id', this.containerId);

    if (document.body) {
      document.body.appendChild(this.container);
    } else {
      document.children[0].appendChild(this.container);
    }

    this.render();
  }

  render() {
    ReactDOM.render(
      <Application
        clientOptions={this.clientOptions}
        containerId={this.containerId}
        isLoading={this.isLoading}
        isOpen={this.isOpen}
        personaBaseUrl={this.baseUrl}
        refIframe={this.refIframe}
      />,
      this.container,
    );
  }

  open() {
    this.isOpen = true;
    this.render();
  }

  exit(force: boolean) {
    if (this.refIframe.current) {
      (this.refIframe.current as any).contentWindow.postMessage({
        action: 'exit',
        metadata: { force },
      }, this.baseUrl);
    }
    this.render();
  }

  handleMessage = (event) => {
    const templateId = this.clientOptions.templateId;
    if (
      event.origin !== this.baseUrl ||
      event.data.templateId !== templateId
    ) {
      return;
    }

    switch (event.data.name) {
      case 'load':
        this.isLoading = false;
        this.clientOptions.onLoad &&
          this.clientOptions.onLoad(event.data.error);
        break;

      case 'start':
        this.clientOptions.onStart &&
          this.clientOptions.onStart(event.data.metadata.inquiryId);
        break;

      case 'complete':
        this.isOpen = false;
        this.clientOptions.onComplete &&
          this.clientOptions.onComplete(
            event.data.metadata.inquiryId,
            event.data.metadata.scopes,
          );
        break;

      case 'exit':
        this.isOpen = false;
        this.clientOptions.onExit &&
          this.clientOptions.onExit(event.data.error, {});
        break;

      default:
        this.clientOptions.onEvent &&
          this.clientOptions.onEvent(event.data.name, event.data.metadata);
        break;
    }

    this.render();
  }
}
