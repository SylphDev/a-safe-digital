import { CSSProperties } from "react";
import { FormProvider as Form, UseFormReturn } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  styles?: CSSProperties;
  id: string;
};

export default function FormProvider({
  children,
  onSubmit,
  methods,
  id,
  styles = {}
}: Props) {
  return (
    <Form {...methods}>
      <form name={id} id={id} onSubmit={onSubmit} style={{ ...styles }}>
        {children}
      </form>
    </Form>
  );
}
