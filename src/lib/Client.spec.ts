import Client from 'lib/Client';

describe('Client', () => {
  const mockHandleStart = jest.fn();
  const mockHandleSuccess = jest.fn();
  const mockHandleComplete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('with template id', () => {
    let client;
    beforeAll(() => {
      client = new Client({
        templateId: 'test-template-id',
        themeId: 'test-theme-id',
        onStart: mockHandleStart,
        onSuccess: mockHandleSuccess,
        onComplete: mockHandleComplete,
      });
    });

    afterAll(() => {
      for (const iframe of document.getElementsByTagName('iframe')) {
        iframe.parentElement.removeChild(iframe);
      }
    });

    it('renders', () => {
      expect(document.getElementsByTagName('iframe')).toHaveLength(1);
      expect(document.getElementsByTagName('iframe')[0].attributes.getNamedItem('src').value)
        .toEqual('https://withpersona.com/widget?template-id=test-template-id&iframe-origin=http%3A%2F%2Flocalhost&theme-id=test-theme-id');
    });

    it('handles onStart', async (done) => {
      mockHandleStart.mockImplementation((inquiryId) => {
        expect(inquiryId).toEqual('test-inquiry-id');
        done();
      });

      client.handleMessage({
        origin: 'https://withpersona.com',
        data: {
          templateId: 'test-template-id',
          name: 'start',
          metadata: { inquiryId: 'test-inquiry-id', },
        },
      });
    });

    it('handles onComplete', async (done) => {
      mockHandleComplete.mockImplementation((metadata) => {
        expect(metadata).toEqual({ inquiryId: 'test-inquiry-id' });
        done();
      });

      client.handleMessage({
        origin: 'https://withpersona.com',
        data: {
          templateId: 'test-template-id',
          name: 'complete',
          metadata: { inquiryId: 'test-inquiry-id', },
        },
      });
    });
  });

  // TODO: v3 - remove deprecated blueprintId
  describe('with blueprint id', () => {
    beforeAll(() => {
      new Client({
        blueprintId: 'test-template-id',
        themeId: 'test-theme-id',
        onStart: mockHandleStart,
        onSuccess: mockHandleSuccess,
        onComplete: mockHandleComplete,
      });
    });

    afterAll(() => {
      for (const iframe of document.getElementsByTagName('iframe')) {
        iframe.parentElement.removeChild(iframe);
      }
    });

    it('renders', () => {
      expect(document.getElementsByTagName('iframe')).toHaveLength(1);
      expect(document.getElementsByTagName('iframe')[0].attributes.getNamedItem('src').value)
        .toEqual('https://withpersona.com/widget?template-id=test-template-id&iframe-origin=http%3A%2F%2Flocalhost&theme-id=test-theme-id');
    });
  });
});
