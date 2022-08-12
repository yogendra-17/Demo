module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {

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
        return { error: 'User denied permission to generate password' };
      }
      else {
        return "Password123";
      }

    default:
      throw new Error(`Method not found : ${request.method}`);
  }
};
