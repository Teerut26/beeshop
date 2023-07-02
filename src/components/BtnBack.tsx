import { Icon } from "@iconify/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {}

const BtnBack: NextPage<Props> = () => {
  const { back } = useRouter();
  return (
    <button onClick={back} className="btn-sm btn w-fit">
      <Icon icon="ic:baseline-arrow-back" className="text-xl" />
      กลับ
    </button>
  );
};

export default BtnBack;
