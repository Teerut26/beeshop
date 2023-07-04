import useFirestore from "@/hooks/useFirestore";
import { ProductInterface } from "@/interfaces/ProductInterface";
import { Icon } from "@iconify/react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  product: ProductInterface;
}

const EditProductModal: NextPage<Props> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Image, setImage] = useState<string>();
  const [form] = Form.useForm();
  const { onEditProduct } = useFirestore();
  const [IsNewImage, setIsNewImage] = useState(false);

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
    setIsNewImage(true);
  };

  const imageToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFinish = async () => {
    if (!form.getFieldValue("name")) {
      return Swal.fire("กรุณากรอกชื่อสินค้า", "", "error");
    }
    
    try {
        if (!product.id) return;
        
      if (IsNewImage) {
        await onEditProduct(product.id, form.getFieldValue("name"), form.getFieldValue("price"), form.getFieldValue("description"), Image);
      } else {
        await onEditProduct(product.id, form.getFieldValue("name"), form.getFieldValue("price"), form.getFieldValue("description"));
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      Swal.fire("แก้ไขสินค้าไม่สำเร็จ", "", "error");
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
    });
    setImage(product.image);
  }, [product]);

  return (
    <>
      <button onClick={showModal} className="badge bg-green-500 hover:bg-green-600">
        <Icon icon="material-symbols:edit" className="text-white" />
      </button>
      <Modal centered title="   แก้ไข" footer={[]} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="รูปสินค้า">
            {Image ? (
              <div className="flex flex-col gap-3">
                <img src={Image} className="h-32 w-32 object-cover" />
                <Button className="w-fit" danger onClick={() => setImage(undefined)}>
                  ลบรูป
                </Button>
              </div>
            ) : (
              <input type="file" onChange={handleFileChange} />
            )}
          </Form.Item>
          <Form.Item label="ชื่อสินค้า" name="name" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
          <Form.Item label="รายละเอียด" name="description">
            <Input.TextArea size="large" />
          </Form.Item>
          <Form.Item label="ราคา" name="price">
            <InputNumber className="w-full" size="large" defaultValue={10} formatter={(value) => `฿ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} parser={(value) => value!.replace(/\฿\s?|(,*)/g, "") as any} />
          </Form.Item>
          <Form.Item>
            <button type="submit" className="btn bg-yellow-400 hover:bg-yellow-500">
              แก้ไข
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductModal;
