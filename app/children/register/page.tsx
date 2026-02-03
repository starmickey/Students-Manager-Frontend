import FormContainer from "@/components/layout/FormContainer";
import UpdateChildForm from "../../../features/children/components/update-child-form";

export default function Page() {
  return (
    <main>
      <FormContainer>
        <UpdateChildForm mode="create" />
      </FormContainer>
    </main>
  );
}
