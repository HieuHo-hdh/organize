import React from "react";
import { connect } from "react-redux";
import { Button, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

import ListBasePage from "../ListBasePage";
import AdminForm from "../../compoments/user/AdminForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { commonStatus } from "../../constants/masterData";
import { convertStringToDateTimeString } from "../../utils/datetimeHelper";
import { AppConstants, UserTypes, GroupPermissonTypes } from "../../constants";

class UserAdminListPage extends ListBasePage {
  initialSearch() {
    return { username: "", fullName: "", status: undefined };
  }

  constructor(props) {
    super(props);
    this.objectName = "administrator";
    this.breadcrumbs = [{ name: "Administrators" }];
    this.columns = [
      this.renderIdColumn(),
      {
        title: "Avatar",
        dataIndex: "avatar",
        render: (avatar) => (
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
          />
        ),
      },
      { title: "User Name", dataIndex: "username" },
      { title: "Full Name", dataIndex: "fullName" },
      { title: "Phone Number", dataIndex: "phone" },
      { title: "E-mail", dataIndex: "email", width: "200px" },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        render: (createdDate) => convertStringToDateTimeString(createdDate),
      },
      this.renderStatusColumn(),
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
  }

  getSearchFields() {
    return [
      {
        key: "username",
        seachPlaceholder: "Username",
        initialValue: this.search.username,
      },
      {
        key: "fullName",
        seachPlaceholder: "Full Name",
        initialValue: this.search.fullName,
      },
      {
        key: "status",
        seachPlaceholder: "Select Status",
        fieldType: FieldTypes.SELECT,
        options: commonStatus,
        initialValue: this.search.status,
      },
    ];
  }

  prepareCreateData(values) {
    return {
      kind: UserTypes.ADMIN,
      ...values,
    };
  }

  prepareUpdateData(values) {
    return {
      id: this.dataDetail.id,
      kind: UserTypes.ADMIN,
      ...values,
    };
  }

  getDataDetailMapping(data) {
    return {
      ...data,
      groupId: data.group && data.group.id,
    };
  }

  render() {
    const {
      dataList,
      roles,
      ddlRoleLoading,
      loading,
      searchGroupPermissionList,
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const users = dataList.data || [];
    this.pagination.total = dataList.totalElements || 0;

    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          <Button
            type="primary"
            onClick={() => this.onShowModifiedModal(false)}
          >
            <PlusOutlined /> New Administrator
          </Button>
        </div>
        <BaseTable
          loading={loading}
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={users}
          pagination={this.pagination}
          onChange={this.handleTableChange}
        />
        <BasicModal
          visible={isShowModifiedModal}
          isEditing={this.isEditing}
          objectName={this.objectName}
          loading={isShowModifiedLoading}
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
        >
          <AdminForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? this.dataDetail : {}}
            searchGroupPermissionList={searchGroupPermissionList}
            roles={roles}
            ddlRoleLoading={ddlRoleLoading}
            kind={GroupPermissonTypes.ADMIN}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.user.tbUserAdminLoading,
  ddlRoleLoading: state.groupPermission.searchGroupPermissionLoading,
  roles: state.groupPermission.groupPermissions || [],
  dataList: state.user.userAdminData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getUserAdminList(payload)),
  searchGroupPermissionList: (payload) =>
    dispatch(actions.searchGroupPermission(payload)),
  getDataById: (payload) => dispatch(actions.getUserById(payload)),
  createData: (payload) => dispatch(actions.createUser(payload)),
  updateData: (payload) => dispatch(actions.updateUser(payload)),
  deleteData: (payload) => dispatch(actions.deleteAdmin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAdminListPage);
