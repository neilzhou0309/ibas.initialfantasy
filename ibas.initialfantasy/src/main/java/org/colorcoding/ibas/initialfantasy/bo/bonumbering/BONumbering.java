package org.colorcoding.ibas.initialfantasy.bo.bonumbering;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.colorcoding.ibas.bobas.bo.BusinessObject;
import org.colorcoding.ibas.bobas.core.IPropertyInfo;
import org.colorcoding.ibas.bobas.mapping.DbField;
import org.colorcoding.ibas.bobas.mapping.DbFieldType;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;

/**
 * 业务对象编号方式
 * 
 */
@XmlAccessorType(XmlAccessType.NONE)
@XmlType(name = BONumbering.BUSINESS_OBJECT_NAME, namespace = MyConfiguration.NAMESPACE_BO)
public class BONumbering extends BusinessObject<BONumbering> implements IBONumbering {

	/**
	 * 序列化版本标记
	 */
	private static final long serialVersionUID = 4880988936071155101L;

	/**
	 * 当前类型
	 */
	private static final Class<?> MY_CLASS = BONumbering.class;

	/**
	 * 数据库表
	 */
	public static final String DB_TABLE_NAME = "${Company}_SYS_ONNM";

	/**
	 * 业务对象名称
	 */
	public static final String BUSINESS_OBJECT_NAME = "BONumbering";

	/**
	 * 属性名称-对象编码
	 */
	private static final String PROPERTY_OBJECTCODE_NAME = "ObjectCode";

	/**
	 * 对象编码 属性
	 */
	@DbField(name = "ObjectCode", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_OBJECTCODE = registerProperty(PROPERTY_OBJECTCODE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-对象编码
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_OBJECTCODE_NAME)
	public final String getObjectCode() {
		return this.getProperty(PROPERTY_OBJECTCODE);
	}

	/**
	 * 设置-对象编码
	 * 
	 * @param value
	 *            值
	 */
	public final void setObjectCode(String value) {
		this.setProperty(PROPERTY_OBJECTCODE, value);
	}

	/**
	 * 属性名称-子类型
	 */
	private static final String PROPERTY_DOCUMENTSUBTYPE_NAME = "DocumentSubType";

	/**
	 * 子类型 属性
	 */
	@DbField(name = "DocSubType", type = DbFieldType.ALPHANUMERIC, table = DB_TABLE_NAME, primaryKey = true)
	public static final IPropertyInfo<String> PROPERTY_DOCUMENTSUBTYPE = registerProperty(PROPERTY_DOCUMENTSUBTYPE_NAME,
			String.class, MY_CLASS);

	/**
	 * 获取-子类型
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DOCUMENTSUBTYPE_NAME)
	public final String getDocumentSubType() {
		return this.getProperty(PROPERTY_DOCUMENTSUBTYPE);
	}

	/**
	 * 设置-子类型
	 * 
	 * @param value
	 *            值
	 */
	public final void setDocumentSubType(String value) {
		this.setProperty(PROPERTY_DOCUMENTSUBTYPE, value);
	}

	/**
	 * 属性名称-自动序号
	 */
	private static final String PROPERTY_AUTOKEY_NAME = "AutoKey";

	/**
	 * 自动序号 属性
	 */
	@DbField(name = "AutoKey", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_AUTOKEY = registerProperty(PROPERTY_AUTOKEY_NAME, Integer.class,
			MY_CLASS);

	/**
	 * 获取-自动序号
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_AUTOKEY_NAME)
	public final Integer getAutoKey() {
		return this.getProperty(PROPERTY_AUTOKEY);
	}

	/**
	 * 设置-自动序号
	 * 
	 * @param value
	 *            值
	 */
	public final void setAutoKey(Integer value) {
		this.setProperty(PROPERTY_AUTOKEY, value);
	}

	/**
	 * 属性名称-默认序列
	 */
	private static final String PROPERTY_DEFAULTSERIES_NAME = "DefaultSeries";

	/**
	 * 默认序列 属性
	 */
	@DbField(name = "DefSeries", type = DbFieldType.NUMERIC, table = DB_TABLE_NAME, primaryKey = false)
	public static final IPropertyInfo<Integer> PROPERTY_DEFAULTSERIES = registerProperty(PROPERTY_DEFAULTSERIES_NAME,
			Integer.class, MY_CLASS);

	/**
	 * 获取-默认序列
	 * 
	 * @return 值
	 */
	@XmlElement(name = PROPERTY_DEFAULTSERIES_NAME)
	public final Integer getDefaultSeries() {
		return this.getProperty(PROPERTY_DEFAULTSERIES);
	}

	/**
	 * 设置-默认序列
	 * 
	 * @param value
	 *            值
	 */
	public final void setDefaultSeries(Integer value) {
		this.setProperty(PROPERTY_DEFAULTSERIES, value);
	}

	@Override
	public String toString() {
		StringBuilder stringBuilder = new StringBuilder();

		return stringBuilder.toString();
	}

	/**
	 * 初始化数据
	 */
	@Override
	protected void initialize() {
		super.initialize();

	}

}
