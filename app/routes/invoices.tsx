import type { Route } from "./+types/invoices";
import { Form, Link } from "react-router";

const fakeDb = () => {
  let invoices = [
    { id: 1, receiver: "Titanity", total: 1000 },
    { id: 2, receiver: "iSeatz", total: 1000 },
    { id: 3, receiver: "Equinox", total: 1000 },
    { id: 4, receiver: "Globant", total: 1000 },
    { id: 5, receiver: "Routable", total: 1000 },
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

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let receiver = formData.get("receiver") as string;
  let total = Number(formData.get("total"));

  const maxId = fakeDbInstance
    .getInvoices()
    .reduce((a, b) => Math.max(a, b.id), -Infinity);

  fakeDbInstance.addInvoice({ id: maxId + 1, receiver, total });
  return;
}

export default function Invoices({ loaderData }: Route.ComponentProps) {
  const { invoices } = loaderData;

  return (
    <>
      {/* <Form method="post">
        <input type="text" placeholder="Receiver" name="receiver" required />
        <input type="number" placeholder="Total" name="total" required />
        <button type="submit">Submit</button>
      </Form> */}
      <ul>
        {invoices.map(({ id, receiver, total }) => (
          <li>
            <Link to={`${id}`}>
              id:{id} - {receiver} - ${total}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
