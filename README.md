# POC SOBOUNTY

1. vsui -> create very simple ui:
  * not logged: search for active bounties: the list of all active bounties is saved on a server, the ui will ask for the list and then will download questions with the [stack exchange(SE) api](https://api.stackexchange.com/docs)
	*logged: the login is done vie SE, when you are logged you can:
	  * post a bvounty:
		  * you will paste the link at the SE question
		  * you will found the bounty via LN
		* solve a bounty:
		  * you will answer the SE question, the answer have to contain `pls pay to:[addr]`
		* accept a solution:
		  * you will accept the solution in SE
2. server:
  * db with all the founded question:
	  * link, valid SE link
		* status, SOLVED UNSOLVED
		* bounty, number
	* API:
	  * add bounty
	* payment engine: for the POC an web-wallet will be enough.


