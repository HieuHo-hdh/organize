import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import { commonStatus, commonLanguages } from "../../constants/masterData";

import {
  UserTypes,
  AppConstants,
  UploadFileTypes,
  STATUS_ACTIVE,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

class OrganizeForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      logo: props.dataDetail.logoPath
        ? `${AppConstants.contentRootUrl}/${props.dataDetail.logoPath}`
        : "",
      uploading: false,
    };
    // this.otherData.logoPath = props.dataDetail.logoPath;
  }

  componentWillMount() {
    const { searchOrganize } = this.props;
    searchOrganize({ params: { page: 0, size: 100 } });
  }
  
  componentDidMount() {
    const { dataDetail } = this.props;
    this.setFieldValue("logoPath", dataDetail.logoPath);
  }

  componentWillReceiveProps(nextProps) {
    const { isEditing, roles } = this.props;
    if (
      !isEditing &&
      nextProps.roles !== roles &&
      nextProps.roles &&
      nextProps.roles.length > 0
    ) {
      this.setFieldValue("organizeId", nextProps.roles[0].id);
    }
  }

  // validateToConfirmPassword = (rule, value) => {
  //   const {
  //     current: { validateFields, isFieldTouched },
  //   } = this.formRef;
  //   if (isFieldTouched("confirmPassword")) {
  //     validateFields(["confirmPassword"], { force: true });
  //   }
  //   return Promise.resolve();
  // };

  // compareToPassword = (rule, newPassword) => {
  //   const password = this.getFieldValue("password");
  //   if ((password || newPassword) && password !== newPassword) {
  //     return Promise.reject("Password that you enter is inconsistent!");
  //   } else {
  //     return Promise.resolve();
  //   }
  // };

  // getRoles = () => {
  //   const { ddlRoleLoading, roles, dataDetail } = this.props;
  //   if (ddlRoleLoading && dataDetail.organize) {
  //     return [
  //       {
  //         id: dataDetail.organize.id,
  //         name: dataDetail.organize.name,
  //       },
  //     ];
  //   }
  //   return roles;
  // };

  handleChangeLogo = (info) => {
    console.log(info);
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (logo) =>
        this.setState({ logo })
      );
    }
  };

  uploadFileLogo = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.LOGO },
      onCompleted: (result) => {
        // this.otherData.logoPath = result.data.filePath;
        this.setFieldValue("logoPath", result.data.filePath);
        this.setState({ uploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };

  getInitialFormValues = () => {
    const { isEditing, dataDetail } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
      };
    }
    return dataDetail;
  };

  render() {
    const { isEditing, formId } = this.props;
    const { logo, uploading } = this.state;

    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={this.getInitialFormValues()}
      >
        <Row gutter={16}>
          <CropImageFiled
            fieldName="logoPath"
            loading={uploading}
            label="Logo"
            imageUrl={logo}
            onChange={this.handleChangeLogo}
            uploadFile={this.uploadFileLogo}
          />
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              fieldName="organizeName"
              min={6}
              label="Organize Name"
              disabled={isEditing}
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <TextField fieldName="organizeAddress" 
            label="Organize Address" required 
          />
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <TextField fieldName="organizeDescription" 
            label="Organize Description" 
          />
          </Col>
          <Col span={12}>
            <TextField 
              fieldName="organizePhone"
              label="Organize Phone" type="number"
              required={!isEditing}
              minLength={10}
              maxLength={11}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <DropdownField
              fieldName="lang"
              label="Language"
              required
              options={commonLanguages}
            />
          </Col>

          <Col span={12}>
            <DropdownField
              fieldName="status"
              label="Status"
              required
              options={commonStatus}
            />
          </Col>

        </Row>
      </Form>
    );
  }
}

export default OrganizeForm;
