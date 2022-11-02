function single_call(context, events, done) {
  context.vars['query'] = randomCall(1)
  return done()
}

function batch_call(context, events, done) {
  context.vars['query'] = [...Array(50)].map((_, i) => randomCall(i))
  return done()
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const randomCall = id => {
  return {
    "jsonrpc":"2.0",
    "method":"eth_call",
    "params":[
      {
        "data":"0x70a08231000000000000000000000000" + genRanHex(40),
        "to":"0x4b13006980acb09645131b91d259eaa111eaf5ba"
      },"latest"],
    "id": id
  }
}

module.exports = {
  single_call,
  batch_call,
}
