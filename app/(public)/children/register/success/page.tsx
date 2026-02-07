import SuccessScreen from "@/components/templates/success-screen";

export default function Page() {
  return (
    <SuccessScreen
      title="Congratulations!"
      subtitle="Child created"
      confirmRedirectPath="/children/register"
      buttonLabel="Submit another response"
    />
  );
}
