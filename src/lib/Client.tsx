import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface ClientOptions {
  blueprintId: string;
  environment?: string;

  onLoad?: () => void;
  onStart: (token: string) => void;
  onSuccess: () => void;
  onExit?: () => void;
}

export default class Client {
  constructor(options: ClientOptions) {
    ReactDOM.render(<div>Hello world</div>, document.body);
  }

  open() {
    //
  }

  exit() {
    //
  }
}
