import json
import logging
from django.core.cache import cache
from eth_account.messages import encode_defunct
from web3 import Web3, HTTPProvider
from web3.middleware import geth_poa_middleware
# from app.dynamic_preferences_registry import EthereumNodeURI
from core.settings import BASE_DIR

with open(BASE_DIR / 'core' / 'utils' / 'bep20.json') as f:
    bep20_abi = json.load(f)


class Ethereum:
    @property
    def bsc_web3(self):
        web3 = Web3(HTTPProvider('https://bsc-dataseed.binance.org/'))
        web3.middleware_onion.inject(geth_poa_middleware, layer=0)
        return web3

    def bep20_contract(self, address: str):
        return self.bsc_web3.eth.contract(address=address, abi=bep20_abi)


ethereum = Ethereum()
