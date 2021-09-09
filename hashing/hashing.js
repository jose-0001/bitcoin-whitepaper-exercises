// @ts-check
"use strict";

var crypto = require("crypto");

/**
 * @typedef {object} Block
 * @property {number} Block.index
 * @property {?string} Block.prevHash
 * @property {string} Block.data
 * @property {number} Block.timestamp
 * @property {string} Block.hash
 *
 * @typedef {object} Blockchain
 * @property {Block[]} Blockchain.blocks
 */

// The Power of a Smile
// by Tupac Shakur
/** @type string[] */
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

/** @type Blockchain */
var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
	// setting prevHash to null since this is the genesis block
	prevHash: null
});

/**
 * create hash from a block
 * @param {Block} bl
 * @returns hash
 */
function blockHash(bl) {
	return crypto
		.createHash("sha256")
		.update(`${bl.index} ${bl.prevHash} ${bl.data} ${bl.timestamp}`)
		.digest("hex");
}

/**
 * create the block and push it to the blocks array for the blockchain
 * @param {string} data
 */
function createBlock(data) {
	const block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data,
		timestamp: Date.now(),
		hash: ''
	};
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
}

poem.forEach(createBlock);

// we should have a total of 9 blocks
// including the genesis block
// console.log(Blockchain.blocks)

/**
 * check that the current block is valid
 * @param {Block} block
 * @returns {boolean}
 */
function verifyBlock(block) {
	// index must be an integer >=0
	if (block.index < 0) return false;
	// for the genesis block only
	if (block.index === 0) {
		// the hash must be '000000'
		if (block.hash !== '000000') return false;
	} else {
		// data must be non-empty
		if (!block.data) return false;
		// prevHash must be non-empty
		if (!block.prevHash) return false;
		// the hash must match what recomputing the hash with blockHash(..) produces
		if (block.hash !== blockHash(block)) return false;
	}

	return true;
}

/**
 * check that the whole blockchain is valid
 * @param {Blockchain} blockChain
 * @returns {boolean}
 */
function verifyChain(blockChain) {
	let verified = false;
	for (const block of blockChain.blocks) {
		verified = verifyBlock(block);
	}
	return verified;
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);
