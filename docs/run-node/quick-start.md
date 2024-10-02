---
sidebar_position: 1
---

# Quick Start

## System Requirements

### Supported Operating Systems

| Operating System | Architecture |
|------------------|--------------|
| Linux            | ARM, x86      |
| MacOS            | ARM           |
| Windows          | Not Supported |

### Minimum Hardware Requirements

| Component | Minimum Requirements |
|-----------|----------------------|
| CPU       | At least 4 logical cores |
| RAM       | 8 GB                 |
| SSD       | 250 GB               |

A Quilibrium node will run on anything that has at least 4 logical cores and 8GB of RAM.  

It should be noted that you will need sufficient RAM and storage to avoid running out of memory and disk space while running the node and should scale your hardware evenly when you upgrade components or cores used. For example: 
 - if you have 4 cores, you should have at least 8GB of RAM
 - if you have 8 cores, you should have at least 16GB of RAM, etc.

The general rule of thumb is: 1CPU to 2GB Ram. 

Storage may vary depend on if the node will be used to store data or if it will be a compute-only node. Many people currently opt for 1TB as a default, but this is strictly required.

A logical core is also known as a hyperthread (or individual core if not hyperthreaded) or vCPU on virtual machines.

GPUs are not currently used in any parts of the node process.

#### Hardware Selection
The minimum hardware requirements above are just a bare-minimum.  Any node that uses just the minimum will find that it will very slow and rewards minimal. Using minimums may be useful for setting up a local testnet for application and/or protocol development, testing, or for experimentation purposes. 

You can increase your performance by using servers or VDS plans with more cores (and the sufficient amount of RAM for each core), as well as finding hardware combinations that perform better at high-performance CPU workloads.

Many people use VDS's or rent servers from service providers.  However, using VPS services to run a node is not recommnded at all.

Higher clock-speed CPUs are generally faster for certain workloads, and more modern CPUs may have additional features that can improve performance.

More cores may not always produce better results, especially when considering older hardware, but generally when comparing two servers with similar architecture and clock-speed, you will get better overall performance with more cores.

For example, when looking at comparable price point and ages of CPUs between Intel and AMD, it has been found that AMD CPUs have historically provided better performance for Quilibrium nodes.

### Network Requirements
The bandwidth requirements are case-dependent.

Higher bandwidth is not necessarily better, as the amount needed is more around supply/demand and how much storage the shard is using that the node is proving over.

In the case that a shard has a high amount of storage, a node would need more bandwidth to send/receive the data on demand.

#### Default Ports to Open on Firewall
| Port | Description | Required |
|------|-------------|----------|
| 22*   | Allows for personal SSH traffic in the server | No, but recommended if needing to connect to the server remotely |
| 8336 | UDP/TCP traffic for communication with the rest of the network | Yes |
| 8337* | Allows for direct gRPC communication with the node, will allow external applications to connect to the node | No |
| 8338* | Allows for REST API communication with the node, will allow external applications to connect to the node | No |

*Note: this is not used by the node application, so only open if needed for personal requirements.

**Note: These ports are not required to be open to the public. If the `listenGrpcMultiaddr` and `listenRESTMultiaddr` are not set, then the node application will not be listening on these ports anyways. 

## Autorun

The release autorun script will automatically download the latest release binary, run the node and periodically check for new releases. You can run the script as follows:

```bash
git clone --depth 1 --branch release https://github.com/QuilibriumNetwork/ceremonyclient.git
cd ceremonyclient/node
# Inspect the contents of the `release_autorun.sh` script before executing it
./release_autorun.sh
```

This script is intended to help get started quickly, but for robust deployments it is recommended to use some service orchestration solution (e.g. `systemd` on Linux).

## Backups

The node's configuration, private keys and database must be backed up in order to claim rewards. 

If you followed the instructions in the [Autorun](#autorun) section, this data will be stored in the `ceremonyclient/node/.config` directory. It's recommended to back up this entire directory. 

The `.config/keys.yml` and `.config/config.yml` files contain private keys and should be encrypted in backups. If you back up the entire directory, it's easiest to encrypt the entire backup.



