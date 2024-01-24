import "../../../node_modules/@codat/orchard-ui/dist/index.css";
import "../../index.css";

import { CodatAccounting } from "@codat/accounting";
import { Bill, BillLineItem } from "@codat/accounting/dist/sdk/models/shared";
import {
  BinIcon,
  Button,
  SelectInput,
  SelectInputValue,
  TextInput,
  Typography,
} from "@codat/orchard-ui";
import * as React from "react";
import { Dispatch, useEffect, useState } from "react";

import styles from "./BillLines.module.scss";

const sdk = new CodatAccounting({
  security: {
    authHeader:
      "Basic RDlqNUd4UUR6TTJOMHRQOHlMMjZYUW8xRXpVUmZ4N2lzWWF2WXp6Ug==",
  },
});

const companyId = "80a13985-40c5-4639-a354-b3ee5a592856";

const BillLines: React.FC<{
  billDetails: Bill;
  setBillDetails: Dispatch<React.SetStateAction<Bill>>;
}> = (props: {
  billDetails: Bill;
  setBillDetails: Dispatch<React.SetStateAction<Bill>>;
}) => {
  const [accounts, setAccounts] = useState<SelectInputValue[]>([]);

  useEffect(() => {
    async function fetchAccounts() {
      const accountResult = await sdk.accounts.list({
        companyId: companyId,
        pageSize: 5000,
      });
      const accounts = accountResult.accounts?.results
        ? accountResult.accounts?.results.map((account) => {
            return {
              label: account.name || "",
              value: account.id || "",
            };
          })
        : [];
      setAccounts(accounts);
    }
    fetchAccounts();
  }, []);

  const onAccountChange = (
    selectedItem: SelectInputValue | null | undefined,
    billLine: BillLineItem
  ) => {
    const editData =
      props.billDetails.lineItems?.map((item) =>
        item === billLine
          ? {
              ...item,
              accountRef: selectedItem?.value
                ? { id: selectedItem?.value }
                : undefined,
            }
          : item
      ) || [];

    props.setBillDetails({
      ...props.billDetails,
      lineItems: editData,
    });
  };

  const setBillDetailsFor = (
    event: React.ChangeEvent<HTMLInputElement>,
    billLine: BillLineItem
  ) => {
    const { name, value } = event.target;

    const editData =
      props.billDetails.lineItems?.map((item) =>
        item === billLine
          ? {
              ...item,
              [name]: value,
            }
          : item
      ) || [];

    props.setBillDetails({
      ...props.billDetails,
      lineItems: editData,
    });
  };

  const addLine = () => {
    props.setBillDetails({
      ...props.billDetails,
      lineItems: [
        ...(props.billDetails.lineItems || []),
        {
          lineNumber: (props.billDetails.lineItems?.length || 0) + 1 + "",
          description: "",
          quantity: 0,
          unitAmount: 0,
          taxRateRef: {
            id: "NON",
          },
        },
      ],
    });
  };

  const deleteLine = (billLine: BillLineItem) => {
    props.setBillDetails({
      ...props.billDetails,
      lineItems: [
        ...(props.billDetails.lineItems || []).filter((l) => l !== billLine),
      ],
    });
  };

  return (
    <div>
      <Typography variant="heading_lg" as="h1">
        Line Items
      </Typography>
      {props.billDetails.lineItems &&
        props.billDetails.lineItems.map((billLine, billLineIndex) => (
          <div key={billLine.lineNumber} className={styles.lineItemsTable}>
            <SelectInput
              label="Account"
              showLabel={billLineIndex === 0}
              placeholder="Account"
              handleSelectedItemChange={(item) =>
                onAccountChange(item, billLine)
              }
              items={accounts}
            />
            <TextInput
              label="Description"
              showLabel={billLineIndex === 0}
              placeholder="Description"
              name="description"
              value={billLine.description}
              maxLength={100}
              onChange={(e) => setBillDetailsFor(e, billLine)}
            />
            <TextInput
              label="Quantity"
              showLabel={billLineIndex === 0}
              placeholder="Quantity"
              name="quantity"
              type="number"
              value={billLine.quantity}
              onChange={(e) => setBillDetailsFor(e, billLine)}
            />
            <TextInput
              label="Unit Amount"
              showLabel={billLineIndex === 0}
              placeholder="Unit Amount"
              name="unitAmount"
              type="number"
              value={billLine.unitAmount}
              onChange={(e) => setBillDetailsFor(e, billLine)}
            />
            <TextInput
              label="Subtotal"
              showLabel={billLineIndex === 0}
              placeholder="Subtotal"
              name="subTotal"
              type="number"
              value={billLine.subTotal}
              onChange={(e) => setBillDetailsFor(e, billLine)}
            />
            <Button variant="tertiary" onClick={() => deleteLine(billLine)}>
              <BinIcon />
            </Button>
          </div>
        ))}
      <Button variant="secondary" label="Add Line" onClick={addLine} />
    </div>
  );
};

export default BillLines;
