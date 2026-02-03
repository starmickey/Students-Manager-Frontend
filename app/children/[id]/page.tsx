import FormContainer from "@/components/layout/FormContainer";
import UpdateChildForm from "@/features/children/components/update-child-form";
import { Child, getChildById } from "@/lib/api/children";
import { HttpError } from "@/lib/http/http-errors";
import { isValidNumber } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isValidNumber(id)) redirect("/children");

  let child: Child;

  try {
    child = await getChildById(Number(id));
  } catch (e) {
    if (e instanceof HttpError && e.status === 404) {
      notFound(); // ⬅️ Next.js 404 page
    }

    throw e; // rethrow unknown errors
  }

  return (
    <main>
      <FormContainer>
        <UpdateChildForm mode="edit" child={child} />
      </FormContainer>
    </main>
  );
}
