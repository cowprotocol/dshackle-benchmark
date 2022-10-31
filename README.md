# Node Benchmark

Benchmarking scripts for testing dshackle or other node endpoints with somewhat realistic CoW backend traffic.

## Running dshackle

### Requirements

1. Download [JDK 13+](https://www.oracle.com/java/technologies/downloads/)
2. Gradle (e.g. `brew install gradle` )

### Clone, build and run source code

1. git clone [https://github.com/emeraldpay/dshackle.git](https://github.com/emeraldpay/dshackle.git) && cd dshackle
2. Create a `dshackle.yaml` file based on our [real config](https://github.com/cowprotocol/infrastructure/blob/main/nodes-docker/dshackle.yaml) (use staging or other testing endpoints to not impair prod traffic)
3. `gradle run`

To test that your node is up, run

```
curl --data '{"jsonrpc":"2.0","method":"web3_clientVersion","id":1}' http://localhost:8545/eth
```

## Running benchmark

1. `yarn`

Benchmarking scenarios are defined in their own .yaml files (e.g. batch_call.yml, single_call.yml). To run one of them

2. `yarn artillery run batch_call.yaml`

### Testing against another node

To benchmark the same script against another endpoint (e.g. vanilla Infura), change `target` to `https://mainnet.infura.io` and `url` to `/v3/<YOUR API KEY>` and compare results
