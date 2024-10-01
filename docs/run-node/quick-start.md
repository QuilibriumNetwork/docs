---
sidebar_position: 1
---

# Quick Start

## System Requirements

Operating system: ARM or x86 Linux or ARM MacOS.

Minimum hardware requirements:
- At least 4 logical cores 
- 8 GB RAM
- 250 GB SSD storage
- 400 Mbit/s symmetric bandwidth 

Port 8336 must be open for UDP traffic in order to join the network.

## Autorun

The release autorun script will automatically download the latest release binary, run the node and periodically check for new releases. You can run the script as follows:

```bash
git clone --depth 1 --branch release https://github.com/QuilibriumNetwork/ceremonyclient.git
cd ceremonyclient/node
# Inspect the contents of the `release_autorun.sh` script before executing it
./release_autorun.sh
```

This script is intended to help get started quickly, but for robust deployments it is recommended to use some service orchestration solution (e.g. `systemd` on Linux).

## Running via service file (Linux)

Create the service file and open it:

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

## Backups

The node's configuration, private keys and database must be backed up in order to claim rewards. 

If you followed the instructions in the [Autorun](#autorun) section, this data will be stored in the `ceremonclient/node/.config` directory. It's recommended to back up this entire directory. 

The `./config/keys.yml` and `./config/config.yml` files contain private keys and should be encrypted in backups. If you back up the entire directory, it's easiest to encrypt the entire backup.



