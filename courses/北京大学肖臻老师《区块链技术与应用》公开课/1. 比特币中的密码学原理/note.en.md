# Notes on Cryptographic Principles in Bitcoin

https://lxblog.com/efficiency/U/FRaKyRZNpHgaZ5BduOEMAfWo5vs85Diy

## Important Properties of Hash Functions

1. **Collision Resistance**

   - Difficult to find two different inputs producing the same hash value
   - Uses: Detecting data tampering, generating message digests

2. **Hiding**

   - Hash calculation process is one-way and irreversible
   - Hash value does not reveal input information
   - Uses: Implementing digital commitments

3. **Puzzle Friendly**
   - The result of a hash function is unpredictable, and finding a hash value that meets specific conditions can only be achieved through numerous attempts, with no shortc

## Account Management in Bitcoin

- Decentralized: Users create their own public and private key pairs
- Public key serves as the account, private key as the password
- Uses asymmetric encryption system

## Signature Mechanism

- Sign transactions with private key, others verify with public key
- Ensures transaction authenticity and non-repudiation

## Important Considerations

- Good source of randomness needed for generating key pairs and signatures
- Usually hash the message first, then sign the hash value

## Important English Terminology

1. Cryptographic hash function
2. Collision resistance
3. Hiding
4. Puzzle friendly
5. Digital commitment
6. Sealed envelope
7. Nonce
8. Block header
9. SHA256 (Secure Hash Algorithm)
10. Asymmetric encryption
11. Public key / Private key
12. Digital signature
13. Brute force attack
14. Good source of randomness

## Additional Knowledge: Pigeonhole Principle (also called Drawer Principle)

- Basic concept: If n items are put into m containers, and n > m, then at least one container will contain more than one item
- Application in hash functions:
  - Input space is usually much larger than output space
  - Collisions (different inputs producing the same hash value) are inevitable
- Importance:
  - Demonstrates the inevitability of hash collisions
  - Explains why completely avoiding collisions is impossible, only making them difficult to artificially produce is achievable
- Significance in cryptography:
  - Helps understand the design goals of hash functions
  - Emphasizes the importance of large input spaces for hash function security

## Bitcoin Mining Process

- Objective: Find a nonce that makes the block header hash value less than or equal to a specific target value
- Characteristics:
  - No shortcuts, only through continuous attempts
  - Can serve as proof of work
  - Mining is difficult, verification is easy
