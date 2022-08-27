import React from "react";
import { Modal, Button } from "antd";
import { Address, Balance } from "..";
import { ethers } from "ethers";

export default function TransactionDetailsModal({
  visible,
  handleOk,
  handleCancel,
  mainnetProvider,
  price,
  txnInfo = null,
  showFooter = false,
  to = false,
  value = false,
  type = false,
}) {
  return (
    <Modal
      // title="Transaction Details"
      title={type ? "Wallect Connect Transaction Details" : "Transaction Details"}
      visible={visible}
      onCancel={handleCancel}
      destroyOnClose
      onOk={handleOk}
      closable
      maskClosable
      footer={
        showFooter
          ? [
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="ok" type="primary" onClick={handleOk}>
                Propose
              </Button>,
            ]
          : null
      }
    >
      {/* wallet connect tx details  */}
      {to && value && (
        <>
          <div>
            <div className="m-2">
              to: <span className="bg-gray-300 p-1 rounded-md">{to}</span>{" "}
            </div>
            <div className="m-2">
              value: <span className="bg-gray-300 p-1 rounded-md">{value}</span>{" "}
            </div>
            <div className="m-2">{!txnInfo && <span className="text-blue-500">can't parse tx data !</span>}</div>
          </div>
        </>
      )}

      {txnInfo && (
        <div>
          <p>
            <b>Event Name :</b> {txnInfo.functionFragment.name}
          </p>
          <p>
            <b>Function Signature :</b> {txnInfo.signature}
          </p>
          <h4>Arguments :&nbsp;</h4>
          {txnInfo.functionFragment.inputs.map((element, index) => {
            if (element.type === "address") {
              return (
                <div
                  key={element.name}
                  style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "left" }}
                >
                  <b>{element.name} :&nbsp;</b>
                  <Address fontSize={16} address={txnInfo.args[index]} ensProvider={mainnetProvider} />
                </div>
              );
            } else if (element.type === "uint256") {
              return (
                <p key={element.name}>
                  {element.name === "value" ? (
                    <>
                      <b>{element.name} : </b>{" "}
                      <Balance fontSize={16} balance={txnInfo.args[index]} dollarMultiplier={price} />{" "}
                    </>
                  ) : (
                    <>
                      <b>{element.name} : </b> {txnInfo.args[index] && txnInfo.args[index].toNumber()}
                    </>
                  )}
                </p>
              );
            } else {
              return (
                <p key={element.name}>
                  {
                    <>
                      <b>{element.name} : </b> {txnInfo.args[index]}
                    </>
                  }
                </p>
              );
            }
          })}
          <p>
            <b>SigHash : &nbsp;</b>
            {txnInfo.sighash}
          </p>
        </div>
      )}
    </Modal>
  );
}
