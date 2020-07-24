pragma solidity >=0.5.0<= 0.7.0;
contract Counter {
  //it keeps a count to demonstrate stage changes
  uint private count;
  address private _owner;

  constructor(uint _count) public {
    count = _count;
    _owner = msg.sender;
  }

  function owner() public view returns (address) {
    return _owner;
  }

  // getter
  function getCounter() public view returns (uint) {
    return count;
  }

  //and it can add to a count
  function increaseCounter(uint256 amount) public {
    count = count + amount;
  }

  //We'll upgrade the contract with this function after deploying it
  //Function to decrease the counter
  function decreaseCounter(uint256 amount) public returns (bool) {
    require(count > amount, "Cannot be lower than 0");
    count = count - amount;
    return true;
  }

}
