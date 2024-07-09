import { Button, Group, Container } from "@mantine/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import abi from '../contracts/verifier.abi.json';

export default function IndexPage() {

  const contractAddress = '0xYourContractAddressHere';
  
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http()
  })

  
  

  const testVerifier = async () => {
    const data = await publicClient.readContract({
      address: '0x5fb2559a81beff3864c907a49da8a2fd657693fc',
      abi: ,
      functionName: 'totalSupply',
    })
  
  };

  return (
    <Container fluid>
      <Group mt={50} justify="center">
        <ConnectButton />
      </Group>
      <Group mt={50} justify="center">
        <Button onClick={testVerifier}>Test verifier</Button>  
      </Group>


    </Container>
  );
}
