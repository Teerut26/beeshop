import BtnBack from "@/components/BtnBack";
import useFirestore from "@/hooks/useFirestore";
import CheckSession from "@/layouts/CheckSession";
import NavbarLayouts from "@/layouts/NavbarLayouts";
import { Icon } from "@iconify/react";
import { Form, Input, Typography } from "antd";
import { NextPage } from "next";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {}

const MyStore: NextPage<Props> = () => {
  const { MyStore, onSaveStoreDetail } = useFirestore();

  const [form] = Form.useForm();

  useEffect(() => {
    if (MyStore !== null) {
      form.setFieldsValue(MyStore);
    }
  }, [MyStore]);

  const onSubmit = () => {
    if (!form.getFieldValue("name")) {
      return toast.error("คุณไม่ได้กรอกชื่อ");
    }
    onSaveStoreDetail(form.getFieldValue("name"), form.getFieldValue("description"));
  };

  return (
    <CheckSession>
      <NavbarLayouts>
        <div className="flex flex-col gap-5 p-5">
          <BtnBack />
          <div className="flex flex-col">
            <Typography.Title level={3}>ข้อมูลร้านค้า</Typography.Title>
            <Form onFinish={onSubmit} layout="vertical" form={form}>
              <Form.Item label="ชื่อร้านค้า" name="name">
                <Input />
              </Form.Item>
              <Form.Item label="รายละเอียดร้าน" name="description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <button
                  type="submit"
                  className="btn-sm btn gap-2 bg-yellow-400 hover:bg-yellow-500"
                >
                  <Icon icon="material-symbols:save" className="text-xl" />
                  บันทึก
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </NavbarLayouts>
    </CheckSession>
  );
};

export default MyStore;
