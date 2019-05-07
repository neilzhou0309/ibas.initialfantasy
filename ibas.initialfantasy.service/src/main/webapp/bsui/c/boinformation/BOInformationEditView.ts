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
            /**
             * 视图-BOInformation
             */
            export class BOInformationEditView extends ibas.BOEditView implements app.IBOInformationEditView {
                /** 删除数据事件 */
                deleteDataEvent: Function;
                /** 新建数据事件，参数1：是否克隆 */
                createDataEvent: Function;
                /** 添加业务对象属性信息事件 */
                addBOPropertyInformationEvent: Function;
                /** 删除业务对象属性信息事件 */
                removeBOPropertyInformationEvent: Function;
                /** 编辑业务对象属性信息 */
                editBOPropertyInformationEvent: Function;
                /** 添加业务对象属性值事件 */
                addBOPropertyValueEvent: Function;
                /** 删除业务对象属性值事件 */
                removeBOPropertyValueEvent: Function;

                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    let formTop: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_general") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_code") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "code",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_name") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "name",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_description") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "description",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.ui.core.Title("", { text: ibas.i18n.prop("initialfantasy_title_others") }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_objecttype") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "objectType",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                            new sap.m.Label("", { text: ibas.i18n.prop("bo_boinformation_mapped") }),
                            new sap.extension.m.Input("", {
                                editable: false,
                            }).bindProperty("bindingValue", {
                                path: "mapped",
                                type: new sap.extension.data.Alphanumeric()
                            }),
                        ]
                    });
                    this.tableBOPropertyInformation = new sap.extension.table.Table("", {
                        enableSelectAll: true,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.MenuButton("", {
                                    text: ibas.i18n.prop("bo_bopropertyinformation_authorised"),
                                    icon: "sap-icon://bullet-text",
                                    type: sap.m.ButtonType.Transparent,
                                    menu: new sap.m.Menu("", {
                                        items: [
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.ALL),
                                                icon: "sap-icon://multiselect-all",
                                                press: function (): void {
                                                    for (let item of that.tableBOPropertyInformation.getSelecteds<bo.IBOPropertyInformation>()) {
                                                        item.authorised = ibas.emAuthoriseType.ALL;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.READ),
                                                icon: "sap-icon://multi-select",
                                                press: function (): void {
                                                    for (let item of that.tableBOPropertyInformation.getSelecteds<bo.IBOPropertyInformation>()) {
                                                        item.authorised = ibas.emAuthoriseType.READ;
                                                    }
                                                }
                                            }),
                                            new sap.m.MenuItem("", {
                                                text: ibas.enums.describe(ibas.emAuthoriseType, ibas.emAuthoriseType.NONE),
                                                icon: "sap-icon://multiselect-none",
                                                press: function (): void {
                                                    for (let item of that.tableBOPropertyInformation.getSelecteds<bo.IBOPropertyInformation>()) {
                                                        item.authorised = ibas.emAuthoriseType.NONE;
                                                    }
                                                }
                                            }),
                                        ],
                                    })
                                }),
                            ]
                        }),
                        rows: "{/rows}",
                        rowActionCount: 1,
                        rowActionTemplate: new sap.ui.table.RowAction("", {
                            items: [
                                new sap.ui.table.RowActionItem("", {
                                    icon: "sap-icon://slim-arrow-right",
                                    press: function (oEvent: any): void {
                                        that.fireViewEvents(that.editBOPropertyInformationEvent
                                            , this.getBindingContext().getObject()
                                        );
                                    },
                                }),
                            ]
                        }),
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_property"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "property",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "property",
                                filterProperty: "property"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_description"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "description",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "description",
                                filterProperty: "description"
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_searched"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emYesNo
                                }).bindProperty("bindingValue", {
                                    path: "searched",
                                    type: new sap.extension.data.YesNo(),
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_authorised"),
                                template: new sap.extension.m.EnumSelect("", {
                                    enumType: ibas.emAuthoriseType
                                }).bindProperty("bindingValue", {
                                    path: "authorised",
                                    type: new sap.extension.data.AuthoriseType(),
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyinformation_mapped"),
                                template: new sap.extension.m.Text("", {
                                }).bindProperty("bindingValue", {
                                    path: "mapped",
                                    type: new sap.extension.data.Alphanumeric()
                                }),
                                sortProperty: "mapped"
                            }),
                        ]
                    });
                    this.tableBOPropertyValue = new sap.extension.table.Table("", {
                        enableSelectAll: false,
                        visibleRowCount: sap.extension.table.visibleRowCount(8),
                        toolbar: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_add"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://add",
                                    press: function (): void {
                                        that.fireViewEvents(that.addBOPropertyValueEvent);
                                    }
                                }),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_remove"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://less",
                                    press: function (): void {
                                        that.fireViewEvents(that.removeBOPropertyValueEvent, that.tableBOPropertyValue.getSelecteds());
                                    }
                                }),
                                new sap.m.ToolbarSpacer(""),
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_back"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://nav-back",
                                    press: function (): void {
                                        that.fireViewEvents(that.editBOPropertyInformationEvent);
                                    }
                                })
                            ]
                        }),
                        rows: "{/rows}",
                        columns: [
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyvalue_value"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "value",
                                    type: new sap.extension.data.Alphanumeric()
                                }).bindProperty("editable", {
                                    path: "isNew"
                                })
                            }),
                            new sap.extension.table.Column("", {
                                label: ibas.i18n.prop("bo_bopropertyvalue_description"),
                                template: new sap.extension.m.Input("", {
                                }).bindProperty("bindingValue", {
                                    path: "description",
                                    type: new sap.extension.data.Alphanumeric()
                                })
                            }),
                        ]
                    });
                    let formMiddle: sap.ui.layout.form.SimpleForm = new sap.ui.layout.form.SimpleForm("", {
                        editable: true,
                        content: [
                            this.tableTitle = new sap.ui.core.Title("", { text: ibas.i18n.prop("bo_bopropertyinformation") }),
                            this.splitContainer = new sap.m.SplitContainer("", {
                                mode: sap.m.SplitAppMode.HideMode,
                                detailPages: [
                                    this.tableBOPropertyInformation,
                                    this.tableBOPropertyValue
                                ]
                            }),
                        ]
                    });
                    return this.page = new sap.extension.m.Page("", {
                        showHeader: false,
                        subHeader: new sap.m.Toolbar("", {
                            content: [
                                new sap.m.Button("", {
                                    text: ibas.i18n.prop("shell_data_save"),
                                    type: sap.m.ButtonType.Transparent,
                                    icon: "sap-icon://save",
                                    press: function (): void {
                                        that.fireViewEvents(that.saveDataEvent);
                                    }
                                }),
                            ]
                        }),
                        content: [
                            formTop,
                            formMiddle,
                        ]
                    });
                }
                private page: sap.extension.m.Page;
                private tableTitle: sap.ui.core.Title;
                private splitContainer: sap.m.SplitContainer;
                private tableBOPropertyInformation: sap.extension.table.Table;
                private tableBOPropertyValue: sap.extension.table.Table;

                /** 显示数据 */
                showBOInformation(data: bo.BOInformation): void {
                    this.page.setModel(new sap.extension.model.JSONModel(data));
                }
                /** 显示数据 */
                showBOPropertyInformations(datas: bo.BOPropertyInformation[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_bopropertyinformation"));
                    this.splitContainer.backToTopDetail(null, null);
                    this.tableBOPropertyInformation.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
                /** 显示数据 */
                showBOPropertyValues(datas: bo.BOPropertyValue[]): void {
                    this.tableTitle.setText(ibas.i18n.prop("bo_bopropertyvalue"));
                    this.splitContainer.toDetail(this.tableBOPropertyValue.getId(), null, null, null);
                    this.tableBOPropertyValue.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                }
            }
        }
    }
}