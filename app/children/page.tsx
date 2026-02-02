import { Button } from "@/components/ui/button";
import ChildrenTable from "@/features/children/components/children-table";
import Link from "next/link";

interface PageProps {
  searchParams?: {
    page?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  };
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params?.page ?? "1");
  const sortBy = params?.sortBy ?? "name";
  const order = params?.order ?? "asc";

  return (
    <main className="admin-page">
      <h1>Children</h1>
      <div className="flex justify-end">
        <Link href="/children/register">
          <Button
            type="button"
            aria-label="Register a new child"
            title="Register a new child"
          >
            New
          </Button>
        </Link>
      </div>
      <ChildrenTable page={page} pageSize={15} sortBy={sortBy} order={order} />
    </main>
  );
}
