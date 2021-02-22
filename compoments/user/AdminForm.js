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

class AdminForm extends BasicForm {
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
    const { searchGroupPermissionList, kind } = this.props;
    searchGroupPermissionList({ params: { page: 0, size: 100, kind } });
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
      this.setFieldValue("groupId", nextProps.roles[0].id);
    }
  }

  validateToConfirmPassword = (rule, value) => {
    const {
      current: { validateFields, isFieldTouched },
    } = this.formRef;
    if (isFieldTouched("confirmPassword")) {
      validateFields(["confirmPassword"], { force: true });
    }
    return Promise.resolve();
  };

  compareToPassword = (rule, newPassword) => {
    const password = this.getFieldValue("password");
    if ((password || newPassword) && password !== newPassword) {
      return Promise.reject("Password that you enter is inconsistent!");
    } else {
      return Promise.resolve();
    }
  };

  getRoles = () => {
    const { ddlRoleLoading, roles, dataDetail } = this.props;
    if (ddlRoleLoading && dataDetail.group) {
      return [
        {
          id: dataDetail.group.id,
          name: dataDetail.group.name,
        },
      ];
    }
    return roles;
  };

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
    const { isEditing, formId, ddlRoleLoading, kind } = this.props;
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
          <Col span={12}>
            <TextField
              fieldName="username"
              min={6}
              label="User Name"
              disabled={isEditing}
              required={!isEditing}
            />
          </Col>
          <Col span={12}>
            <TextField fieldName="fullName" label="Full Name" required />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField
              type="password"
              fieldName="password"
              label={isEditing ? "New Password" : "Password"}
              required={!isEditing}
              validators={[this.validateToConfirmPassword]}
              minLength={6}
            />
          </Col>
          <Col span={12}>
            <TextField
              type="password"
              fieldName="confirmPassword"
              label={isEditing ? "Confirm New Password" : "Confirm Password"}
              required={!isEditing || this.getFieldValue("password")}
              validators={[this.compareToPassword]}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <TextField fieldName="email" label="E-mail" type="email" />
          </Col>
          <Col span={12}>
            {kind === UserTypes.ADMIN ? (
              <DropdownField
                optionValue="id"
                optionLabel="name"
                loading={ddlRoleLoading}
                fieldName="groupId"
                label="Group Permission"
                required
                options={this.getRoles()}
              />
            ) : (
              <TextField fieldName="phone" label="Phone" required />
            )}
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <TextField
              type="number"
              fieldName="phone"
              label="Phong Number"
              required={!isEditing}
              minLength={10}
            />
          </Col>
          <Col span={12}>
            <DropdownField
              fieldName="lang"
              label="Language"
              required
              options={commonLanguages}
            />
          </Col>
        </Row>

        {kind === UserTypes.SHOP ? (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <TextField fieldName="zipCode" label="Zip Code" required />
              </Col>
              <Col span={12}>
                <TextField fieldName="city" label="City" required />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextField
                  fieldName="address"
                  label="Address"
                  type="textarea"
                  required
                />
              </Col>
              <Col span={12}>
                <CropImageFiled
                  fieldName="logoPath"
                  loading={uploading}
                  label="Logo"
                  imageUrl={logo}
                  onChange={this.handleChangeLogo}
                  uploadFile={this.uploadFileLogo}
                  required
                  requiredMsg="Please enter logo"
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <TextField fieldName="taxNumber" label="Tax Number" required />
              </Col>
              {isEditing ? (
                <Col span={12}>
                  <DropdownField
                    fieldName="status"
                    label="Status"
                    required
                    options={commonStatus}
                  />
                </Col>
              ) : (
                <Col span={12}>
                  <DropdownField
                    optionValue="id"
                    optionLabel="name"
                    loading={ddlRoleLoading}
                    fieldName="groupId"
                    label="Group Permission"
                    required
                    options={this.getRoles()}
                  />
                </Col>
              )}
            </Row>
          </div>
        ) : null}
        {kind === UserTypes.SHOP && isEditing ? null : (
          <Row gutter={16}>
            <Col span={12}>
              <DropdownField
                fieldName="status"
                label="Status"
                required
                options={commonStatus}
              />
            </Col>
          </Row>
        )}
      </Form>
    );
  }
}

export default AdminForm;
