import Client from 'lib/Client';

describe('Client', () => {
  const mockHandleStart = jest.fn();
  const mockHandleSuccess = jest.fn();

  const client = new Client({
    blueprintId: 'test-blueprint-id',
    themeId: 'test-theme-id',
    onStart: mockHandleStart,
    onSuccess: mockHandleSuccess,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders', () => {
    expect(document.getElementsByTagName('iframe')).toHaveLength(1);
  });

  it('handles onStart', async (done) => {
    mockHandleStart.mockImplementation((inquiryId) => {
      expect(inquiryId).toEqual('test-inquiry-id');
      done();
    });

    client.handleMessage({
      origin: 'https://withpersona.com',
      data: {
        blueprintId: 'test-blueprint-id',
        themeId: 'test-theme-id',
        action: 'start',
        metadata: { inquiryId: 'test-inquiry-id', },
      },
    });
  })
});
