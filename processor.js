function single_call(req, context, events, next) {
  req.json = randomCall(1);
  events.emit("counter", "rpc.requests", 1);
  return next();
}

const BATCH_SIZE = 50;

function batch_call(req, context, events, next) {
  req.json = [...Array(BATCH_SIZE)].map((_, i) => randomCall(i));
  events.emit("counter", "rpc.requests", BATCH_SIZE);
  return next();
}

const genRanHex = (size) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0"))
    .join("");

const randomCall = (id) => {
  return {
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
      {
        "data": "0x70a08231000000000000000000000000" + genRanHex(20),
        "to": "0xDEf1CA1fb7FBcDC777520aa7f396b4E015F497aB",
      },
      "latest",
    ],
    "id": id,
  };
};

function check_response(_req, res, _context, events, next) {
  try {
    const json = JSON.parse(res.body);
    const responses = Array.isArray(json) ? json : [json];

    const errors = responses.filter((r) => r.error).length;
    const success = responses.length - errors;

    responses.forEach(() => events.emit("rate", "rpc.request_rate"));
    events.emit("counter", "rpc.responses_success", success);
    events.emit("counter", "rpc.responses_error", errors);

    return next();
  } catch (err) {
    console.log(`${err}: ${res.body}`);
    events.emit("counter", "rpc.invalid_json", 1);
    return next();
  }
}

module.exports = {
  single_call,
  batch_call,
  check_response,
};
