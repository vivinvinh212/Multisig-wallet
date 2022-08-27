import React, { useEffect } from "react";
import { Select, List, Spin, Collapse } from "antd";
import axios from "axios";

import { Address } from "..";

const { Panel } = Collapse;

// address={address}
// poolServerUrl={poolServerUrl}
// contractAddress={contractAddress}
function Owners({
  ownerEvents,
  signaturesRequired,
  mainnetProvider,
  blockExplorer,
  address,
  poolServerUrl,
  contractAddress,
}) {
  const owners = new Set();
  const prevOwners = new Set();
  ownerEvents.forEach(ownerEvent => {
    if (ownerEvent.args.added) {
      owners.add(ownerEvent.args.owner);
      prevOwners.delete(ownerEvent.args.owner);
    } else {
      prevOwners.add(ownerEvent.args.owner);
      owners.delete(ownerEvent.args.owner);
    }
  });
  const updateOwners = async owners => {
    let reqData = {
      owners: [...owners],
    };
    const res = await axios.post(poolServerUrl + `updateOwners/${address}/${contractAddress}`, reqData);
    console.log("update owner response", res.data);
  };

  useEffect(() => {
    if (signaturesRequired && owners.size > 0) {
      //  disabled for updating owners at backend as it is automatically updated
      // updateOwners(owners);
    }
  }, [owners.size, signaturesRequired]);

  return (
    <div>
      <h2 style={{ marginTop: 32 }}>
        Signatures Required:{" "}
        {signaturesRequired && ownerEvents.length !== 0 ? signaturesRequired.toNumber() : <Spin></Spin>}
      </h2>
      <List
        header={<h2>Owners</h2>}
        style={{ maxWidth: 400, margin: "auto", marginTop: 32 }}
        bordered
        dataSource={[...owners]}
        renderItem={ownerAddress => {
          return (
            <List.Item key={"owner_" + ownerAddress}>
              <Address
                address={ownerAddress}
                ensProvider={mainnetProvider}
                blockExplorer={blockExplorer}
                fontSize={20}
              />
            </List.Item>
          );
        }}
      />

      <Collapse
        collapsible={prevOwners.size == 0 ? "disabled" : ""}
        style={{ maxWidth: 400, margin: "auto", marginTop: 10 }}
      >
        <Panel header="Previous Owners" key="1">
          <List
            dataSource={[...prevOwners]}
            renderItem={prevOwnerAddress => {
              return (
                <List.Item key={"owner_" + prevOwnerAddress}>
                  <Address
                    address={prevOwnerAddress}
                    ensProvider={mainnetProvider}
                    blockExplorer={blockExplorer}
                    fontSize={20}
                  />
                </List.Item>
              );
            }}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
export default Owners;
