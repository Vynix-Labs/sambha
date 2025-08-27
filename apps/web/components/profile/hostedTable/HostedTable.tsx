import React from "react";

import { HostedType } from "../../../types/profile/data";
import { CustomTable } from "@sambha/ui/CustomTable";
import { hostedColumns } from "./hostedColumn";

export const HostedTable = ({
  data,
  loading,
  totalPages,
  pageSize,
  pageIndex,
  onPageChange,
}: {
  data: HostedType[];
  loading: boolean;
  totalPages?: number;
  pageSize?: number;
  pageIndex?: number;
  onPageChange?: (page: number) => void;
}) => {
  return (
    <div>
      <h1 className="text-lg font-semibold mt-8 px-4 py-4">
        Hosted ({data.length})
      </h1>
      <CustomTable
        showSerialNumber={false}
        columns={hostedColumns}
        data={data}
        isLoading={loading}
        pageIndex={pageIndex ?? 1}
        pageSize={pageSize ?? 10}
        totalPages={totalPages ?? 1}
        onPageChange={onPageChange}
      />
    </div>
  );
};
