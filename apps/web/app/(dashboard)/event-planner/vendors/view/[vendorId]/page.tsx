import { getVendorById } from "lib/vendors";
import { notFound } from "next/navigation";
import { VendorPageContent } from "components/event-planner/vendor/vendorView/page-content";

export default async function VendorPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendor = await getVendorById(params.vendorId);
  if (!vendor) return notFound();

  // Clean the vendor data (filter empty images)
  const validatedVendor = {
    ...vendor,
    images: vendor.images.filter((img) => img),
  };

  return <VendorPageContent vendor={validatedVendor} />;
}
