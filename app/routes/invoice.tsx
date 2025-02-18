import { Form, Link } from "react-router";
import { INVOICE_STATUS } from "~/constants/invoice";

export function action() {
  console.log("server");
}

export default function Invoice() {
  const invoice = {
    receiver: "Ale Arce",
    total: 100.5,
    status: INVOICE_STATUS.pending,
  };

  const isFormEnabled =
    invoice.status !== INVOICE_STATUS.approved &&
    invoice.status !== INVOICE_STATUS.released;

  return (
    <div>
      <section>
        <Link to="../invoices" className="">{`<`}</Link>
        <Form method="patch">
          <input
            type="text"
            placeholder="Receiver"
            name="receiver"
            value={invoice.receiver}
            required
            readOnly={isFormEnabled}
          />
          <input
            type="number"
            placeholder="Total"
            name="total"
            value={invoice.total}
            required
            readOnly={isFormEnabled}
          />
          <button disabled={!isFormEnabled} type="submit">
            Submit
          </button>
        </Form>
      </section>
      <hr />
      <section>Invoice</section>
    </div>
  );
}
