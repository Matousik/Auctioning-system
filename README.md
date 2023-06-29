## Auctioning system

This is a Proof of Concept of online auctioning system utilizing Next.js for client and server side rendering and MongoDB. The auctions are conducted in a way that there can be more auctioned items bound to a unique auction event that has defined time of validity.

# Motivation

This system can serve as a fully autonomous replacement for all sorts of auctions conducted online, those auctions can contain more auctioned items at once. This is fairly typical for auctions conducted on Facebook or any other internet medium or application that may provide those features but is not really optimized for it.

Thus, a features offering possibility to export auction data easily with sending appropriate messages to winners will be implemented. The app will have integrted Facebook login. Another possible enhnancements include OpenAI API integration for export messages generation or ZK Proofs for anonymous auctioning that securely anonymizes all auctioners and their bids. User with appropriate rights will then be able to securely verify the outcome of the auction.
