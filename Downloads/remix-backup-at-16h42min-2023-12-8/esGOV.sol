// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./note.sol";
import "./ds-token.sol";

contract VestingContract is DSAuth, DSNote {
    DSToken public esBCKGOVToken;
    DSToken public BCKGOVToken;
    uint256 public constant exitCycle = 90 days;

    mapping(address => uint256) public time2fullRedemption;
    mapping(address => uint256) public vestingRatio;
    mapping(address => uint256) public lastClaimTime;

    event Deposited(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);
    event UnlockedPrematurely(address indexed user, uint256 amount);

    constructor(DSToken _esBCKGOVToken, DSToken _BCKGOVToken) {
        esBCKGOVToken = _esBCKGOVToken;
        BCKGOVToken = _BCKGOVToken;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        esBCKGOVToken.mint(msg.sender, amount);
        updateVesting(msg.sender, amount);
        emit Deposited(msg.sender, amount);
    }

    function claim() external {
        uint256 claimable = getClaimableAmount(msg.sender);
        require(claimable > 0, "No tokens available for claiming");
        esBCKGOVToken.transfer(msg.sender, claimable);
        lastClaimTime[msg.sender] = block.timestamp;
        emit Claimed(msg.sender, claimable);
    }

    function unlockPrematurely() external {
        uint256 remainingAmount = getReservedAmountForVesting(msg.sender);
        uint256 claimableAmount = getClaimableAmount(msg.sender);
        uint256 amount = remainingAmount + claimableAmount;

        // Apply penalty and send half to contract owner
        uint256 penalty = remainingAmount * 30/100;
        esBCKGOVToken.mint(owner, penalty);

        // Update user's vesting
        vestingRatio[msg.sender] = 0;
        time2fullRedemption[msg.sender] = 0;

            BCKGOVToken.mint(msg.sender, claimableAmount);
            BCKGOVToken.mint(msg.sender, remainingAmount - penalty);
        

        emit UnlockedPrematurely(msg.sender, amount - penalty);
    }

    function updateVesting(address user, uint256 amount) internal {
        if (time2fullRedemption[user] > block.timestamp) {
            uint256 total = vestingRatio[user] * (time2fullRedemption[user] - block.timestamp) + amount;
            vestingRatio[user] = total / exitCycle;
            time2fullRedemption[user] = block.timestamp + exitCycle;
        } else {
            vestingRatio[user] = amount / exitCycle;
            time2fullRedemption[user] = block.timestamp + exitCycle;
        }
    }

    function getClaimableAmount(address user) public view returns (uint256) {
        if (time2fullRedemption[user] > lastClaimTime[user]) {
            uint256 amount = block.timestamp > time2fullRedemption[user]
                ? vestingRatio[user] * (time2fullRedemption[user] - lastClaimTime[user])
                : vestingRatio[user] * (block.timestamp - lastClaimTime[user]);
            return amount;
        }
        return 0;
    }

    function getReservedAmountForVesting(address user) public view returns (uint256) {
        if (time2fullRedemption[user] > block.timestamp) {
            return vestingRatio[user] * (time2fullRedemption[user] - block.timestamp);
        }
        return 0;
    }

    
}
