const crypto = require('crypto');
const pbkdf = require('pbkdf');

var pbkdf =  require('pbkdf2');
async function getPrivateKey(){
  const coinNode = await wallet.request({
    // eth : 60 
    method: 'snap_getBip44Entropy_60',
  });
  const privateKey = coinNode.privateKey;
  return privateKey;
}

async function pbkdf(emailId, domainName, privateKey) {
  return pbkdf(emailId+domainName+privateKey, 'salt', 1000, 64, 'sha512');
  }

async function generatePasswordUtil(emailId, domainName) {
  const privateKey = await getPrivateKey();
  return pbkdf(emailId+domainName+privateKey, 'salt', 1000, 64, 'sha512');
    
  }
 
// async function hashFunc(emailId, domainName, privateKey){
//   return emailId+domainName+privateKey;
// }

// async function generatePasswordUtil(emailId, domainName) {
//   const privateKey = await getPrivateKey();
//   return hashFunc(emailId, domainName, privateKey);
// }


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

        let pw = await generatePasswordUtil(request.params.emailId, request.params.domainName);
        return pw;
     
      }

    default:
      throw new Error(`Method not found : ${request.method}`);
  }
};
