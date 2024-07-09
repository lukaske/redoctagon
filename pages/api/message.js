// pages/api/users.js
import axios from 'axios';
import ethers from 'ethers';
import { abi } from '../../contracts/abi';



// let users = [];

async function sendMessage(msg) {
    // let msg = conversation[conversation.length - 1];
    let data = JSON.stringify({
      "model": "llama2",
      "prompt": msg,
    });

    let config = {
      method: 'post',
      url: 'http://13.202.156.182:5000/api/generate',
      headers: { 
        'Host': 'localhost', 
        'Content-Type': 'application/json'
      },
      data : data
    };

    let res = await axios(config);

    // Connect to the Polygon network
    const provider = new ethers.JsonRpcProvider(`https://polygon-rpc.com`);
    const contractAddress = '0x1B5c3f46A28bC690abF55Bb4d29bd6496d060d66';  

    // Define your wallet and contract details
    const privateKey = 'a80e4bd8f6b1a3c20518170f4c1b2806e3273237c77f14bae5a208ed3ef915c7';
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    // extract the signature from response headers
    const signature = Buffer.from(res.headers["x-oyster-signature"], "hex");

    // response can be verified using the signature which is extracted from the response headers
    let res2 = await contract.verifyResult(
        parseInt(res.headers["x-oyster-timestamp"]), // time at which inference was done
        model, // name of the model
        prompt, // prompt used for inference
        JSON.stringify([]), // input context for inference
        res.data.response, // response of the inference
        JSON.stringify(res.data.context), // output context for inference
        signature // signature by the enclave key to verify that the inference was done correctly within an enclave
    );   
    console.log(res);
    

    return res.data;
}

export default async function handler(req, res) {
   if (req.method === 'POST') {
        const { message } = req.body;
        console.log('DELA POST', message);
        let myres = await sendMessage(message)

        res.status(200).json({ data: myres });


    // const user = req.body;
        // res.status(201).json({ message: 'Message received' });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
