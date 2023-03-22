import { Button, Drawer, Space } from 'antd';
import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import FormRender, { useForm } from '../../index';
import React from 'react';

const ZaFormDrawer = forwardRef((props: any, ref) => {
  const {
    currentItem,
    readOnly = false,
    navTitle,
    formSchema,
    handleSubmit,
    widgets,
  } = props;
  const [visible, setVisible] = useState(false);
  const form = useForm();

  const onClose = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    onShow,
    onClose,
  }));

  const onSubmit = () => {
    form.submit();
  };

  const onFinish = (data, errors) => {
    if (errors.length <= 0) {
      handleSubmit?.(data);
    }
  };

  useEffect(() => {
    form.resetFields();
    form.setValues(currentItem);
  }, [currentItem]);

  return (
    <>
      {formSchema && (
        <Drawer
          title={navTitle}
          placement="right"
          size="large"
          onClose={onClose}
          open={visible}
          extra={
            <Space>
              <Button onClick={() => onClose()}>取消</Button>
              {!readOnly && (
                <Button type="primary" onClick={() => onSubmit()}>
                  确定
                </Button>
              )}
            </Space>
          }
        >
          <FormRender
            form={form}
            schema={formSchema}
            readOnly={readOnly}
            onFinish={onFinish}
            widgets={widgets}
          />
        </Drawer>
      )}
    </>
  );
});

export default ZaFormDrawer;
