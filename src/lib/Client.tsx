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
  private container: HTMLDivElement;
  private baseUrl: string;

  private isLoading: boolean = true;
  private isOpen: boolean = false;

  constructor(options: ClientOptions) {
    this.clientOptions = options;
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

    this.container = document.createElement('div');
    (this.container as any).setAttribute('id', 'persona-widget-container');
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
        if (this.clientOptions.onStart !== undefined) {
          this.clientOptions.onStart(event.data['inquiry-id']);
        } else {
          console.log("Missing onStart callback");
        }
        break;

      case 'success':
        if (this.clientOptions.onSuccess !== undefined) {
          this.clientOptions.onSuccess(event.data.metadata);
        } else {
          console.log("Missing onSuccess callback");
        }
        break;
    }

    this.render();
  }
}
