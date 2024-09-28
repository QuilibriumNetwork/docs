---
sidebar_position: 3
---

# Deploying to the Network

After you have built and tested your application, you can deploy it to the network. Deployment requires publishing the [RDF](../learn/oblivious-hypergraph/rdf-storage.md) schema (if applicable), compiling the QCL code, and paying a fee for the deployment. The qclient CLI tool will do this all in one step for you.

## Deploying

To deploy an application, you will need to submit a deployment transaction via qclient:

```
qclient deploy application.qcl
```

It will compile the application and deploy it to the network on your behalf, and submit the corresponding RDF schema tagged on the structs to the schema repository for relational data on the hypergraph.

If you would like to estimate the cost associated with a deployment given the dynamic [fee market](https://paragraph.xyz/@quilibrium.com/dynamic-fee-markets), append `--dry-run` to your command. If the default key to your account does not have requisite funds to perform the deployment, the command will fail.

