/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace initialfantasy {
    export namespace ui {
        export namespace c {
            /** 列表视图-用户身份 */
            export class UserIdentityListView extends ibas.BOListView implements app.IUserIdentityListView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.UserIdentity;
                }
                /** 编辑数据，参数：目标数据 */
                editDataEvent: Function;
                /** 删除数据事件，参数：删除对象集合 */
                deleteDataEvent: Function;
                /** 身份事件 */
                identityEvent: Function;
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.table = new sap.extension.table.DataTable("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(15),
                        visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Interactive,
                        dataInfo: this.queryTarget,
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_user"),
                                template: new sap.extension.m.UserText("", {
                                    dataInfo: {
                                        key: "Code",
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "user",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_identity"),
                                template: new sap.extension.m.RepositoryText("", {
                                    repository: bo.BORepositoryInitialFantasy,
                                    dataInfo: {
                                        type: bo.Identity,
                                        key: "Code",
                                        text: "Name"
                                    },
                                }).bindProperty("bindingValue", {
                                    path: "identity",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_validdate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "validDate",
                                    type: new sap.extension.data.Date()
                                }),
                            }),
                            new sap.extension.table.DataColumn("", {
                                label: ibas.i18n.prop("bo_useridentity_invaliddate"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "invalidDate",
                                    type: new sap.extension.data.Date()
                                }),
                            }),
                        ],
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_new"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://create",
                                    press: function (): void {
                                        that.fireViewEvents(that.newDataEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_edit"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://edit",
                                    press: function (): void {
                                        that.fireViewEvents(that.editDataEvent, that.table.getSelecteds().firstOrDefault());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_delete"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://delete",
                                    press: function (): void {
                                        that.fireViewEvents(that.deleteDataEvent, that.table.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSeparator(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("bo_identity"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://credit-card",
                                    press: function (): void {
                                        that.fireViewEvents(that.identityEvent);
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://action",
                                    press: function (event: any): void {
                                        ibas.servicesManager.showServices({
                                            proxy: new ibas.BOServiceProxy({
                                                data: that.table.getSelecteds(),
                                                converter: new bo.DataConverter(),
                                            }),
                                            displayServices(services: ibas.IServiceAgent[]): void {
                                                if (ibas.objects.isNull(services) || services.length === 0) {
                                                    return;
                                                }
                                                let popover: sap.m.Popover = new sap.m.Popover("", {
                                                    showHeader: false,
                                                    placement: sap.m.PlacementType.Bottom,
                                                });
                                                for (let service of services) {
                                                    popover.addContent(new sap.m.Button("", {
                                                        text: ibas.i18n.prop(service.name),
                                                        type: sap.m.ButtonType.Transparent,
                                                        icon: service.icon,
                                                        press: function (): void {
                                                            service.run();
                                                            popover.close();
                                                        }
                                                    }));
                                                }
                                                popover.addStyleClass("sapMOTAPopover sapTntToolHeaderPopover");
                                                popover.openBy(event.getSource(), true);
                                            }
                                        });
                                    }
                                })
                            ]
                        }),
                        content: [
                            this.table,
                        ]
                    });
                }
                private table: sap.extension.table.Table;
                /** 显示数据 */
                showData(datas: bo.UserIdentity[]): void {
                    let model: sap.ui.model.Model = this.table.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.table.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.table.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.table.setBusy(true);
                        this.table.setFirstVisibleRow(0);
                        this.table.setModel(null);
                    }
                }
            }
        }
    }
}
