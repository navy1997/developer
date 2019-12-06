package com.gomcarter.developer.params;

import java.util.Date;

/**
 * @author gomcarter
 * @date 2019-06-17 16:41:02
 */
public class JTestCaseItemQueryParams {

    /**
     * 主键
     */
    private Long id;
    /**
     * 具体接口
     */
    private String name;
    /**
     * 结果处理器，存储javascript脚本，此脚本应该return下一个接口的参数
     */
    private String resultHandler;
    /**
     * 接口hash值
     */
    private String hash;
    /**
     * 配置
     */
    private String config;
    /**
     * 接口外键
     */
    private Long fkInterfacesId;
    /**
     * 接口用例外键
     */
    private Long fkTestCaseId;
    /**
     *
     */
    private Date createTime;
    /**
     *
     */
    private Date modifyTime;

    public Long getId() {
        return id;
    }

    public JTestCaseItemQueryParams setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public JTestCaseItemQueryParams setName(String name) {
        this.name = name;
        return this;
    }

    public String getResultHandler() {
        return resultHandler;
    }

    public JTestCaseItemQueryParams setResultHandler(String resultHandler) {
        this.resultHandler = resultHandler;
        return this;
    }

    public String getHash() {
        return hash;
    }

    public JTestCaseItemQueryParams setHash(String hash) {
        this.hash = hash;
        return this;
    }

    public String getConfig() {
        return config;
    }

    public JTestCaseItemQueryParams setConfig(String config) {
        this.config = config;
        return this;
    }

    public Long getFkInterfacesId() {
        return fkInterfacesId;
    }

    public JTestCaseItemQueryParams setFkInterfacesId(Long fkInterfacesId) {
        this.fkInterfacesId = fkInterfacesId;
        return this;
    }

    public Long getFkTestCaseId() {
        return fkTestCaseId;
    }

    public JTestCaseItemQueryParams setFkTestCaseId(Long fkTestCaseId) {
        this.fkTestCaseId = fkTestCaseId;
        return this;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public JTestCaseItemQueryParams setCreateTime(Date createTime) {
        this.createTime = createTime;
        return this;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public JTestCaseItemQueryParams setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
        return this;
    }

}
