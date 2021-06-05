import { useState, cloneElement } from 'react';
import { message, Card } from 'antd';
import { ModalForm, ProFormText, ProFormSelect, ProFormUploadButton, ProFormTimePicker, ProFormDatePicker, ProFormList } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import Editor from '../../../components/Editor';
import { homeConfigEdit } from '@/services';
import { goodsTypeEnum } from './enum';

export default (props: any) => {
  const { record = {}, trigger, title} = props;
  const [fileList, setFileList] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const initFileList = (state: boolean) => {
    if (state && record.image) {
      setFileList([{ url: record.image }]);
    }
  }

  const imgChange = (file: any) => {
    setFileList([file.file]);
  }

  const handleEditorChange = (editorState: any) => {
    console.log(editorState);
  }

  return (
    <ModalForm
      title={title}
      width={800}
      layout="horizontal"
      labelCol={{ span: 4 }}
      trigger={cloneElement(
        trigger,
        {
          onClick: () => setVisible(true)
        }
      )}
      onFinish={async (values: any) => {
        await homeConfigEdit();
        console.log(values);
        message.success('提交成功');
        setVisible(false);
      }}
      initialValues={{
        name: '蚂蚁设计有限公司',
        useMode: 'chapter',
      }}
      onVisibleChange={initFileList}
      visible={visible}
      modalProps={{
        onCancel: () => setVisible(false)
      }}
    >
      <Card type="inner" title="商品名称">
        <ProFormText
          width="md"
          name="goodsName"
          label="商品名称"
          initialValue={record.name}
          rules={[{ required: true, message: '请输入商品名称!' }]}
        />
        <ProFormSelect
          width="md"
          valueEnum={goodsTypeEnum}
          name="goodsType"
          label="商品分类"
          rules={[{ required: true, message: '请选择商品分类!' }]}
        />
        <ProFormUploadButton
          extra="可以上传jpg格式图片，大小限制2M"
          label="商品图片"
          name="goodsImg"
          title="上传图片"
          fileList={fileList}
          onChange={imgChange}
          rules={[{ required: true, message: '请上传图片!' }]}
        />
      </Card>
      <Card type="inner" title="商品规格与库存" style={{marginTop: '10px'}}>
        <ProCard tooltip="这是提示" bordered style={{marginBottom: '16px'}}>
          用户信息
          <ProFormList
            name="labels"
            label="场次"
            initialValue={[
              { label: '333' },
            ]}
            copyIconProps={{
              tooltipText: '复制此行',
            }}
            deleteIconProps={{
              tooltipText: '删除此行',
            }}
            rules={[
              {
                validator: async (_, value) => {
                  console.log(value);
                  if (value && value.length > 0) {
                    return;
                  }
                  throw new Error('至少要有一项！');
                },
              },
            ]}
          >
            <ProFormDatePicker
              width="md"
              name="date"
              fieldProps={{
                format: 'YY-MM-DD 星期E hh:mm',
              }}
            />
          </ProFormList>
        </ProCard>
        <ProCard tooltip="这是提示" bordered style={{marginBottom: '16px'}}>
          票面及库存
          <ProFormList
            name="piaomian"
            label="场次"
            initialValue={[
              { label: '333' },
            ]}
            copyIconProps={{
              tooltipText: '复制此行',
            }}
            deleteIconProps={{
              tooltipText: '删除此行',
            }}
            rules={[
              {
                validator: async (_, value) => {
                  console.log(value);
                  if (value && value.length > 0) {
                    return;
                  }
                  throw new Error('至少要有一项！');
                },
              },
            ]}
          >
            <ProFormText width="md" name="changci" />
          </ProFormList>
        </ProCard>
        <ProFormText
          width="md"
          name="address"
          label="演出地址"
          initialValue={''}
          rules={[{ required: true, message: '请输入商品名称!' }]}
        />
        <ProFormSelect
          width="md"
          valueEnum={goodsTypeEnum}
          name="postageTemp"
          label="运费模板"
          rules={[{ required: true, message: '请选择运费模板!' }]}
        />
      </Card>
      <Card type="inner" title="演出介绍" style={{marginTop: '10px'}}>
        <div style={{border: '1px solid #ddd', borderRadius: '4px', height: '320px'}}>
          <Editor
            onChange={handleEditorChange}
          />
        </div>
      </Card>
    </ModalForm>
  );
};
