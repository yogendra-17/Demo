module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });


    case 'generatePassword':

      let confirmation = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Yo watch this, ${origin}!`,
            description:
              'This website is tring to generate a password',
            textAreaContent:
              'Only allow if you trust them',
          },
        ],
      })

      if (!confirmation) {
        return { error: 'User denied' };
      }
      else {
        return "Password123";
      }

    default:
      throw new Error(`Method not found : ${request.method}`);
  }
};
