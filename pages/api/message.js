// pages/api/users.js
import axios from 'axios';

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
