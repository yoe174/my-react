// frontend\src\pages\Categories\CategoryTablePage.tsx
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CategoryTable from "../../components/categories/CategoryTable";

export default function CategoryTablePage() {
  return (
    <>
      <PageMeta title="Categories" description="Manage categories" />
      <PageBreadcrumb pageTitle="Categories" />
      <div className="space-y-6">
        <ComponentCard title="Category List">
          <CategoryTable />
        </ComponentCard>
      </div>
    </>
  );
}
