import { Form } from "react-router";
import type { Route } from "./+types/invoices";

const fakeDb = () => {
  let invoices = [
    { receiver: "Titanity", total: 1000 },
    { receiver: "iSeatz", total: 1000 },
    { receiver: "Equinox", total: 1000 },
    { receiver: "Globant", total: 1000 },
    { receiver: "Routable", total: 1000 },
  ];

  return {
    getInvoices: () => invoices,
    addInvoice: (
      invoice: Route.ComponentProps["loaderData"]["invoices"][number]
    ) => {
      invoices = [...invoices, invoice];
    },
  };
};

const fakeDbInstance = fakeDb();

export async function loader() {
  const invoices = fakeDbInstance.getInvoices();
  return { invoices };
}

export async function action() {
  fakeDbInstance.addInvoice({ receiver: "Ale", total: 123 });
  return;
}

export default function Invoices({ loaderData }: Route.ComponentProps) {
  const { invoices } = loaderData;

  return (
    <>
      <Form method="post">
        <button type="submit">Submit</button>
      </Form>
      <ul>
        {invoices.map(({ receiver, total }) => (
          <li>
            {receiver} - ${total}
          </li>
        ))}
      </ul>
    </>
  );
}
