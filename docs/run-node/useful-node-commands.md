# Useful node commands (Linux)

## General Linux commands
*Change the NODE_DIR variable according to your needs*

### Get your peerID

```sh
NODE_DIR="$HOME/ceremonyclient/node"
NODE_BINARY=$(find "$NODE_DIR" -type f -executable -name "node-*" ! -name "*.dgst*" ! -name "*.sig*" | sort -V | tail -n 1 | xargs basename)
cd "$HOME/ceremonyclient/node" && ./$NODE_BINARY -peer-id
```

### See node info
PeerID - Version - Max frame - Balance \
_This can give an error on nodes that are not fully sync, but you will still see your peerID_

```bash
NODE_DIR="$HOME/ceremonyclient/node"
NODE_BINARY=$(find "$NODE_DIR" -type f -executable -name "node-*" ! -name "*.dgst*" ! -name "*.sig*" | sort -V | tail -n 1 | xargs basename)
cd "$HOME/ceremonyclient/node" && ./$NODE_BINARY -node-info
```

### Check balance

```bash
NODE_DIR="$HOME/ceremonyclient/node"
NODE_BINARY=$(find "$NODE_DIR" -type f -executable -name "node-*" ! -name "*.dgst*" ! -name "*.sig*" | sort -V | tail -n 1 | xargs basename)
cd "$HOME/ceremonyclient/node" && ./$NODE_BINARY -balance
```

## Service commands
*The below commands will work when running a node via service file*

Start service

```bash
service ceremonyclient start
```

Stop service

```bash
service ceremonyclient stop
```

Restart service

```bash
service ceremonyclient restart
```

Node log

```bash
sudo journalctl -u ceremonyclient.service -f --no-hostname -o cat
```

Node version

```bash
journalctl -u ceremonyclient -r --no-hostname  -n 1 -g "Quilibrium Node" -o cat
```

Service status

```bash
service ceremonyclient status
```
