"use client";
import { startTransition, useOptimistic, useRef, useState } from "react";

const OptimisticPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [names, setNames] = useState<{ value: string }[]>([]);

  const saveName = async (data: { value: string }) => {
    return new Promise((res) => {
      setTimeout(() => {
        setNames((prev) => [...prev, data]);
        res(data);
      }, 5000);
    });
  };

  const [optimisticNames, addOptimisticName] = useOptimistic<
    { value: string; sending?: boolean }[],
    { value: string; sending?: boolean }
  >(names, (state, action) => {
    return [...state, action];
  });

  const formAction = (formData: FormData) => {
    addOptimisticName({ value: formData.get("Name") as string, sending: true });
    formRef.current?.reset();

    startTransition(async () => {
      await saveName({ value: formData.get("Name") as string });
    });
  };

  return (
    <div>
      <form action={formAction} ref={formRef} className="p-5">
        <input name="Name" className="bg-white text-black" />
        <button type="submit" className="bg-blue-500 ml-2">
          Save Name
        </button>
      </form>
      {optimisticNames.map((el, index) => (
        <p key={index} className="text-white">
          {el.value} {el.sending && " (sending...)"}
        </p>
      ))}
    </div>
  );
};
export default OptimisticPage;
