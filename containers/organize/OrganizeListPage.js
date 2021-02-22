import React from 'react';
import { connect } from 'react-redux';
import { Button, Avatar } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';

import ListBasePage from '../ListBasePage';
// import AdminForm from '../../compoments/user/AdminForm';
import OrganizeForm from '../../compoments/organize/OrganizeForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { commonStatus } from '../../constants/masterData';
import { convertStringToDateTimeString } from '../../utils/datetimeHelper';
import { AppConstants, UserTypes, GroupPermissonTypes } from '../../constants';


class OrganizeListPage extends ListBasePage {

    initialSearch() {
        return { organizeName: ''};
    }

    constructor(props) {
        super(props);
        this.objectName = 'organize';
        this.breadcrumbs = [{name: 'Organize'}];
        this.columns = [
            this.renderIdColumn(),
            { 
                title: 'Organize Logo', 
                dataIndex: 'logo',
                render : (logo) => (
                <Avatar size="large" icon={<UserOutlined />} 
                src={logo ? `${AppConstants.contentRootUrl}${logo}` : null}/>
                )
            },
            { title: 'Organize Name', dataIndex: 'organizeName' },
            { title: 'Organize Address', dataIndex: 'organizeAddress' },
            { title: 'Organize Description', dataIndex: 'organizeDescription'},
            this.renderStatusColumn(),
            this.renderActionColumn()
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false
        }
    }

    getSearchFields() {
        return [
            { key: 'organizeName', seachPlaceholder: 'Organize Name', initialValue: this.search.organizeName },
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
            // kind: UserTypes.ADMIN,
            ...values
        };
    }

    prepareUpdateData(values) {
        return {
            id: this.dataDetail.id,
            // kind: UserTypes.ADMIN,
            ...values
        };
    }

    getDataDetailMapping(data) {
        return {
            ...data,
            groupId: data.group && data.group.id
        }
    }

    render() {
        const { dataList, roles, ddlRoleLoading, loading, searchOrganize } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const organizeData = dataList.data || [];
        this.pagination.total = dataList.totalElements || 0;

        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar">    
                    <Button type="primary" onClick={() => this.onShowModifiedModal(false)}>
                    <PlusOutlined /> Organize
                    </Button>
                </div>
                <BaseTable
                    loading={loading}
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={organizeData}
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
                        <OrganizeForm
                            isEditing={this.isEditing}
                            dataDetail={this.isEditing ? this.dataDetail : {}}
                            // searchGroupPermissionList={searchGroupPermissionList}
                            searchOrganize= {searchOrganize}
                            // roles={roles}
                            // ddlRoleLoading={ddlRoleLoading}
                            // kind={GroupPermissonTypes.ADMIN}
                        />
                </BasicModal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // loading: state.user.tbUserAdminLoading,
    // ddlRoleLoading: state.groupPermission.searchGroupPermissionLoading,
    // roles: state.groupPermission.groupPermissions || [],
    // dataList: state.user.userAdminData || {},
    loading: state.organize.organizeListLoading,
    // loading:false,
    ddlRoleLoading: state.organize.searchLoading,
    roles: state.organize.searchedOrganize || [],
    dataList: state.organize.organizeListData || {},
})

const mapDispatchToProps = dispatch => ({
    getDataList: payload => dispatch(actions.getOrganizeList(payload)),
    searchOrganize: payload => dispatch(actions.searchOrganize(payload)),
    getDataById: payload => dispatch(actions.getOrganize(payload)),
    createData: payload => dispatch(actions.createOrganize(payload)),
    updateData: payload => dispatch(actions.updateOrganize(payload)),
    deleteData: payload => dispatch(actions.deleteOrganize(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizeListPage);