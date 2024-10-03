


# Linux Configuration
## Running the node via service file

To run your node via `systemd`, create the service file and open it:

```bash
nano /lib/systemd/system/ceremonyclient.service
```

Paste the below code (If your working directory is different from "root" than edit the code accordingly):

```bash
[Unit]
Description=Ceremony Client Go App Service

[Service]
Type=simple
Restart=always
RestartSec=5s
WorkingDirectory=/root/ceremonyclient/node
ExecStart=/root/ceremonyclient/node/release_autorun.sh

[Install]
WantedBy=multi-user.target

```

Save the file, exit and enable the service:

```bash
sudo systemctl daemon-reload && sudo systemctl enable ceremonyclient
```

Start the node

```bash
service ceremonyclient start
```

Now the node will start automaytically after each reboot. The service uses the release_autorun.sh script, so it will also periodically check for new releases.

If you prefer to run the node directly via binary, you can simply change the *ExecStart* line of the service file and use the correct binary file name there.

## Useful node commands

### Service commands
*The below commands will work when running a node via service file*

**Start service**
```bash
service ceremonyclient start
```

**Stop service**
```bash
service ceremonyclient stop
```

**Restart service**
```bash
service ceremonyclient restart
```

**Node log**
```bash
sudo journalctl -u ceremonyclient.service -f --no-hostname -o cat
```

**Node version**
```bash
journalctl -u ceremonyclient -r --no-hostname  -n 1 -g "Quilibrium Node" -o cat
```

**Service status**
```bash
service ceremonyclient status
```

### General Linux commands
*Change the NODE_DIR variable according to your needs*

**Get your peerID**
```sh
NODE_DIR="$HOME/ceremonyclient/node"
NODE_BINARY=$(find "$NODE_DIR" -type f -executable -name "node-*" ! -name "*.dgst*" ! -name "*.sig*" | sort -V | tail -n 1 | xargs basename)
cd "$HOME/ceremonyclient/node" && ./$NODE_BINARY -peer-id
```
\
**See node info**\
PeerID - Version - Max frame - Balance \
_This can give an error on nodes that are not fully sync, but you will still see your peerID_

```bash
NODE_DIR="$HOME/ceremonyclient/node"
NODE_BINARY=$(find "$NODE_DIR" -type f -executable -name "node-*" ! -name "*.dgst*" ! -name "*.sig*" | sort -V | tail -n 1 | xargs basename)
cd "$HOME/ceremonyclient/node" && ./$NODE_BINARY -node-info
```
\
**Check balance**
```bash
NODE_DIR="$HOME/ceremonyclient/node"
NODE_BINARY=$(find "$NODE_DIR" -type f -executable -name "node-*" ! -name "*.dgst*" ! -name "*.sig*" | sort -V | tail -n 1 | xargs basename)
cd "$HOME/ceremonyclient/node" && ./$NODE_BINARY -balance
```
