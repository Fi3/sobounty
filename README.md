# POC SOBOUNTY

One use case of lightning network(LN) is pay for get help. StackOverflow do a very good job in sharing knowledge startingn from users questions. The incentive that a user have in answer a question are just reputetion. We think that the give to the users an economical incentive could incredibly boost the amount of shared knowledge. We think that in some cases an user want to pay to get an answer to have it faster.

Payment in BTC rapresent the best option for a POC cause it avoid all the burocracy involved FIAT payment.
LN is the right choice cause the small amount of the bounties.

The POC consist in realizing a very simple UI in React (show bounties, post bounty), and a DB where save the bounties an API to interact with the DB, and a payment engine (LN with some scripts to manage the playments)

Who post a bounty has x days to choose an answer if no answer is choose then the most voted will be payed, if no one answer will be returned. 

NOT TO IMPLEMENT IN POC:
who 

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


