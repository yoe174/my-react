import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ProductTable from "../../components/products/ProductTable";

export default function ProductTablePage() {
  return (
    <>
      <PageMeta title="Products" description="Manage products" />
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <ComponentCard title="Product List">
          <ProductTable />
        </ComponentCard>
      </div>
    </>
  );
}
