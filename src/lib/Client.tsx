import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from 'components/Application';

const PERSONA_BASE_URL = 'http://localhost:3000';

export interface ClientOptions {
  blueprintId: string;
  environment?: string;

  onLoad?: () => void;
  onStart: (token: string) => void;
  onSuccess: () => void;
  onExit?: () => void;
}

export default class Client {
  private clientOptions: ClientOptions;
  private container: HTMLDivElement;

  private isLoading: boolean = true;
  private isOpen: boolean = false;

  constructor(options: ClientOptions) {
    this.clientOptions = options;

    this.container = document.createElement('div');
    document.children[0].append(this.container);

    window.addEventListener("message", this.handleMessage);

    this.render();
  }

  render() {
    ReactDOM.render(
      <Application
        blueprintId={this.clientOptions.blueprintId}
        isLoading={this.isLoading}
        isOpen={this.isOpen}
        personaBaseUrl={PERSONA_BASE_URL}
      />,
      this.container,
    );
  }

  open() {
    this.isOpen = true;

    const htmlNode = document.getElementsByTagName("html")[0];
    htmlNode.className += " persona-widget-open";

    this.render();
  }

  exit() {
    this.isOpen = false;

    const htmlNode = document.getElementsByTagName("html")[0];
    htmlNode.className = htmlNode.className.split(' ')
      .filter(className => className !== 'persona-widget-open')
      .join(' ');

    this.render();
  }

  handleMessage = (event) => {
    if (event.origin !== PERSONA_BASE_URL) {
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
          this.clientOptions.onStart(event.data.metadata.token);
        } else {
          console.log("Missing onStart callback");
        }
        break;

      case 'success':
        if (this.clientOptions.onSuccess !== undefined) {
          this.clientOptions.onSuccess();
        } else {
          console.log("Missing onSuccess callback");
        }
        break;
    }

    this.render();
  }
}
