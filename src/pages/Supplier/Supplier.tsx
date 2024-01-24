import { CodatAccounting } from "@codat/accounting";
import {
  PushOperationStatus,
  Supplier,
  SupplierStatus,
} from "@codat/accounting/dist/sdk/models/shared";
import {
  Button,
  Card,
  CodeBlock,
  TextInput,
  Typography,
  useToast,
} from "@codat/orchard-ui";
import { SupplierDetailsError } from "models/supplierDetailsError";
import * as React from "react";
import { useState } from "react";

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

  const [supplierDetails, setSupplierDetails] = useState<Supplier>({
    status: SupplierStatus.Active,
  });

  const setSupplierDetailsFor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setSupplierDetails({
      ...supplierDetails,
      [name]: value,
    });
  };

  const [errorMessages, setErrorMessages] = useState<SupplierDetailsError>({
    supplierName: "Required",
  });

  const setErrorMessageFor = (errorKey: string, errorValue: string) => {
    setErrorMessages({
      ...errorMessages,
      [errorKey]: errorValue,
    });
  };

  async function createSupplier() {
    const res = await sdk.suppliers.create({
      supplier: supplierDetails,
      companyId: companyId,
      connectionId: "c9617a8c-e5e4-4554-ab26-0c94e253b134",
    });

    if (
      res.statusCode == 200 &&
      res.createSupplierResponse?.status == PushOperationStatus.Pending
    ) {
      // handle response
      addToast({
        variant: "success",
        message: `Supplier push is pending`,
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
          Create Supplier
        </Typography>
        <div data-testid={`supplier-name`}>
          <TextInput
            label="Supplier Name"
            placeholder={`Supplier Name`}
            name="supplierName"
            value={supplierDetails.supplierName}
            maxLength={100}
            error={!!errorMessages.supplierName.length}
            errorMessage={errorMessages.supplierName}
            onChange={(e) => {
              const inputValue = e.target.value;

              if (
                /^[\d\w \-'&@.,?!]+$/.test(inputValue) ||
                !inputValue.length
              ) {
                if (!inputValue.length) {
                  setErrorMessageFor("supplierName", "*Required");
                } else {
                  setErrorMessageFor("supplierName", "");
                }
              } else {
                setErrorMessageFor(
                  "supplierName",
                  "No special characters are allowed"
                );
              }
              setSupplierDetailsFor(e);
            }}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`contact-name`}>
          <TextInput
            label="Contact Name"
            placeholder={`Contact Name`}
            name="contactName"
            value={supplierDetails.contactName}
            maxLength={100}
            onChange={(e) => setSupplierDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`email-address`}>
          <TextInput
            label="Email Address"
            placeholder={`Email Address`}
            name="emailAddress"
            value={supplierDetails.emailAddress}
            maxLength={100}
            onChange={(e) => setSupplierDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`phone`}>
          <TextInput
            label="Phone"
            placeholder={`Phone`}
            name="phone"
            value={supplierDetails.phone}
            maxLength={100}
            onChange={(e) => setSupplierDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <div data-testid={`currency`}>
          <TextInput
            label="Currency"
            placeholder={`Currency`}
            name="defaultCurrency"
            value={supplierDetails.defaultCurrency}
            maxLength={100}
            onChange={(e) => setSupplierDetailsFor(e)}
            showCharacterCount
            labelClassName={styles.inputLabel}
            inputClassName={styles.inputClass}
          />
        </div>
        <Button
          label="Create"
          onClick={createSupplier}
          className={styles.createButton}
        />
        <CodeBlock
          code={supplierDetails}
          copyOptions={{
            onSuccess: () => {},
            onFailure: () => {},
          }}
          downloadOptions={{
            filename: "pushPayload.json",
            onFailure: () => {},
          }}
        ></CodeBlock>
      </Card>
    </div>
  );
};

export default Home;
