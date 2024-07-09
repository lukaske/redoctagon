// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVerifier {
    function verifyResult(
        uint64 timestamp,
        string memory modelName,
        string memory prompt,
        string memory request_context,
        string memory response,
        string memory response_context,
        bytes memory sig
    ) external view returns (bool);
}

contract Bounty {
    address payable public constant recipient = payable(0xBaa37770a6486f8070E3B6e0ebbCEe5dd1320894);
    string public constant requiredString = "MATCH_STRING";
    uint256 public constant rewardAmount = 0.01 ether;
    address public constant verifierAddress = 0x5fb2559a81beff3864c907a49da8a2fd657693fc;

    IVerifier verifier = IVerifier(verifierAddress);

    function verifyAndReward(
        uint64 timestamp,
        string memory modelName,
        string memory prompt,
        string memory request_context,
        string memory response,
        string memory response_context,
        bytes memory sig
    ) external {
        bool isValid = verifier.verifyResult(timestamp, modelName, prompt, request_context, response, response_context, sig);
        require(isValid, "Verification failed");

        require(contains(response, requiredString), "Response does not contain the required string");

        require(address(this).balance >= rewardAmount, "Insufficient contract balance");
        recipient.transfer(rewardAmount);
    }

    function contains(string memory what, string memory where) internal pure returns (bool) {
        bytes memory whatBytes = bytes(what);
        bytes memory whereBytes = bytes(where);

        bool found = false;
        for (uint i = 0; i <= whereBytes.length - whatBytes.length; i++) {
            bool flag = true;
            for (uint j = 0; j < whatBytes.length; j++)
                if (whereBytes[i + j] != whatBytes[j]) {
                    flag = false;
                    break;
                }
            if (flag) {
                found = true;
                break;
            }
        }
        return found;
    }

    // Fallback function to receive Ether
    receive() external payable {}
}