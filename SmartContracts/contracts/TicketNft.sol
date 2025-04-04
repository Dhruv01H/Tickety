// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventTicketNFT is ERC721Enumerable, Ownable(address(msg.sender)) {
    mapping(bytes32 => uint256) public seatToTokenId; // Maps hashed seat string to Token ID
    mapping(uint256 => string) public tokenIdToSeat; // Maps Token ID to seat string
    mapping(uint256 => bool) public ticketUsed; // Maps Token ID to usage status

    uint256 private nextTokenId = 1;

    event TicketStatusUpdated(uint256 tokenId, bool used);

    constructor() ERC721("EventTicket", "TICKET") {}

    // Add function to update ticket status
    function updateTicketStatus(string memory seatNumber, bool used) public onlyOwner {
        bytes32 seatHash = keccak256(abi.encodePacked(seatNumber));
        uint256 tokenId = seatToTokenId[seatHash];
        require(tokenId != 0, "Seat does not exist");
        ticketUsed[tokenId] = used;
        emit TicketStatusUpdated(tokenId, used);
    }

    // Add function to check ticket status
    function isTicketUsed(string memory seatNumber) public view returns (bool) {
        bytes32 seatHash = keccak256(abi.encodePacked(seatNumber));
        uint256 tokenId = seatToTokenId[seatHash];
        require(tokenId != 0, "Seat does not exist");
        return ticketUsed[tokenId];
    }

    // ... rest of the existing code ...
}
