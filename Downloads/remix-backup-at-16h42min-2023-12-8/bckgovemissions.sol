pragma solidity ^0.8.12;

import "./ds-token.sol";
import "./Safemathuint2.sol";
import "./SafemathInt2.sol";
import "./interface.sol";

interface eUSDtoBCKInterface {
  function bckmintedshare(address owner) external view returns (uint256);
  function share(address owner) external view returns (uint256);
  function totaldeposits() external view returns (uint256);
}

contract BCKSavingsAccount {
  using SafeMathUint for uint256;
  using SafeMathInt for int256;
   IStablecointoBCK public stablecointoBCK; // Your StablecointoBCK contract
   IOracleMain public oracleMain; // Your OracleMain contract to get BCKGov price

  DSToken public bck;
  DSToken public usdc;
  address public owner;

  uint256 constant internal magnitude = 2**128;
  uint256 public magnifiedInterestPerShare2;
  uint256 public currentdistrbutedUSDC;
  mapping(address => int256) public magnifiedInterestCorrections2;
  mapping(address => uint256) public withdrawnInterest;
  uint public minimumstakeshares;
  mapping(address => uint256) public balances;
  uint256 public totalDeposits;
  event USDCDistributed(address indexed from, uint256 value);
  eUSDtoBCKInterface public eUSDtoBCK; 


  constructor(address _bck, address _usdc) public {
    bck = DSToken(_bck);
    usdc = DSToken(_usdc);
    owner = msg.sender;
  }

    function setStablecointoBCK(address _stablecointoBCK) external onlyOwner {
        stablecointoBCK = IStablecointoBCK(_stablecointoBCK);
    }

    function setOracleMain(address _oracleMain) external onlyOwner {
        oracleMain = IOracleMain(_oracleMain);
    }

     function setminimumstake(uint _minimumstakeshares) public onlyOwner {
        minimumstakeshares = _minimumstakeshares;
    }

    function seteUSDtoBCK(address _eUSDtoBCK) external onlyOwner {
        eUSDtoBCK = eUSDtoBCKInterface(_eUSDtoBCK);
    }


  modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

  modifier onlyeUSDtoBCK() {
        require(msg.sender == address(eUSDtoBCK), "Not eUSDtoBCK");
        _;
    }


function updateInterestCorrectionssub(address _user, uint256 _amount) public onlyeUSDtoBCK {
        // Access control checks (like onlyOwner or a specific modifier)
        int256 correction = magnifiedInterestPerShare2.mul(_amount).toInt256Safe();
        magnifiedInterestCorrections2[_user] = magnifiedInterestCorrections2[_user].sub(correction);
    }

function updateInterestCorrectionsadd(address _user, uint256 _amount) public onlyeUSDtoBCK {
        // Access control checks (like onlyOwner or a specific modifier)
        int256 correction = magnifiedInterestPerShare2.mul(_amount).toInt256Safe();
        magnifiedInterestCorrections2[_user] = magnifiedInterestCorrections2[_user].add(correction);
  }

function depositBCKGov(uint256 _amount) public {
    require(eUSDtoBCK.share(msg.sender) > 0, "You need to mint BCK first before submitting for BCKGov emissions");
    require(bck.transferFrom(msg.sender, address(this), _amount), "BCK transfer failed");
    require(bck.burn(address(this)_amount));

    // Before updating the balances and totalDeposits, adjust the magnifiedInterestCorrections
    // of the depositor based on their increased stake.

    balances[msg.sender] = balances[msg.sender].add(_amount);
    totalDeposits = totalDeposits.add(_amount);
}


function withdrawBCKGov(uint256 _amount) public {
    require(balances[msg.sender] >= _amount, "Insufficient BCK balance");

    // Before updating the balances and totalDeposits, adjust the magnifiedInterestCorrections
    // of the withdrawer based on their decreased stake.

    balances[msg.sender] = balances[msg.sender].sub(_amount);
    totalDeposits = totalDeposits.sub(_amount);
    require(usdc.mint(msg.sender, _amount), "BCK transfer failed");
}

function distributeBCKGOV(uint256 _amount) public {
    // Check if the owner has enough USDC
    uint256 ownerBCKGOVBalance = usdc.balanceOf(msg.sender);
    require(ownerBCKGOVBalance >= _amount, "Owner has insufficient USDC balance");
    uint _totaldeposits =eUSDtoBCK.totaldeposits(); 
    // Calculate the magnified interest per share
    if (_totaldeposits > 0) {
        magnifiedInterestPerShare2 = magnifiedInterestPerShare2.add(
            (_amount).mul(magnitude).div(_totaldeposits)
        );
    }
    currentdistrbutedUSDC = currentdistrbutedUSDC + _amount;
    // Emit an event to inform external observers about the distribution
    emit USDCDistributed(msg.sender, _amount);
    // Transfer the USDC from the owner to the contract
    require(usdc.transferFrom(msg.sender, address(this), _amount), "USDC transfer failed");
}


    function meetsStakingRequirement(address _user) public view returns (bool) {
        uint256 shares = eUSDtoBCK.bckmintedshare(_user);
        if(shares < minimumstakeshares) {
          return false;
        }
        uint256 requiredBCK = shares.mul(25).div(1000); // Assuming 2.5% in BCK is the requirement
        uint256 userBCKBalance = balances[msg.sender];
        uint256 priceBCKGovInBCK = oracleMain.getBCKGovPriceInUSD();
        return userBCKBalance.mul(priceBCKGovInBCK) >= requiredBCK;
    }

    function buyOutNonMaintainedShares(address _user) public {
        require(!meetsStakingRequirement(_user), "User meets staking requirement");

        uint256 rewardToBuy = withdrawableInterestOf(_user);
        uint256 costInBCKGOV = rewardToBuy / 2; // Cost is half the reward amount in BCKGOV

        // Transfer cost from buyer to contract (for burning)
        require(bck.transferFrom(msg.sender, address(this), costInBCKGOV), "BCK transfer failed");

        // Burn the BCKGOV cost
        uint BCKGovtoprotocol = costInBCKGOV.div(5);
        uint BCKGovBurnAmount = costInBCKGOV - BCKGovtoprotocol;
        bck.burn(address(this), BCKGovBurnAmount);
        bck.transferFrom(address(this), address(owner), BCKGovtoprotocol);

        // Transfer the reward to the buyer
        require(usdc.transfer(msg.sender, rewardToBuy), "USDC transfer failed");

        // Update the withdrawn interest to reflect the buy out
        withdrawnInterest[_user] = withdrawnInterest[_user].add(rewardToBuy);
    }

    function getUserRewardInfo(address _user) public view returns (bool canWithdraw, uint256 rewardAmount, uint256 costToBuyInBCKGOV) {
        bool stakingRequirementMet = meetsStakingRequirement(_user);
        uint256 reward = withdrawableInterestOf(_user);
        uint256 costToBuyInBCKGOV = reward.div(2); // Cost in BCKGov
        return (stakingRequirementMet, reward, stakingRequirementMet ? 0 : costToBuyInBCKGOV);
    }

  function withdrawInterest() public {
    
    uint256 _withdrawableInterest = withdrawableInterestOf(msg.sender);
    
    if (_withdrawableInterest > 0) {
      withdrawnInterest[msg.sender] = withdrawnInterest[msg.sender].add(_withdrawableInterest);
      currentdistrbutedUSDC = currentdistrbutedUSDC - (_withdrawableInterest);
      require(usdc.transfer(msg.sender, _withdrawableInterest), "USDC transfer failed");
      
    }
  }

  function withdrawableInterestOf(address _owner) public view returns(uint256) {
        return accumulativeInterestOf(_owner).sub(withdrawnInterest[_owner]);
    }


  function accumulativeInterestOf(address _owner) public view returns(uint256) {
    return magnifiedInterestPerShare2.mul(eUSDtoBCK.share(_owner)).toInt256Safe()
      .add(magnifiedInterestCorrections2[_owner]).toUint256Safe() / magnitude;
  }
}