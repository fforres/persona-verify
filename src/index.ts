import Client from 'lib/Client';

export { Client };

if (process.env.NODE_ENV === 'development') {
  const client: Client = new Client({
    blueprintId: 'asdf',
    onLoad: () => client.open(),
    onStart: (token: string) => console.log(token),
    onSuccess: () => {},
  });
}
