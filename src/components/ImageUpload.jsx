import React, { useEffect, useState } from "react";
import { Upload, Image, Modal } from "antd";
import { LuCross, LuImagePlus } from "react-icons/lu";
import getBase64 from "./utils/getBase64";

const ImageUpload = ({
  notePhotos,
  setNotePhotos,
  limit = 10,
  type = "picture",
  ...props
}) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setNotePhotos(newFileList);
  };

  useEffect(() => {
    setFileList(notePhotos);
  }, [notePhotos]);

  return (
    <div>
      <Upload
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        aspect={2.5}
        multiple={limit > 1}
        maxCount={10}
        listType={type}
        className="p-0 relative w-full cursor-pointer"
        beforeUpload={() => false}
      >
        <div className="relative  transition-all duration-100  p-1 rounded-lg group">
          <LuImagePlus size={props.size ?? 20} />
          <span className="absolute whitespace-nowrap left-1/2 -top-7 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition bg-green-500/30 text-green-800 text-xs px-2 py-1 rounded-md">
            Add img
          </span>
        </div>
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image src={previewImage} alt="Preview" width="100%" />
      </Modal>
    </div>
  );
};

export default ImageUpload;
