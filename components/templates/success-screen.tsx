import Link from "next/link";
import { Button } from "../ui/button";
import FormContainer from "../layout/FormContainer";

interface SuccessScreenProps {
  title?: string;
  subtitle?: string;
  onConfirm?: () => void;
  confirmRedirectPath?: string;
  buttonLabel?: string;
}

export default function SuccessScreen({
  title = "Congratulations!",
  subtitle = "",
  onConfirm = () => {},
  confirmRedirectPath,
  buttonLabel,
}: SuccessScreenProps) {
  return (
    <FormContainer>
      <h1>{title}</h1>
      <p>{subtitle}</p>

      <div className="mt-8">
        {confirmRedirectPath ? (
          <Link href={confirmRedirectPath}>
            <Button>{buttonLabel}</Button>
          </Link>
        ) : (
          <Button onClick={onConfirm}>{buttonLabel}</Button>
        )}
      </div>
    </FormContainer>
  );
}
