import InvoiceFile from "../../views/admin/invoice/InvoiceFile";
import AddInvoice from "../../views/admin/invoice/AddInvoice";
import EditInvoice from "../../views/admin/invoice/EditInvoice";

export default [
  {
    path: "invoice",
    name: "InvoiceFile",
    component: InvoiceFile,
  },
  {
    path: "add_invoice",
    name: "AddInvoice",
    component: AddInvoice,
  },
  {
    path: "edit_invoice/:id",
    name: "EditInvoice",
    component: EditInvoice,
  },
];
