import { Button, Group, Container, Box, Badge, Input, Space, Text } from "@mantine/core";
import { useState } from "react";
import axios from 'axios';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName, useReadContract } from 'wagmi'

import { useWriteContract } from 'wagmi'
import { abi } from '../contracts/abi'



export default function IndexPage() {
  const { address } = useAccount()
  const { data: hash, writeContract } = useWriteContract()

  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const contractAddress = '0x1B5c3f46A28bC690abF55Bb4d29bd6496d060d66';  

  const test = async () => {
    console.log("TESTING")
    writeContract({
      abi: abi,
      address: contractAddress,
      functionName: 'verifyResult',
      args: [
        
      ],
    })
  }



  async function sendMessage(message:string) {
      console.log("SENDING", message)
      setLoading(true);
      // let message = conversation[conversation.length - 1];
      let res = (await axios.post('/api/message', { message: message })).data.data
      console.log("RES", res)
      // setConversation([...conversation, res.response])
      setConversation(prevConversation => [...prevConversation, res.response]);
      setLoading(false);
  }

  return (
    <Container fluid>
      <Group mt={50} justify="center">
        <ConnectButton />
        {address && <Badge color="teal" style={{marginLeft: "20px"}}>Connected via {address}</Badge>}
      </Group>
      <Group style={{display: "flex", flexDirection: "column"}}>
        <h1>REDOctagon</h1>
        <p>Try to red team the chat below</p>
      </Group>
      <Group mt={50} justify="center" style={{padding: "20px"}}>
        <Box style={{width: "60%", padding: "10px", margin: "auto", border: "1px solid #cacaca", borderRadius: "10px"}}>
          {conversation.map((msg, idx) => (
            <Box style={{width: "100%"}} mt={20} mb={20}>
            <Text size={"lg"} key={idx} style={{ float: idx % 2 === 0 ? 'right' : 'left', width: "max-content", backgroundColor: "#228be6", maxWidth: "90%", color: "white", padding: "5px 15px", borderRadius: "30px"}}>{msg}</Text>
            <br />
            </Box>
          ))}
        </Box>
      </Group>
      
      <Group style={{margin: "auto", width: "max-content"}}>
        <Input placeholder="Input prompt" value={message} onChange={(x) => setMessage(x.target.value)} style={{width: "400px"}}></Input>
        <Button loading={loading} onClick={() => {
          // setConversation([...conversation, message])
          setConversation(prevConversation => [...prevConversation, message]);
          sendMessage(message);
        }}>Send</Button>
      </Group>

      <Group style={{display: "flex", justifyContent: "center", width: "100%"}} mt={50} mb={200}>
        <Button onClick={test}>Verify</Button>
      </Group>

    </Container>
  );
}
