import SuccessScreen from "@/components/templates/success-screen";

export default function Page() {
  return (
    <SuccessScreen
      title="Congratulations!"
      subtitle="Changes saved"
      confirmRedirectPath="/admin/children"
    />
  );
}
