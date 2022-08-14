const snapId = `local:http://localhost:8081/`;

function validateInputs() {
    // name is required for registering
    let requiredFields = {}
    if (window.location.href.endsWith("register")) {
        const name = document.getElementById("name").value;
        requiredFields["name"] = name;
    }

    // email is required for registration and login both
    const emailId = document.getElementById("email").value;
    requiredFields["email"] = emailId;

    // check if all required fields are filled
    if (Object.values(requiredFields).includes("")) {
        alert(`Please fill ${Object.keys(requiredFields)}`);
        return false;
    }
    else {
        return true;
    }
}

async function createUsingSnap() {

    if (!validateInputs()) {
        return false;
    }

    let emailId = document.getElementById("email").value;
    let domainName = window.location.hostname;
    // console.log(emailId, domainName)

    // install snap
    await ethereum.request({
        method: 'wallet_enable',
        params: [{
            wallet_snap: { [snapId]: {} },
        }]
    }).catch(err => {
        console.log(err);
    });

    // get list of connected snaps, only for testing purposes
    installedSnaps = await ethereum.request({ method: 'wallet_getSnaps' });
    console.log(installedSnaps);

    // call generate password
    let newPassword = await ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
            snapId,
            {
                method: 'generatePassword',
                params: {
                    emailId: emailId,
                    domainName: domainName,
                }
            }

        ]
    }).catch(err => {
        console.log(err)
    });


    // document.getElementById("password").value = newPassword
    // console.log(newPassword)
    let submitButton = document.getElementById("submit-button")
    submitButton.click()

}
