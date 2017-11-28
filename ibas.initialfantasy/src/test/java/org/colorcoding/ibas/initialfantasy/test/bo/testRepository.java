package org.colorcoding.ibas.initialfantasy.test.bo;

import org.colorcoding.ibas.bobas.common.Criteria;
import org.colorcoding.ibas.bobas.common.ICondition;
import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.data.emYesNo;
import org.colorcoding.ibas.bobas.organization.OrganizationFactory;
import org.colorcoding.ibas.initialfantasy.MyConfiguration;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.BOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBONumbering;
import org.colorcoding.ibas.initialfantasy.bo.bonumbering.IBOSeriesNumbering;
import org.colorcoding.ibas.initialfantasy.bo.organization.IUser;
import org.colorcoding.ibas.initialfantasy.bo.organization.User;
import org.colorcoding.ibas.initialfantasy.repository.BORepositoryInitialFantasy;

import junit.framework.TestCase;

public class testRepository extends TestCase {

	public void testBOSeriesKey() throws Exception {
		// 测试模板
		System.out.println(String.format("%08d", 10));
		BORepositoryInitialFantasy boRepository = new BORepositoryInitialFantasy();
		boRepository.setUserToken(OrganizationFactory.SYSTEM_USER.getToken());
		// 检查自动编号系列是否存在
		ICriteria criteria = new Criteria();
		ICondition condition = criteria.getConditions().create();
		condition.setAlias(BOSeriesNumbering.PROPERTY_OBJECTCODE.getName());
		condition.setValue(MyConfiguration.applyVariables(User.BUSINESS_OBJECT_CODE));
		IOperationResult<IBOSeriesNumbering> opRsltBOSeries = boRepository.fetchBOSeriesNumbering(criteria);
		if (opRsltBOSeries.getError() != null) {
			throw opRsltBOSeries.getError();
		}
		IBOSeriesNumbering seriesNumbering = opRsltBOSeries.getResultObjects().firstOrDefault();
		if (seriesNumbering == null) {
			seriesNumbering = new BOSeriesNumbering();
			seriesNumbering.setObjectCode(MyConfiguration.applyVariables(User.BUSINESS_OBJECT_CODE));
			seriesNumbering.setLocked(emYesNo.NO);
			seriesNumbering.setTemplate("%08d");
			opRsltBOSeries = boRepository.saveBOSeriesNumbering(seriesNumbering);
			if (opRsltBOSeries.getError() != null) {
				throw opRsltBOSeries.getError();
			}
		}
		criteria = new Criteria();
		condition = criteria.getConditions().create();
		condition.setAlias(BONumbering.PROPERTY_OBJECTCODE.getName());
		condition.setValue(MyConfiguration.applyVariables(User.BUSINESS_OBJECT_CODE));
		condition = criteria.getConditions().create();
		condition.setAlias(BONumbering.PROPERTY_DOCUMENTSUBTYPE.getName());
		condition.setValue("--");
		IOperationResult<IBONumbering> opRsltBONum = boRepository.fetchBONumbering(criteria);
		if (opRsltBONum.getError() != null) {
			throw opRsltBONum.getError();
		}
		IBONumbering boNumbering = opRsltBONum.getResultObjects().firstOrDefault();
		boNumbering.setDefaultSeries(seriesNumbering.getSeries());
		opRsltBONum = boRepository.saveBONumbering(boNumbering);
		if (opRsltBONum.getError() != null) {
			throw opRsltBONum.getError();
		}
		User user = new User();
		user.setSeries(seriesNumbering.getSeries());// 自动编号系列
		user.setName("auto code");
		IOperationResult<IUser> opRsltUser = boRepository.saveUser(user);
		if (opRsltUser.getError() != null) {
			throw opRsltUser.getError();
		}
		user = (User) opRsltUser.getResultObjects().firstOrDefault();
		System.out.println(String.format("user code: %s", user.getCode()));
		assertEquals(true, user.getCode().endsWith(seriesNumbering.getNextNumber().toString()));
	}
}