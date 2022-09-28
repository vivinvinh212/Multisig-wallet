// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Oracle {
    IERC20 public WBTC;
    AggregatorV3Interface internal ETH;
    AggregatorV3Interface internal reservesWBTC;

    /**
     * Aggregator: WBTC reserve and WBTC supply
     * WBTC Address: 0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
     * Reserves Address: 0xB622b7D6d9131cF6A1230EBa91E5da58dbea6F59
     */
    constructor() {
        // WBTC = IERC20(0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599);
        ETH = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
        // reservesWBTC = AggregatorV3Interface(
        //     0xB622b7D6d9131cF6A1230EBa91E5da58dbea6F59
        // );
    }

    function getETHLatestPrice() public view returns (int) {
        (
            ,
            /*uint80 roundID*/
            int price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = ETH.latestRoundData();
        return price;
    }

    // //Returns the latest Supply info
    // function getWBTCSupply() public view returns (uint256) {
    //     return WBTC.totalSupply();
    // }

    // //Returns the latest Reserves info
    // function getWBTCLatestReserves() public view returns (int) {
    //     (
    //         ,
    //         /* uint80 roundID */
    //         int answer, /* uint startedAt */ /* uint updatedAt */ /* uint80 answeredInRound */
    //         ,
    //         ,

    //     ) = reservesWBTC.latestRoundData();
    //     return answer;
    // }

    // //Determines if supply has exceeded reserves
    // function checkWBTCReserves() public view returns (bool) {
    //     return getWBTCLatestReserves() >= int(getWBTCSupply());
    // }

    function checkETHPrice(uint lowerThreshold) public view returns (bool) {
        return getETHLatestPrice() < int(lowerThreshold);
    }
}
