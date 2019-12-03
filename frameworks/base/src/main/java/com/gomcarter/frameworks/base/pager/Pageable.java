package com.gomcarter.frameworks.base.pager;


import java.io.Serializable;

/**
 * @author gomcarter 2017年12月2日 08:10:35
 */
public interface Pageable extends Serializable {

    /**
     * 翻页到 pageNo 页
     *
     * @param pageNo pageNo
     * @return Pageable
     */
    Pageable turnPage(int pageNo);

    /**
     * 获取翻页起始项
     *
     * @return startNum
     */
    int getStartNum();

    /**
     * 获取每页大小
     *
     * @return pageCount
     */
    int getPageCount();

    /**
     * 获取排序字段名
     *
     * @return orderColumn
     */
    String getOrderColumn();

    /**
     * 获取排序类型，一般为desc，或者asc
     *
     * @return orderType
     */
    String getOrderType();
}
