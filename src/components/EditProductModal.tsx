import { Icon } from "@iconify/react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { NextPage } from "next";
import { useState } from "react";

interface Props {}

const EditProductModal: NextPage<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Image, setImage] = useState<string>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file!.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    const imageBase64 = (await imageToBase64(e.target.files?.[0]!)) as string;

    setImage(imageBase64);
  };

  const imageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <>
      <button onClick={showModal} className="badge bg-green-500 hover:bg-green-600">
        <Icon icon="material-symbols:edit" className="text-white" />
      </button>
      <Modal
        centered
        title="แก้ไขสินค้า"
        footer={[]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="รูปสินค้า">
            {Image ? (
              <div className="flex flex-col gap-3">
                <img src={Image} className="h-32 w-32 object-cover" />
                <Button className="w-fit" danger onClick={()=>setImage(undefined)}>ลบรูป</Button>
              </div>
            ) : (
              <input type="file" onChange={handleFileChange} />
            )}
          </Form.Item>
          <Form.Item label="ชื่อสินค้า">
            <Input size="large" />
          </Form.Item>
          <Form.Item label="รายละเอียด">
            <Input.TextArea size="large" />
          </Form.Item>
          <Form.Item label="ราคา">
            <InputNumber
              className="w-full"
              size="large"
              defaultValue={10}
              formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value!.replace(/\฿\s?|(,*)/g, "") as any}
            />
          </Form.Item>
          <Form.Item>
            <button className="btn bg-yellow-400 hover:bg-yellow-500">แก้ไข</button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductModal;
