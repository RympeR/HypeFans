var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


const CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const ACCOUNT = myArgs[0];

const token_amount = myArgs[1];
async function main() {
    const {
        abi
    } = await tronWeb.trx.getContract(CONTRACT);
    console.log('got')
    const contract = tronWeb.contract(abi.entrys, CONTRACT);

    const balance = await contract.methods.balanceOf(ACCOUNT).call();
    console.log("balance:", balance.toString());
    const contractAddressHex = tronWeb.address.toHex(CONTRACT);
    const contractInstance = await tronWeb.contract().at(contractAddressHex);
    const decimals = await contractInstance.decimals().call();
    const amount = token_amount * Math.pow(10, decimals);
    console.log(amount);
    const resp = await contract.methods.transfer(ACCOUNT, amount).send();
    console.log("transfer:", resp);
}


main().then(() => {
        console.log("ok");
    })
    .catch((err) => {
        console.log("error:", err);
    });