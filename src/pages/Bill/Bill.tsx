import { CodatAccounting } from "@codat/accounting";
import {
  Bill,
  BillStatus,
  PushOperationStatus,
  Supplier,
} from "@codat/accounting/dist/sdk/models/shared";
import {
  Button,
  Card,
  DataTable,
  DateInput,
  SelectInput,
  SelectInputValue,
  TextInput,
  Typography,
  useToast,
} from "@codat/orchard-ui";
import { BillDetailsError } from "models/billDetailsError";
import * as React from "react";
import { useEffect, useState } from "react";

import styles from "./Supplier.module.scss";

const sdk = new CodatAccounting({
  security: {
    authHeader:
      "Basic RDlqNUd4UUR6TTJOMHRQOHlMMjZYUW8xRXpVUmZ4N2lzWWF2WXp6Ug==",
  },
});

const companyId = "80a13985-40c5-4639-a354-b3ee5a592856";

const Home: React.FC = () => {
  const { addToast } = useToast();

  const [suppliers, setSuppliers] = useState<SelectInputValue[]>([]);

  useEffect(() => {
    async function fetchSuppliers() {
      const supplierResult = await sdk.suppliers.list({ companyId: companyId });
      const suppliers = supplierResult.suppliers?.results
        ? supplierResult.suppliers?.results.map((supplier) => {
            return {
              label: supplier.supplierName || "",
              value: supplier.id || "",
            };
          })
        : [];
      setSuppliers(suppliers);
    }
    fetchSuppliers();
  }, []);

  const [billDetails, setBillDetails] = useState<Bill>({
    issueDate: "",
    status: BillStatus.Open,
    subTotal: 0,
    taxAmount: 0,
    totalAmount: 0,
  });

  const setBillDetailsFor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBillDetails({
      ...billDetails,
      [name]: value,
    });
  };

  const [errorMessages, setErrorMessages] = useState<BillDetailsError>({
    supplierName: "Required",
  });

  const setErrorMessageFor = (errorKey: string, errorValue: string) => {
    setErrorMessages({
      ...errorMessages,
      [errorKey]: errorValue,
    });
  };

  const onDueDateChanged = (value: Date) => {
    setBillDetails({
      ...billDetails,
      dueDate: value.toDateString(),
    });
  };

  const onIssueDateChanged = (value: Date) => {
    setBillDetails({
      ...billDetails,
      issueDate: value.toDateString(),
    });
  };

  const onSupplierChange = (
    selectedItem: SelectInputValue | null | undefined
  ) => {
    setBillDetails({
      ...billDetails,
      supplierRef: selectedItem?.value
        ? { id: selectedItem?.value }
        : undefined,
    });
  };

  async function createBill() {
    const res = await sdk.bills.create({
      bill: billDetails,
      companyId: companyId,
      connectionId: "c9617a8c-e5e4-4554-ab26-0c94e253b134",
    });

    if (
      res.statusCode == 200 &&
      res.createBillResponse?.status == PushOperationStatus.Pending
    ) {
      // handle response
      addToast({
        variant: "success",
        message: `Bill push is pending`,
      });

      window.location.href = `https://app.codat.io/companies/${companyId}/push-history`;
    } else {
      addToast({
        variant: "error",
        message: `Validation error`,
      });
    }
  }

  return (
    <div id="page-home">
      <Card>
        <Typography variant="heading_xxl" as="h1">
          Create Bill
        </Typography>
        <div data-testid={`due-date`}>
          <DateInput
            label="Due Date"
            placeholder={`Due Date`}
            onValueChange={(value) => onDueDateChanged(value)}
            labelClassName={styles.inputLabel}
          />
        </div>
        <div data-testid={`reference`}>
          <TextInput
            label="Reference"
            placeholder={`Reference`}
            name="reference"
            value={billDetails.reference}
            maxLength={21}
            onChange={(e) => setBillDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`currency`}>
          <TextInput
            label="Currency"
            placeholder={`Currency`}
            name="currency"
            value={billDetails.currency}
            maxLength={100}
            onChange={(e) => setBillDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`currency-rate`}>
          <TextInput
            label="Currency Rate"
            placeholder={`Currency Rate`}
            name="currencyRate"
            value={billDetails.currencyRate}
            maxLength={100}
            onChange={(e) => setBillDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`supplier`}>
          <SelectInput
            label="Supplier"
            showLabel
            placeholder="Supplier"
            className={styles.clientType}
            handleSelectedItemChange={onSupplierChange}
            items={suppliers}
          />
        </div>
        <div data-testid={`issue-date`}>
          <DateInput
            label="Issue Date"
            placeholder={`Issue Date`}
            onValueChange={(value) => onIssueDateChanged(value)}
            labelClassName={styles.inputLabel}
          />
        </div>
        <div data-testid={`total-amount`}>
          <TextInput
            label="Total Amount"
            placeholder={`Total Amount`}
            name="totalAmount"
            type="number"
            value={billDetails.totalAmount}
            onChange={(e) => setBillDetailsFor(e)}
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`sub-total`}>
          <TextInput
            label="Sub Total"
            placeholder={`Sub Total`}
            name="subTotal"
            type="number"
            value={billDetails.subTotal}
            onChange={(e) => setBillDetailsFor(e)}
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        {/* <div data-testid={`lines`}>
          <DataTable
            rowsInfo={lineItemsTableRows}
            columnDefs={getLineItemColumnDefinitions()}
            isLayoutAuto
            hasBorder
          />
        </div> */}
        <Button label="Create" onClick={createBill} />
      </Card>
      <Card>
        <pre>{JSON.stringify(billDetails, null, 2)}</pre>
      </Card>
    </div>
  );
};

export default Home;