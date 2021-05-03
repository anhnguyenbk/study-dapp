// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Read/write candidate
    string public candidate;

    // Constructor
    function Election () public {
        candidate = "Candidate 1";
    }
}