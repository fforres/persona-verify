import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Application from 'components/Application';

export interface ClientOptions {
  blueprintId: string;
  environment?: string;

  onLoad?: () => void;
  onStart: (inquiryId: string) => void;
  onSuccess: (metadata: {}) => void;
  onExit?: () => void;
}

export default class Client {
  private clientOptions: ClientOptions;
  private containerId: string;
  private container: HTMLDivElement;
  private baseUrl: string;

  private isLoading: boolean = true;
  private isOpen: boolean = false;

  constructor(options: ClientOptions) {
    this.clientOptions = options;

    // User error handling
    if (!options.blueprintId) {
      throw new Error('blueprintId must be value string');
    }
    if (typeof options.onStart !== 'function') {
      throw new Error('onStart callback must be function');
    }
    if (typeof options.onSuccess !== 'function') {
      throw new Error('onSuccess callback must be function');
    }

    // Setup message handling
    switch(options.environment) {
      case 'development':
        this.baseUrl = 'http://localhost:3000';
        break;

      case 'sandbox':
        this.baseUrl = 'https://sandbox.withpersona.com';
        break;

      default:
        this.baseUrl = 'https://withpersona.com';
        break;
    }
    window.addEventListener("message", this.handleMessage);

    // Create container div
    this.container = document.createElement('div');
    this.containerId = new Array(16).
      fill(undefined).
      map(() => Math.floor(Math.random() * 35).toString(35)).
      join('');
    (this.container as any).setAttribute('id', this.containerId);

    if (document.body) {
      document.body.append(this.container);
    } else {
      document.children[0].append(this.container);
    }

    this.render();
  }

  render() {
    ReactDOM.render(
      <Application
        blueprintId={this.clientOptions.blueprintId}
        containerId={this.containerId}
        isLoading={this.isLoading}
        isOpen={this.isOpen}
        personaBaseUrl={this.baseUrl}
      />,
      this.container,
    );
  }

  open() {
    this.isOpen = true;
    this.render();
  }

  exit() {
    this.isOpen = false;
    this.render();
  }

  handleMessage = (event) => {
    if (event.origin !== this.baseUrl) {
      return;
    }

    switch (event.data.action) {
      case 'load':
        this.isLoading = false;
        this.clientOptions.onLoad &&
          this.clientOptions.onLoad();
        break;

      case 'exit':
        this.isOpen = false;
        this.clientOptions.onExit &&
          this.clientOptions.onExit();
        break;

      case 'start':
        this.clientOptions.onStart(event.data['inquiry-id']);
        break;

      case 'success':
        this.clientOptions.onSuccess(event.data.metadata);
        break;
    }

    this.render();
  }
}
