import { Button, Group, Container, Box, Badge, Input, Space, Text } from "@mantine/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import abi from '../contracts/verifier.abi.json';
import { useState } from "react";
import axios from 'axios';


export default function IndexPage() {

  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const contractAddress = '0xYourContractAddressHere';
  
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
  })


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
        <Button onClick={async () => {
          // const contract = publicClient.contract(abi, contractAddress);
          // const result = await contract.methods.verify(message).call();
          // console.log(result);
        }}>Verify</Button>
      </Group>

    </Container>
  );
}
