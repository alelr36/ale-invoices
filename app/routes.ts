import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("layouts/sidebar.tsx", [
    route("invoices", "routes/invoices.tsx"),
    route("invoices/:invoiceId", "routes/invoice.tsx"),
  ]),
] satisfies RouteConfig;
