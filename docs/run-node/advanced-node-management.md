---
sidebar_position: 4
---

# Advanced Node Management

## Running a Node in a Cluster
Follow [this discourse guide](https://quilibrium.discourse.group/t/how-to-run-nodes-in-a-cluster/687) here.
<!-- TODO: Migrate guide to here or another page. -->

### Firewalls when Clustering

#### External Server Ports with dataworker-only processes
If a server with dataworker-only processes is behind a firewall, the control process will need to communicate with the dataworker via gRPC.

There are plans to change this to have a dataworker subscribe to the control process removing the need to open these ports in the future.

##### Firewall considerations
If you are trying to connect to a remote server with a firewall, you will need to open the port to allow the control process to communicate with the dataworker, but the firewall should be configured to accept connections from the control process's server IP address as to avoid exposing the dataworker to the public internet (and somebody else using it).

If you are running the server on a private network and it's not exposed to the public internet, having a firewall is optional.

The default port starting index is 40000 and is incremented for each dataworker that is running on the server.
| Port | Description | Required |
|------|-------------|----------|
| 40XXX | gRPC traffic between the dataworker and the control process | Yes - if server is behind firewall |