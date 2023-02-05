//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.9.0;

contract Drive {
    //Providing access to view the picture
    //keshav->address provides access to the x user and access is used to define whether access is provided or not
    struct Access {
        address user;
        bool access;
    }
    //We Keep Track which Address has Which Type of Image Urls's
    mapping(address => string[]) value;

    //          Address1 Address2 Address3
    // Address1  true    false    true
    // Address2  true    true     true
    // Address3  false   false     true
    mapping(address => mapping(address => bool)) ownership; //2D array

    //One Address Provides Access for Multiple Address
    //We keep track of which adress provided access to what all Addresses
    mapping(address => Access[]) AccessList;
    //Blockchain Doemt Keep Track of Previous so Incase if we need The Previous States Data We Can Get it Through here
    mapping(address => mapping(address => bool)) PreviousData;

    //If any User Want to add new image he/she can add it
    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    //To allow access rights
    function allow(address _user) external {
        ownership[msg.sender][_user] = true;
        if (PreviousData[msg.sender][_user]) {
            for (uint i = 0; i < AccessList[msg.sender].length; i++) {
                if (AccessList[msg.sender][i].user == _user) {
                    AccessList[msg.sender][i].access = true;
                }
            }
        } else {
            AccessList[msg.sender].push(Access(_user, true));
            PreviousData[msg.sender][_user] = true;
        }
    }

    //To Disallow The Access Rights  we have to  do the access  to be false of acesslist
    function disallow(address _user) external {
        ownership[msg.sender][_user] = false;
        for (uint i = 0; i < AccessList[msg.sender].length; i++) {
            if (AccessList[msg.sender][i].user == _user) {
                AccessList[msg.sender][i].access = false;
            }
        }
    }

    //To Display the Images of others user only if they Have Access Right
    function display(address _user) external view returns (string[] memory) {
        require(_user==msg.sender || ownership[_user][msg.sender], "You Dont Have Access"); //Require that Requester has access
        return value[_user];
    }

    //Share AccessList
    function ShareList() external view returns (Access[] memory) {
        return AccessList[msg.sender];
    }
}


//Contract Address-> 0xC454f287F688BD0Adf068e58e9cEEDc63a39A85F