import nacl from 'tweetnacl';

export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event));

  const PUBLIC_KEY = process.env.PUBLIC_KEY;

  const signature = event.headers['x-signature-ed25519'];
  const timestamp = event.headers['x-signature-timestamp'];
  const body = event.body;

  if (!signature || !timestamp || !body) {
    return {
      statusCode: 400,
      body: 'Missing headers or body',
    };
  }

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: 'Invalid request signature',
    };
  }

  const json = JSON.parse(body);

  if (json.type === 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ type: 1 }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      type: 4,
      data: { content: 'Hello from Lambda! (Node 22.x)' },
    }),
  };
};
