import { Button, Group, Container } from "@mantine/core";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import abi from '../contracts/verifier.abi.json';

export default function IndexPage() {  

  return (
    <Container fluid>
      <Group mt={50} justify="center">
        <ConnectButton />
      </Group>
      <Group mt={50} justify="center">
        <Button>Test verifier</Button>  
      </Group>
    </Container>
  );
}
