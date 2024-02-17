import Card from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import ImageUpload from "./upload";
import { useState, useEffect } from "react";
const { TextArea } = Input;

export default function MentorPost({onSubmit, currentState}) {
  const [post, setPost] = useState({});

  const [imageURL, setImageURL] = useState(null);

  const sendPushDataToParent = (addValue) => {
    setImageURL(addValue);
  };

  const onSubmitChild = async (event) => {
    event.preventDefault();
    if (post) {
      if(imageURL) post.image = imageURL;
      if(currentState.addUserResponse.userData && currentState.addUserResponse.userData.profilePic) {
        const user = currentState.addUserResponse.userData;
        post.author = `${user.firstName} ${user.lastName}`;
        post.authorProfilePic = user.profilePic;
      }
      console.log('Post onSubmit: ', post);
      onSubmit(post);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setPost((values) => ({ ...values, [name]: value }));
  };

  // className="align-center text-white-400 mx-10 ml-3 mb-20 "

  return (
    <>
      <div className="xl-mr-[144px] mx-auto mt-[12px] ml-[20px] max-w-3xl flex-grow justify-center text-center text-white sm:ml-[73px] xl:ml-[20px]">
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            name="note"
            label={<label style={{ color: "black" }}>Title</label>}
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter the title"
              className="w-[300px]"
              name="title"
              value={post.title}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            className="w-100"
            name="Contents"
            label={<label style={{ color: "black" }}>Description</label>}
            rules={[{ required: true, message: "Please input your views!!" }]}
          >
            <TextArea
              rows={6}
              style={{ width: "100%" }}
              placeholder="Create New Post"
              name="content"
              value={post.content}
              onChange={handleChange}
            />
          </Form.Item>
          <div>
            <div className="align-center flex justify-center">
              <ImageUpload
                className="flex flex-row"
                sendPushDataToParent={sendPushDataToParent}
              />
              <Form.Item>
                <Button
                  className="bg-[#F6CA90] text-black"
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmitChild}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
